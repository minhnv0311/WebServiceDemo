using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiCore.Commons;
using WebApiCore.Models;

namespace WebApiCore.Controllers
{
    [Authorize]
    public class UserProfilesController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();
        [Route("Users/{code}")]
        [ResponseType(typeof(object))]
        public IHttpActionResult GetListUByDept(string code)
        {
            ArrayList arr = new ArrayList();
            var currUser = HttpContext.Current.User.Identity.Name;
            var ListUser = db.UserProfiles.Where(x => x.Department == code && x.FInUse == true);
            foreach (var item in ListUser)
            {
                if (Commons.Common.CheckSupperAdmin(db, currUser))
                    arr.Add(item);
                else
                {
                    var supper = db.Group_User.Where(t => t.CodeGroup == Commons.Constants.SUPPERADMIN && t.UserName == item.UserName && t.FInUse == true).FirstOrDefault();
                    if (supper == null)
                        arr.Add(item);
                }

            }
            return Ok(arr);

        }
        [HttpPost]
        [Route("Users")]
        [ResponseType(typeof(object))]
        public IHttpActionResult GetUsers([FromBody]List<Object> obj, int pageNumber, int pageSize, string code, string searchKey, string type)
        {
            // nếu code là phòng ban
            var total = db.UserProfiles.Where(t => t.FInUse == true
                                                && ((t.Department == code && type == "PB") || (t.DonVi == code && type == "DV"))
                                                 && (searchKey == "" || searchKey == null || t.SearchKey.Contains(searchKey))
            ).Count();
            var data = db.UserProfiles.Where(t => t.FInUse == true
                                                 && ((t.Department == code && type == "PB") || (t.DonVi == code && type == "DV"))
                                                  && (searchKey == "" || searchKey == null || t.SearchKey.Contains(searchKey))
            ).OrderByDescending(t => t.FCreateTime).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            // nếu code là mã công ty
            var com = db.Companies.Where(t => t.FCode == code).FirstOrDefault();
            if (com != null)
            {
                total = db.UserProfiles.Where(t => t.FInUse == true && t.FBranchCode == code).Count();
                data = db.UserProfiles.Where(t => t.FInUse == true && t.FBranchCode == code)
                   .OrderByDescending(t => t.FCreateTime).Skip((pageNumber - 1) * pageSize).Take(pageSize)
                   .ToList();
                if (!string.IsNullOrEmpty(searchKey))
                {
                    data = db.UserProfiles.Where(t => t.FInUse == true && t.FBranchCode == code && t.SearchKey.Contains(searchKey))
                                   .OrderByDescending(t => t.FCreateTime).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
                    total = db.UserProfiles.Where(t => t.FInUse == true && t.FBranchCode == code && t.SearchKey.Contains(searchKey)).Count();
                }
            }
            List<ListUser> list_us = new List<ListUser>();
            int a = 0;
            if (obj != null) a = obj.Count;
            foreach (var it in data)
            {
                ListUser item = new ListUser();
                if (a != 0)
                {
                    for (int i = 0; i < a; i++)
                    {
                        UserProfile result = JsonConvert.DeserializeObject<UserProfile>(obj[i].ToString());
                        if (it.Id == result.Id) item.check = true;
                        item.us = it;
                    }
                }
                else
                {
                    item.us = it;
                }
                var cv = db.Positions.Where(t => t.FCode == it.Position).FirstOrDefault();
                if (cv != null) item.ChucVu = cv.FName;
                list_us.Add(item);
            }
            Paging pg = new Paging();
            pg.list = list_us;
            pg.totalCount = total;
            pg.totalPage = System.Convert.ToInt32(System.Math.Ceiling(total / System.Convert.ToDouble(pageSize)));
            pg.pageStart = ((pageNumber - 1) * pageSize) + 1;
            if (pg.totalPage == pageNumber)
            {
                pg.pageEnd = total;
            }
            else pg.pageEnd = ((pageNumber - 1) * pageSize) + pageSize;
            return Ok(pg);

        }

        [HttpPost]
        [Route("api/UserProfile/GetUsersByDerpartment")]
        [ResponseType(typeof(object))]
        public IHttpActionResult GetUsersByDerpartment([FromBody]List<Object> obj, string listDV)
        {
            // nếu code là phòng ban
            var data =(from x in db.UserProfiles
                       join b in db.Group_User on x.UserName equals b.UserName
                       where x.FInUse==true && (listDV.Contains(x.Department) || listDV.Contains(x.DonVi)) && b.CodeGroup != "SUPPERADMIN" && b.FInUse==true
                      select x).ToList().Distinct();


            List<ListUser> list_us = new List<ListUser>();
            int a = 0;
            if (obj != null) a = obj.Count;
            foreach (var it in data)
            {
                ListUser item = new ListUser();
                if (a != 0)
                {
                    for (int i = 0; i < a; i++)
                    {
                        UserProfile result = JsonConvert.DeserializeObject<UserProfile>(obj[i].ToString());
                        if (it.Id == result.Id) item.check = true;
                        item.us = it;
                    }
                }
                else
                {
                    item.us = it;
                }
                var cv = db.Positions.Where(t => t.FCode == it.Position).FirstOrDefault();
                var dv = db.Organizations.Where(t => t.FCode == it.Department).FirstOrDefault();
                var dvcq = db.Organizations.Where(t => t.FCode == it.DonVi).FirstOrDefault();
                if (cv != null)
                    item.ChucVu = cv.FName;
                else item.ChucVu = "Chưa cập nhật";
                if (dv != null)
                    item.DonVi = dv.FName;
                else item.DonVi = "Chưa cập nhật";
                if (dv != null)
                    item.DonViChuQuan = dvcq.FName;
                else item.DonViChuQuan = "Chưa cập nhật";
                list_us.Add(item);
            }
            return Ok(list_us);

        }
        public class Paging
        {
            public List<ListUser> list { get; set; }
            public int pageStart { get; set; }
            public int pageEnd { get; set; }
            public int totalCount { get; set; }
            public int totalPage { get; set; }
        }
        public class ListUser
        {
            public string ChucVu { get; set; }
            public string DonVi { get; set; }
            public string DonViChuQuan { get; set; }
            public UserProfile us { get; set; }
            public bool check { get; set; }

        }

        [HttpGet]
        [Route("api/UserProfile/GetUsers")]
        [ResponseType(typeof(object))]
        public List GetUsers(int pageNumber, int pageSize, string searchKey, string maDV)
        {
            if (searchKey == null) searchKey = "";
            if (maDV == WebConfigurationManager.AppSettings["DefaultCompany"]) maDV = "";
            List ls = new List();
            var cmd = db.Database.Connection.CreateCommand();
            cmd.CommandText = "[dbo].[GetUsers]" + pageNumber + "," + pageSize + ",N'" + searchKey + "','" + maDV + "'";
            db.Database.Connection.Open();
            var reader = cmd.ExecuteReader();
            var dt = ((IObjectContextAdapter)db)
                .ObjectContext
                .Translate<Obj>(reader).ToList();
            ls.dt = dt;

            reader.NextResult();
            var totalCount = ((IObjectContextAdapter)db)
                .ObjectContext
                .Translate<int>(reader).ToList();


            foreach (var item in totalCount)
            {
                ls.totalCount = item;
            }

            db.Database.Connection.Close();
            ls.totalPage = System.Convert.ToInt32(System.Math.Ceiling(ls.totalCount / System.Convert.ToDouble(pageSize)));
            ls.pageStart = ((pageNumber - 1) * pageSize) + 1;
            if (ls.totalPage == pageNumber)
            {
                ls.pageEnd = ls.totalCount;
            }
            else ls.pageEnd = ((pageNumber - 1) * pageSize) + pageSize;
            return ls;
        }
        public class Obj
        {
            public long RowNum { get; set; }
            public string Id { get; set; }
            public string OrgCode { get; set; }
            public string FDescription { get; set; }
            public Nullable<System.DateTime> FCreateTime { get; set; }
            public Nullable<System.DateTime> FUpdateTime { get; set; }
            public string FUserCreate { get; set; }
            public string FUserApprove { get; set; }
            public Nullable<System.DateTime> FApproveTime { get; set; }
            public string FStatus { get; set; }
            public Nullable<int> FIndex { get; set; }
            public Nullable<int> FLevel { get; set; }
            public Nullable<bool> FInUse { get; set; }
            public string Email { get; set; }
            public string UserName { get; set; }
            public string Mobile { get; set; }
            public string Department { get; set; }
            public string FullName { get; set; }
            public string Address { get; set; }
            public string Provin { get; set; }
            public string District { get; set; }
            public string Ward { get; set; }
            public Nullable<System.DateTime> Birthday { get; set; }
            public string Gender { get; set; }
            public string FBranchCode { get; set; }
            public string Position { get; set; }
            public string FUserUpdate { get; set; }
            public string Avatar { get; set; }
            public string DonVi { get; set; }
            public string SearchKey { get; set; }
            public string TenPB { get; set; }
            public string TenDV { get; set; }
            public string TenCV { get; set; }
        }
        public class List
        {
            public List<Obj> dt { get; set; }
            public int totalCount { get; set; }
            public int pageStart { get; set; }
            public int pageEnd { get; set; }
            public int totalPage { get; set; }
        }

        // GET: api/UserProfiles
        public IQueryable<UserProfile> GetUserProfiles()
        {

            return db.UserProfiles;
        }

        // GET: api/UserProfiles/5
        [ResponseType(typeof(UserProfile))]
        public async Task<IHttpActionResult> GetUserProfile(string id)
        {
            UserProfile userProfile = await db.UserProfiles.FindAsync(id);
            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        // PUT: api/UserProfiles/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUserProfile(string id, UserProfile userProfile)
        {
            ValidateMenu(userProfile);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            db.Entry(userProfile).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserProfileExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            AspNetUser aspUser = db.AspNetUsers.Where(t => t.Id == id).FirstOrDefault();
            if (aspUser == null)
            {
                return NotFound();
            }
            else
            {
                aspUser.LockoutEnabled = false;
                db.SaveChanges();
            }
            return StatusCode(HttpStatusCode.NoContent);
        }
        private void ValidateMenu(UserProfile menu)
        {
            if (string.IsNullOrEmpty(menu.Department))
            {

                ModelState.AddModelError("DonVi", "Bắt buộc chọn phòng ban");
                ModelState.AddModelError("DonVi", "has-error");
            }
            if (string.IsNullOrEmpty(menu.Department))
            {

                ModelState.AddModelError("DonVi", "Bắt buộc chọn đơn vị");
                ModelState.AddModelError("DonVi", "has-error");
            }
        }
        // POST: api/UserProfiles
        [ResponseType(typeof(UserProfile))]
        public async Task<IHttpActionResult> PostUserProfile(UserProfile userProfile)
        {
            if (userProfile != null)
            {
                AspNetUser user = await db.AspNetUsers.Where(x => x.UserName == userProfile.UserName).SingleOrDefaultAsync();
                UserProfile userPr = db.UserProfiles.Where(t => t.Id == user.Id).FirstOrDefault();
                ValidateMenu(userProfile);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (userPr == null)
                {
                    userProfile.Id = user.Id;
                    userProfile.FInUse = true;
                    userProfile.FCreateTime = DateTime.Now;
                    userProfile.SearchKey = Commons.Common.ReplaceUnicode(userProfile.UserName + userProfile.Id + userProfile.FullName) + userProfile.UserName + userProfile.Id + userProfile.FullName;
                    db.UserProfiles.Add(userProfile);
                    try
                    {
                        await db.SaveChangesAsync();
                    }
                    catch (DbUpdateException)
                    {
                        if (UserProfileExists(userProfile.Id))
                        {
                            return Conflict();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }
                else
                {
                    userPr.FullName = userProfile.FullName;
                    userPr.FInUse = true;
                    userPr.Email = userProfile.Email;
                    //userPr.UserName = userProfile.
                    userPr.Mobile = userProfile.Mobile;
                    userPr.Department = userProfile.Department;
                    userPr.FullName = userProfile.FullName;
                    userPr.Address = userProfile.Address;
                    userPr.Provin = userProfile.Provin;
                    userPr.District = userProfile.District;
                    userPr.Ward = userProfile.Ward;
                    userPr.Birthday = userProfile.Birthday;
                    userPr.Gender = userProfile.Gender;
                    userPr.FBranchCode = userProfile.FBranchCode;
                    userPr.Position = userProfile.Position;
                    userPr.DonVi = userProfile.DonVi;
                    userPr.SearchKey = Commons.Common.ReplaceUnicode(userPr.UserName + userPr.Id + userPr.FullName) + userPr.UserName + userPr.Id + userPr.FullName;
                    try
                    {
                        await db.SaveChangesAsync();
                    }
                    catch (DbUpdateException)
                    {
                        if (UserProfileExists(userProfile.Id))
                        {
                            return Conflict();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }
            }
            return CreatedAtRoute("DefaultApi", new { id = userProfile.Id }, userProfile);
        }
        [HttpPost]
        [Route("api/UserProfiles/DeleteUser")]
        [ResponseType(typeof(UserProfile))]
        public IHttpActionResult DeleteUser(string id)
        {
            UserProfile userProfile = db.UserProfiles.Where(t => t.Id == id).FirstOrDefault();
            if (userProfile == null)
            {
                return NotFound();
            }
            else
            {
                userProfile.FInUse = false;
            }
            //db.UserProfiles.Remove(userProfile);

            //using (ApplicationDbContext dbcontext = new ApplicationDbContext())
            //{
            //    dbcontext.Users.Remove(dbcontext.Users.Where(usr => usr.Id == id).Single());

            //    dbcontext.SaveChanges();
            //}

            AspNetUser aspUser = db.AspNetUsers.Where(t => t.Id == id).FirstOrDefault();
            if (aspUser == null)
            {
                return NotFound();
            }
            else
            {
                aspUser.LockoutEnabled = true;

            }
            #region xóa nhóm của user liên quan
            var group_us = db.Group_User.Where(t => t.UserName == userProfile.UserName && t.FInUse == true).ToList();
            foreach (var item in group_us)
            {
                db.Group_User.Remove(item);
            }
            #endregion
            db.SaveChanges();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserProfileExists(string id)
        {
            return db.UserProfiles.Count(e => e.Id == id) > 0;
        }

        [HttpGet]
        [Route("api/UserProfiles/GetUserbyCompany/{codeCompany}")]
        [ResponseType(typeof(UserProfile))]
        public  IHttpActionResult GetUserbyCompany(string codeCompany)
        {
            if (codeCompany == "ALL")
            {
                var obj = db.UserProfiles.Where(t => t.FInUse == true);
                return Ok(obj);
            }
            else
            {
                var obj = db.UserProfiles.Where(t => t.FInUse == true && t.FBranchCode == codeCompany);
                return Ok(obj);
            }

        }
        [HttpGet]
        [Route("api/UserProfiles/GetUserbyGroup")]
        [ResponseType(typeof(string))]
        public IHttpActionResult GetUserbyGroup(string codeGroup)
        {
            var obj = (from gr in db.Group_User
                       join us in db.UserProfiles on gr.UserName equals us.UserName
                       where gr.FInUse == true && gr.CodeGroup == codeGroup
                       select us);
            return Ok(obj);
        }


        [HttpGet]
        [Route("api/UserProfiles/GetUserbyUserName")]
        [ResponseType(typeof(UserProfile))]
        public IHttpActionResult GetUserbyUserName(string UserName)
        {
            var obj = db.UserProfiles.Where(t => t.UserName == UserName).FirstOrDefault();
            if (obj == null)
            {
                obj = new UserProfile();
                obj.UserName = UserName;
            }
            return Ok(obj);
        }

        [HttpGet]
        [Route("api/GetCurrentUserProfiles")]
        public IHttpActionResult GetCurrentUserProfiles()
        {
            var userProfile = db.UserProfiles.Where(t => t.UserName == HttpContext.Current.User.Identity.Name).FirstOrDefault();
            return Ok(userProfile);
        }
        [HttpPost]
        [Route("api/UpLoadImage")]
        public IHttpActionResult Upload()
        {

            bool exists = System.IO.Directory.Exists(HttpContext.Current.Server.MapPath("~/Avatar"));

            if (!exists)
                System.IO.Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/Avatar"));
            System.Web.HttpFileCollection httpRequest = System.Web.HttpContext.Current.Request.Files;
            for (int i = 0; i <= httpRequest.Count - 1; i++)
            {
                System.Web.HttpPostedFile postedfile = httpRequest[i];
                if (postedfile.ContentLength > 0)
                {
                    var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Avatar"), postedfile.FileName);
                    postedfile.SaveAs(fileSavePath);
                }
            }
            return Ok();
        }
        [HttpGet]
        [Route("api/UserProfile/GetAllUser")]
        public IHttpActionResult GetAllUser()
        {
            var curUser = HttpContext.Current.User.Identity.Name;
            var cmd = db.Database.Connection.CreateCommand();
            cmd.CommandText = "[dbo].[GetUserReceived] '" + curUser + "'";
            db.Database.Connection.Open();
            var reader = cmd.ExecuteReader();
            var dt = ((IObjectContextAdapter)db)
                .ObjectContext
                .Translate<UserProfile>(reader).ToList();

            db.Database.Connection.Close();
            return Ok(dt);
        }
    }
}