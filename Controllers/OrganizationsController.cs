using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Configuration;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiCore.Commons;
using WebApiCore.Models;
using static WebApiCore.Commons.Common;

namespace WebApiCore.Controllers
{
    [Authorize]
    public class OrganizationsController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();

        [Route("Org/Tree/{ComCode}")]
        [ResponseType(typeof(object))]
        public async Task<IHttpActionResult> GetOrgTree(string ComCode)
        {
            var Com = await db.Companies.Where(x => x.FCode == ComCode).SingleOrDefaultAsync();
            var Org = await db.Organizations.Where(x => x.FCode == ComCode).SingleOrDefaultAsync();
            if (Com == null && Org == null)
                return NotFound();
            ArrayList OrgList = new ArrayList();
            var orgs = db.Organizations.Where(x => x.FParent == ComCode);
            foreach (Organization org in orgs)
            {
                var o = new
                {
                    id = org.Id,
                    code = org.FCode,
                    text = org.FName,
                    children = await GetChild(org.FCode)
                };
                OrgList.Add(o);
            }
            if (Com == null)
            {
                var oCom = new
                {
                    id = ComCode,
                    code = Org.FCode,
                    text = Org.FName,
                    children = OrgList,
                    state = new
                    {
                        opened = true,  // is the node open
                        disabled = false,  // is the node disabled
                        selected = true // is the node selected
                    }

                };
                return Ok(oCom);
            }
            else
            {
                return Ok(OrgList);
            }
        }
        public async Task<ArrayList> GetChild(string ComCode)
        {
            ArrayList Child = new ArrayList();
            var Com = await db.Companies.Where(x => x.FCode == ComCode).SingleOrDefaultAsync();
            ArrayList OrgList = new ArrayList();
            var orgs = db.Organizations.Where(x => x.FParent == ComCode);
            foreach (Organization org in orgs)
            {
                var o = new
                {
                    id = org.Id,
                    code = org.FCode,
                    text = org.FName,
                    children = await GetChild(org.FCode)
                };
                OrgList.Add(o);
            }
            Child = OrgList;
            return Child;
        }
        [Route("Org/TreeText/{ComCode}/{Type}")]
        [ResponseType(typeof(object))]
        public async Task<IHttpActionResult> GetOrgTreeText(string ComCode, string Type)
        {
            var Com = await db.Companies.Where(x => x.FCode == ComCode).SingleOrDefaultAsync();
            ArrayList OrgList = new ArrayList();

            string TypeDV = "PB";
            // Chỉ lấy tất cả danh sách đơn vị + phòng ban - k lấy company
            if (Type == "4")
            {
                TypeDV = "";
            }
            if (Com != null)
            {
                var oCom = new
                {
                    id = ComCode,
                    text = Com.FName,
                    code = Com.FCode,
                };
                if (Type == "ALL")
                    OrgList.Add(oCom);
            }
            int index = 1;
            // chỉ lấy phòng ban của user đang đăng nhập 
            if (Type == "0")
            {
                TypeDV = "PB";
                var currentUsername = !string.IsNullOrEmpty(System.Web.HttpContext.Current?.User?.Identity?.Name)
              ? System.Web.HttpContext.Current.User.Identity.Name
              : "Anonymous";
                string FBranhCode = Common.GetCurrentCompanyName(db, currentUsername);
                ComCode = FBranhCode;
            }
            // Chỉ lấy danh sách đơn vị
            if (Type == "1")
            {
                TypeDV = "DV";
            }
            // Lấy thông của đơn vị và phòng ban của đơn vị của user đăng nhập
            if (Type == "2")
            {
                //TypeDV = "DV";
                var currentUsername = !string.IsNullOrEmpty(System.Web.HttpContext.Current?.User?.Identity?.Name)
                    ? System.Web.HttpContext.Current.User.Identity.Name
                    : "Anonymous";
                string FBranhCode = Common.GetCurrentCompanyName(db, currentUsername);
                ComCode = FBranhCode;
                var org = db.Organizations.Where(x => x.FCode == ComCode).FirstOrDefault();
                var oCom = new
                {
                    id = org.FCode,
                    text = org.FName,
                    code = org.FCode,

                };
                OrgList.Add(oCom);
            }


            var orgs = db.Organizations.Where(x => x.FParent == ComCode);
            int stt = 1;
            string TypeDvOld = TypeDV;
            foreach (Organization org in orgs)
            {
                if (Type == "3")
                {
                    var currentUsername = !string.IsNullOrEmpty(System.Web.HttpContext.Current?.User?.Identity?.Name)
                  ? System.Web.HttpContext.Current.User.Identity.Name
                  : "Anonymous";
                    string FBranhCode = Common.GetCurrentCompanyName(db, currentUsername);
                    //ComCode = FBranhCode;
                    if (org.FCode == FBranhCode)
                    {
                        TypeDV = "PB";
                    }
                    else TypeDV = "DV";
                }
                var o = new
                {
                    id = org.FCode,
                    code = org.FCode,
                    text = stt + "." + org.FName,
                };
                OrgList.Add(o);
                OrgList.AddRange(await GetChildText(org.FCode, index + 1, stt.ToString(), TypeDV));
                stt++;
            }
            return Ok(OrgList);
        }

        public async Task<ArrayList> GetChildText(string ComCode, int index, string stt, string Type)
        {
            ArrayList Child = new ArrayList();
            var Com = await db.Companies.Where(x => x.FCode == ComCode).SingleOrDefaultAsync();
            ArrayList OrgList = new ArrayList();
            var orgs = db.Organizations.Where(x => x.FParent == ComCode && (Type == "" || (x.IsDV == true && Type == "DV") || (x.IsDV == false && Type == "PB")));
            //string strEnd = "";
            //string strBegin = "";
            //for (int i = 0; i < index; i++)
            //{
            //    strBegin += "  ";
            //    strEnd += "--";
            //}

            int stt2 = 1;
            foreach (Organization org in orgs)
            {
                string strstt = stt + "." + stt2;
                var o = new
                {
                    id = org.FCode,
                    code = org.FCode,
                    //text = strBegin + "|" + strEnd + " " + org.FName,
                    text = strstt + "." + org.FName,
                    // children = await GetChild(org.FCode)
                };
                OrgList.Add(o);
                OrgList.AddRange(await GetChildText(org.FCode, index + 1, strstt.ToString(), Type));
                stt2++;
            }
            Child = OrgList;
            return Child;
        }

        // GET: api/Organizations
        public IQueryable<Organization> GetOrganizations()
        {
            return db.Organizations;
        }

        // GET: api/Organizations/5
        
        [ResponseType(typeof(Organization))]
        public async Task<IHttpActionResult> GetOrganization(long id)
        {
            Organization organization = await db.Organizations.FindAsync(id);
            if (organization == null)
            {
                return NotFound();
            }

            return Ok(organization);
        }
        public string FullAddress(Organization u)
        {
            var provin = db.Areas.Where(t => t.FCode == u.Provin).FirstOrDefault();
            var district = db.Areas.Where(t => t.FCode == u.Disctrict).FirstOrDefault();
            var ward = db.Areas.Where(t => t.FCode == u.Ward).FirstOrDefault();
            var area = "";
            if (u.Address != "" && u.Address != null)
            {
                area += u.Address;
                if (ward != null)
                {
                    area += ", ";
                }
            }
            if (ward != null)
                area += ward.FName;
            if (district != null)
            {
                area += ", ";
                area += district.FName;
            }

            if (provin != null)
                area += ", " + provin.FName;

            string sFirstCharacter = area.Substring(0, 1);
            if (sFirstCharacter == ",")
                area = area.Substring(1);
            return area;
        }
        // PUT: api/Organizations/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOrganization(long id, Organization organization)
        {
            Validate(organization);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != organization.Id)
            {
                return BadRequest();
            }
            organization.FullAddress = FullAddress(organization);
            organization.SearchKey = Commons.Common.ReplaceUnicode(organization.FName + organization.FCode) + organization.FName + organization.FCode;
            db.Entry(organization).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrganizationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Organizations
        [HttpPost]
        [Route("api/Organizations")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PostOrganization(Organization organization)
        {
            Validate(organization);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            organization.FullAddress = FullAddress(organization);
            organization.SearchKey = Commons.Common.ReplaceUnicode(organization.FName + organization.FCode) + organization.FName + organization.FCode;
            db.Organizations.Add(organization);
            await db.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Organizations/5
        [ResponseType(typeof(Organization))]
        public async Task<IHttpActionResult> DeleteOrganization(long id)
        {
            Organization organization = await db.Organizations.FindAsync(id);
            if (organization == null)
            {
                return NotFound();
            }

            db.Organizations.Remove(organization);
            await db.SaveChangesAsync();

            return Ok(organization);
        }
        private void Validate(Organization item)
        {
            if (string.IsNullOrEmpty(item.FCode))
            {
                ModelState.AddModelError("FCode", "Bắt buộc nhập mã phòng ban");
                ModelState.AddModelError("FCode", "has-error");

            }
            if (string.IsNullOrEmpty(item.FName))
            {
                ModelState.AddModelError("FName", "Bắt buộc nhập tên phòng ban");
                ModelState.AddModelError("FName", "has-error");
            }
            if (string.IsNullOrEmpty(item.FParent))
            {
                ModelState.AddModelError("FName", "Bắt buộc chọn công ty/tổ chức");
                ModelState.AddModelError("FName", "has-error");
            }

        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrganizationExists(long id)
        {
            return db.Organizations.Count(e => e.Id == id) > 0;
        }
        #region Get thông tin cơ quan thông qua mã user
        [HttpGet]
        [Route("api/Organizations/GetOrgByUser")]
        [ResponseType(typeof(Organization))]
        public async Task<IHttpActionResult> GetOrgByUser(string UserName)
        {
            var Com = await db.UserProfiles.Where(x => x.UserName == UserName).FirstOrDefaultAsync();
            if (Com != null)
            {
                var Org = await db.Organizations.Where(x => x.FCode == Com.DonVi).FirstOrDefaultAsync();
                if (Org != null) return Ok(Org);
            }
            return NotFound();
        }

        #endregion
        //#region Load Org Inspection by area
        //#region function Lấy là danh sách đơn vị + phòng ban của đơn vị

        //public List<Organization> GetChildListOrganization(string FParent, string CodeArea, string TypeArea, string ParentArea, int pageNumber, int pageSize, string code, string searchKey)
        //{
        //    List<Organization> Child = new List<Organization>();
        //    var data = db.Organizations.Where(
        //                     t => t.FInUse == true
        //                     && t.FParent == FParent
        //                    )
        //           .ToList();
        //    if (data.Count > 0)
        //    {
        //        foreach (Organization org in data)
        //        {
        //            Child.AddRange(GetChildListOrganization(org.FCode, CodeArea, TypeArea, ParentArea, pageNumber, pageSize, code, searchKey));
        //        }
        //        Child.AddRange(data);
        //    }

        //    return Child;
        //}
        //#endregion
        //[HttpPost]
        //[Route("api/Organizations/GetOrgInspection")]
        //[ResponseType(typeof(object))]
        //public IHttpActionResult GetObjectInspection([FromBody]List<Object> obj, string CodeArea, string TypeArea, string ParentArea, int pageNumber, int pageSize, string code, string searchKey)
        //{
        //    var FBranhCode = "";
        //    var currentUsername = !string.IsNullOrEmpty(System.Web.HttpContext.Current?.User?.Identity?.Name)
        //        ? System.Web.HttpContext.Current.User.Identity.Name
        //        : "Anonymous";
        //    FBranhCode = Common.GetCurrentCompanyName(db, currentUsername);
        //    if (searchKey != null) searchKey = Common.ReplaceUnicode(searchKey); else searchKey = "";
        //    var data = db.Organizations.Where(
        //                     t => t.FInUse == true && t.FCode != FBranhCode
        //                     && t.IsDV == true
        //                    )
        //           .ToList();
        //    data.AddRange(GetChildListOrganization(FBranhCode, CodeArea, TypeArea, ParentArea, pageNumber, pageSize, code, searchKey));
        //    data = data.Where(t => ((t.Provin == CodeArea && TypeArea == "TINH") || (t.Disctrict == CodeArea && TypeArea == "HUYEN") || (t.Ward == CodeArea && TypeArea == "XA"))
        //                  && (t.FName.ToLower().Contains(searchKey.ToLower()) || searchKey.Trim().ToString() == "" || t.SearchKey.ToLower().Contains(searchKey.ToLower()))).ToList();
        //    int total = data.Count;
        //    if (total > pageSize)
        //        data = data.OrderBy(t => t.IsDV).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
        //    List<ListOrgInspection> list_orgInspec = new List<ListOrgInspection>();
        //    int count = 0; if (obj != null) count = obj.Count;
        //    foreach (var it in data)
        //    {
        //        ListOrgInspection item = new ListOrgInspection();
        //        if (count > 0)
        //        {
        //            for (int i = 0; i < count; i++)
        //            {
        //                try
        //                {
        //                    ListObjectByInspect result = JsonConvert.DeserializeObject<ListObjectByInspect>(obj[i].ToString());
        //                    if (it.FCode == result.objectByInspect.F_Obj_Inspection && result.objectByInspect.Type == Constants.ORG) item.check = true;
        //                    item.org_Inspec = it;
        //                }
        //                catch { }
        //            }
        //        }
        //        else
        //        {
        //            item.org_Inspec = it;
        //        }
        //        list_orgInspec.Add(item);
        //    }
        //    Paging pg = new Paging();
        //    pg.ListOrg_Inspec = list_orgInspec;
        //    pg.totalCount = total;
        //    pg.totalPage = System.Convert.ToInt32(System.Math.Ceiling(total / System.Convert.ToDouble(pageSize)));
        //    pg.pageStart = ((pageNumber - 1) * pageSize) + 1;
        //    if (pg.totalPage == pageNumber)
        //    {
        //        pg.pageEnd = total;
        //    }
        //    else pg.pageEnd = ((pageNumber - 1) * pageSize) + pageSize;
        //    return Ok(pg);
        //}
        //public class Paging
        //{
        //    public List<ListObjInspection> ListObj_Inspec { get; set; }
        //    public List<ListOrgInspection> ListOrg_Inspec { get; set; }
        //    public int pageStart { get; set; }
        //    public int pageEnd { get; set; }
        //    public int totalCount { get; set; }
        //    public int totalPage { get; set; }
        //}
        //public class ListObjInspection : ObjectInspect
        //{
        //    public int check { get; set; }
        //}
        //public class ListOrgInspection
        //{
        //    public Organization org_Inspec { get; set; }
        //    public bool check { get; set; }

        //}

        //[HttpGet]
        //[Route("api/Organizations/ListOrgInspect/{FobjInspec}/{FInspec}/{Year}")]
        //[ResponseType(typeof(ListOrgInspect))]
        //public IHttpActionResult ListObjectInspect(string FobjInspec, string FInspec, string Year)
        //{
        //    ListOrgInspect obj = new ListOrgInspect();
        //    var ObjIns = db.Organizations.Where(t => t.FCode == FobjInspec).FirstOrDefault();
        //    obj.orgInspect = ObjIns;
        //    int? year = 0;
        //    try { year = int.Parse(Year); } catch { }
        //    obj.ListcoinsideInspection = Check_coincide(db, FInspec, FobjInspec, year);
        //    return Ok(obj);
        //}

        //[HttpPost]
        //[Route("api/ObjectInspects/SaveObjInspection/{FInspec}/{Year}")]
        //[ResponseType(typeof(object))]
        //public async Task<IHttpActionResult> SaveObjInspection(ObjectInspect objectInspect, string FInspec, string Year)
        //{
        //    if (objectInspect != null)
        //    {
        //        Validate(objectInspect);
        //        if (!ModelState.IsValid)
        //        {
        //            return BadRequest(ModelState);
        //        }
        //        ListObjectInspect obj = new ListObjectInspect();
        //        objectInspect.SearchKey = ReplaceUnicode(objectInspect.FName + objectInspect.FCode) + objectInspect.FName + objectInspect.FCode;
        //        var dt = db.ObjectInspects.Where(t => t.FCode == objectInspect.FCode).FirstOrDefault();
        //        if (dt == null)
        //        {
        //            objectInspect.FInUse = true;
        //            db.ObjectInspects.Add(objectInspect);
        //            db.SaveChanges();
        //        }
        //        else
        //        {
        //            dt.SearchKey = ReplaceUnicode(objectInspect.FName + objectInspect.FCode) + objectInspect.FName + objectInspect.FCode;
        //            dt.FInUse = true;
        //            dt.FCode = objectInspect.FCode;
        //            dt.FName = objectInspect.FName;
        //            dt.FDescription = objectInspect.FDescription;
        //            dt.FStatus = objectInspect.FStatus;
        //            dt.FIndex = objectInspect.FIndex;
        //            dt.FLevel = objectInspect.FLevel;
        //            dt.FInUse = objectInspect.FInUse;
        //            dt.FBranchCode = objectInspect.FBranchCode;
        //            dt.DTThanhTra = objectInspect.DTThanhTra;
        //            dt.Address = objectInspect.Address;
        //            dt.Provin = objectInspect.Provin;
        //            dt.District = objectInspect.District;
        //            dt.Ward = objectInspect.Ward;
        //            dt.Type = objectInspect.Type;
        //            dt.NgayCap = objectInspect.NgayCap;
        //            dt.NoiCap = objectInspect.NoiCap;
        //            dt.SearchKey = objectInspect.SearchKey;
        //            dt.LoaiHinhDN = objectInspect.LoaiHinhDN;
        //            db.SaveChanges();
        //            int? year = 0;
        //            try { year = int.Parse(Year); } catch { }
        //            obj.ListcoinsideInspection = Check_coincide(db, FInspec, objectInspect.FCode, year);
        //        }
        //        obj.objectInspect = objectInspect;
        //        return Ok(obj);
        //    }
        //    return Ok();
        //}
        //#endregion

        [HttpGet]
        [Route("api/Org/GetOrgByFCode")]
        public IHttpActionResult GetOrgByFCode(string FCode)
        {
            var dt = db.Organizations.Where(t => t.FCode == FCode).FirstOrDefault();
            if (dt == null)
            {
                return NotFound();
            }
            return Ok(dt);
        }

        [HttpPost]
        [Route("api/Org/ImportOrg")]
        [ResponseType(typeof(object))]
        public async Task<IHttpActionResult> ImportOrg()
        {
            string def = WebConfigurationManager.AppSettings["DefaultArea"];
            var data = db.Areas.Where(t => t.Parent == def).ToList();
            foreach (var item in data)
            {
                var child = db.Areas.Where(t => t.Parent == item.FCode).ToList();
                foreach (var itemchild in child)
                {
                    var obj = db.Organizations.Where(t => t.FCode == itemchild.FCode).FirstOrDefault();
                    if (obj != null) obj.FInUse = true;
                    else
                    {
                        obj = new Organization();
                        obj.FCode = itemchild.FCode;
                        obj.FName = "UBND " + itemchild.FName;
                        obj.FParent = item.FCode;
                        obj.IsDV = true;
                        obj.SearchKey = Commons.Common.ReplaceUnicode(obj.FName + obj.FCode) + obj.FName + obj.FCode;
                        obj.Provin = WebConfigurationManager.AppSettings["DefaultArea"];
                        db.Organizations.Add(obj);
                        db.SaveChanges();
                        //obj.FullAddress = FullAddress();
                    }
                }
            }
            return Ok();
        }

        [HttpPost]
        [Route("api/SaveListOrg")]
        [ResponseType(typeof(void))]
        public IHttpActionResult SaveListOrg(List<Organization> obj)
        {
            string def = WebConfigurationManager.AppSettings["DefaultCompany"];
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (var data in obj)
            {
                if (!string.IsNullOrEmpty(data.Ward))
                {
                    var ward = db.Areas.Where(t => t.FName.Contains(data.Ward)).FirstOrDefault();
                    if (ward != null)
                    {
                        data.Ward = ward.FCode;
                    }
                }
                if (!string.IsNullOrEmpty(data.Disctrict))
                {
                    var district = db.Areas.Where(t => t.FName.Contains(data.Disctrict)).FirstOrDefault();
                    if (district != null)
                    {
                        data.Disctrict = district.FCode;
                    }
                }
                data.Provin = WebConfigurationManager.AppSettings["DefaultArea"];
                if (!string.IsNullOrEmpty(data.FCode))
                {
                    var check = db.Organizations.Where(t => t.FCode == data.FCode).FirstOrDefault();
                    if (check != null)
                    {
                        data.FInUse = true;
                        data.FullAddress = FullAddress(data);
                        data.SearchKey = Commons.Common.ReplaceUnicode(data.FName + data.FCode) + data.FName + data.FCode;
                    }
                    else
                    {
                        if (data.FParent == null)
                            data.FParent = def;
                        data.FullAddress = FullAddress(data);
                        data.SearchKey = Commons.Common.ReplaceUnicode(data.FName + data.FCode) + data.FName + data.FCode;
                        db.Organizations.Add(data);
                    }
                }
                db.SaveChanges();

            }
            return StatusCode(HttpStatusCode.OK);

        }

        [HttpGet]
        [Route("api/Org/GetOrgLevelOne")]
        public IHttpActionResult GetOrgLevelOne()
        {
            var parent = WebConfigurationManager.AppSettings["DefaultCompany"];
            var dt = db.Organizations.Where(t => t.FParent == parent).ToList();
            return Ok(dt);
        }
    }
}