using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiCore.Commons;
using WebApiCore.Models;

namespace WebApiCore.Controllers
{
    [Authorize]
    public class IndexController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();
        //[HttpGet]
        //[Route("api/Index/CountInspectionByType")]
        //public IHttpActionResult CountInspectionByType(string typeHome)
        //{
        //    ArrayList arr = new ArrayList();
        //    arr.Add(CountInspec("0", false, typeHome));
        //    arr.Add(CountInspec("1", true, typeHome));
        //    arr.Add(CountInspec("2", false, typeHome));
        //    arr.Add(CountInspec("3", false, typeHome));
        //    return Ok(arr);
        //}
        ////public string CountInspec(string type, bool check, string typeHome)
        ////{
        ////    var curr = Common.GetCurrentCompanyName(db, HttpContext.Current.User.Identity.Name);
        ////    var count = "";
        ////    if (typeHome == "0")
        ////    {
        ////        if (check)
        ////        {
        ////            var data = (from ins in db.Inspections
        ////                        join lhtt in db.LoaiHinhTTs on ins.LoaiHinhTT equals lhtt.FCode
        ////                        where ins.FBranchCode == curr && lhtt.CheckLH == type
        ////                        && ins.FInUse == true && ins.Year == DateTime.Now.Year
        ////                        && (ins.Status == Constants.ThucHien || ins.Status == Constants.Duyet || ins.Status == Constants.KetThuc)
        ////                        select ins).ToList();
        ////            count = data.Count.ToString();
        ////        }
        ////        else
        ////        {
        ////            var data = (from ins in db.Inspections
        ////                        join lhtt in db.LoaiHinhTTs on ins.LoaiHinhTT equals lhtt.FCode
        ////                        where ins.FBranchCode == curr && lhtt.CheckLH == type
        ////                        && ins.FInUse == true && ins.Year == DateTime.Now.Year
        ////                        && (ins.Status == Constants.ThucHien || ins.Status == Constants.KetThuc)
        ////                        select ins).ToList();
        ////            count = data.Count.ToString();
        ////        }
        ////    }
        ////    else
        ////    {
        ////        if (check)
        ////        {
        ////            var data = (from ins in db.Inspections
        ////                        join lhtt in db.LoaiHinhTTs on ins.LoaiHinhTT equals lhtt.FCode
        ////                        where lhtt.CheckLH == type
        ////                        && ins.FInUse == true && ins.Year == DateTime.Now.Year
        ////                        && (ins.Status == Constants.ThucHien || ins.Status == Constants.Duyet || ins.Status == Constants.KetThuc)
        ////                        select ins).ToList();
        ////            count = data.Count.ToString();
        ////        }
        ////        else
        ////        {
        ////            var data = (from ins in db.Inspections
        ////                        join lhtt in db.LoaiHinhTTs on ins.LoaiHinhTT equals lhtt.FCode
        ////                        where lhtt.CheckLH == type
        ////                        && ins.FInUse == true && ins.Year == DateTime.Now.Year
        ////                        && (ins.Status == Constants.ThucHien || ins.Status == Constants.KetThuc)
        ////                        select ins).ToList();
        ////            count = data.Count.ToString();
        ////        }
        ////    }

        ////    return count;
        ////}

        //#region biểu đồ
        //[HttpGet]
        //[Route("api/Index/GetInfoInspecByCompany")]
        //public IHttpActionResult GetInfoInspecByCompany(string typeHome)
        //{
        //    List<objInspection> ListIn = new List<objInspection>();
        //    if (typeHome == "0")
        //    {
        //        var curr = Common.GetCurrentCompanyName(db, HttpContext.Current.User.Identity.Name);
        //        var dt = (from ins in db.Inspections
        //                  join lhtt in db.LoaiHinhTTs on ins.LoaiHinhTT equals lhtt.FCode
        //                  where ins.FBranchCode == curr
        //                  && ins.FInUse == true && ins.Year == DateTime.Now.Year
        //                  && ((lhtt.CheckLH == "1" && (ins.Status == Constants.ThucHien || ins.Status == Constants.Duyet || ins.Status == Constants.KetThuc))
        //                  || ((lhtt.CheckLH == "0" || lhtt.CheckLH == "2" || lhtt.CheckLH == "3") && (ins.Status == Constants.ThucHien || ins.Status == Constants.KetThuc))
        //                  )
        //                  select ins).ToList();

        //        foreach (var item in dt)
        //        {
        //            objInspection inspec = new objInspection();
        //            inspec.NameThoiGianThucHien = Common.GetNameKH(db, item.ThoiGianThucHien);
        //            inspec.NameDonViChuTri = Common.GetNameDonVi(db, item.DonViChuTri);
        //            inspec.NameDonViPhoiHop = Common.GetNameDonVi(db, item.DonViPhoiHop);
        //            inspec.StatusName = Common.GetStatusName(item.Status);
        //            if (item.FUserApprove != null && item.FUserApprove != "")
        //            {
        //                var user = db.UserProfiles.Where(t => t.UserName == item.FUserApprove).FirstOrDefault();
        //                if (user != null)
        //                    inspec.UserApprove = user.FullName;
        //            }
        //            inspec.itemInspection = item;
        //            var ObjInspec = db.ObjectByInspections.Where(t => t.F_Inspection == item.FCode).ToList();
        //            inspec.listObj = ObjInspec;
        //            ListIn.Add(inspec);
        //        }
        //    }
        //    else
        //    {
        //        var curr = Common.GetCurrentCompanyName(db, HttpContext.Current.User.Identity.Name);
        //        var dt = (from ins in db.Inspections
        //                  join lhtt in db.LoaiHinhTTs on ins.LoaiHinhTT equals lhtt.FCode
        //                  where ins.FInUse == true && ins.Year == DateTime.Now.Year
        //                  && ((lhtt.CheckLH == "1" && (ins.Status == Constants.ThucHien || ins.Status == Constants.Duyet || ins.Status == Constants.KetThuc))
        //                  || ((lhtt.CheckLH == "0" || lhtt.CheckLH == "2" || lhtt.CheckLH == "3") && (ins.Status == Constants.ThucHien || ins.Status == Constants.KetThuc))
        //                  )
        //                  select ins).ToList();

        //        foreach (var item in dt)
        //        {
        //            objInspection inspec = new objInspection();
        //            inspec.NameThoiGianThucHien = Common.GetNameKH(db, item.ThoiGianThucHien);
        //            inspec.NameDonViChuTri = Common.GetNameDonVi(db, item.DonViChuTri);
        //            inspec.NameDonViPhoiHop = Common.GetNameDonVi(db, item.DonViPhoiHop);
        //            inspec.StatusName = Common.GetStatusName(item.Status);
        //            if (item.FUserApprove != null && item.FUserApprove != "")
        //            {
        //                var user = db.UserProfiles.Where(t => t.UserName == item.FUserApprove).FirstOrDefault();
        //                if (user != null)
        //                    inspec.UserApprove = user.FullName;
        //            }
        //            inspec.itemInspection = item;
        //            var ObjInspec = db.ObjectByInspections.Where(t => t.F_Inspection == item.FCode).ToList();
        //            inspec.listObj = ObjInspec;
        //            ListIn.Add(inspec);
        //        }
        //    }
        //    return Ok(ListIn);
        //}
        //public class objInspection
        //{
        //    public Inspection itemInspection { get; set; }
        //    public string UserApprove { get; set; }
        //    public string NameDonViChuTri { get; set; }
        //    public string NameDonViPhoiHop { get; set; }
        //    public string NameThoiGianThucHien { get; set; }
        //    public string StatusName { get; set; }
        //    public string CountDV { get; set; }
        //    public List<Common.ListObjectInspect> ListObjectInspect { get; set; }
        //    public List<Common.ListProjectInspect> ListProjectInspect { get; set; }
        //    public List<Common.ListOrgInspect> ListOrgInspect { get; set; }
        //    public List<ObjectByInspection> listObj { get; set; }
        //    public List<Common.ListObjectByInspect> ListObjectByInspect { get; set; }
        //}

        //[HttpGet]
        //[Route("api/Index/GetBieuDoCot")]
        //public IHttpActionResult GetBieuDoCot(string typeHome)
        //{
        //    ArrayList arr = new ArrayList();
        //    arr.Add(GetDataBieuDoCot("0", false, typeHome));
        //    arr.Add(GetDataBieuDoCot("1", true, typeHome));
        //    arr.Add(GetDataBieuDoCot("2", false, typeHome));
        //    arr.Add(GetDataBieuDoCot("3", false, typeHome));
        //    return Ok(arr);
        //}
        //public List<objInspection> GetDataBieuDoCot(string type, bool check, string typeHome)
        //{
        //    var curr = Common.GetCurrentCompanyName(db, HttpContext.Current.User.Identity.Name);
        //    if (typeHome == "0")
        //    {
        //        if (check)
        //        {
        //            List<objInspection> ListIn = new List<objInspection>();
        //            var data = (from ins in db.Inspections
        //                        join lhtt in db.LoaiHinhTTs on ins.LoaiHinhTT equals lhtt.FCode
        //                        where ins.FBranchCode == curr && lhtt.CheckLH == type
        //                        && ins.FInUse == true && ins.Year == DateTime.Now.Year
        //                        && (ins.Status == Constants.ThucHien || ins.Status == Constants.Duyet || ins.Status == Constants.KetThuc)
        //                        select ins).ToList();
        //            foreach (var item in data)
        //            {
        //                objInspection inspec = new objInspection();
        //                inspec.NameThoiGianThucHien = Common.GetNameKH(db, item.ThoiGianThucHien);
        //                inspec.NameDonViChuTri = Common.GetNameDonVi(db, item.DonViChuTri);
        //                inspec.NameDonViPhoiHop = Common.GetNameDonVi(db, item.DonViPhoiHop);
        //                inspec.StatusName = Common.GetStatusName(item.Status);
        //                if (item.FUserApprove != null && item.FUserApprove != "")
        //                {
        //                    var user = db.UserProfiles.Where(t => t.UserName == item.FUserApprove).FirstOrDefault();
        //                    if (user != null)
        //                        inspec.UserApprove = user.FullName;
        //                }
        //                inspec.itemInspection = item;
        //                var ObjInspec = db.ObjectByInspections.Where(t => t.F_Inspection == item.FCode).ToList();
        //                inspec.listObj = ObjInspec;
        //                ListIn.Add(inspec);
        //            }
        //            return ListIn;
        //        }
        //        else
        //        {
        //            List<objInspection> ListIn = new List<objInspection>();
        //            var data = (from ins in db.Inspections
        //                        join lhtt in db.LoaiHinhTTs on ins.LoaiHinhTT equals lhtt.FCode
        //                        where ins.FBranchCode == curr && lhtt.CheckLH == type
        //                        && ins.FInUse == true && ins.Year == DateTime.Now.Year
        //                        && (ins.Status == Constants.ThucHien || ins.Status == Constants.KetThuc)
        //                        select ins).ToList();
        //            foreach (var item in data)
        //            {
        //                objInspection inspec = new objInspection();
        //                inspec.NameThoiGianThucHien = Common.GetNameKH(db, item.ThoiGianThucHien);
        //                inspec.NameDonViChuTri = Common.GetNameDonVi(db, item.DonViChuTri);
        //                inspec.NameDonViPhoiHop = Common.GetNameDonVi(db, item.DonViPhoiHop);
        //                inspec.StatusName = Common.GetStatusName(item.Status);
        //                if (item.FUserApprove != null && item.FUserApprove != "")
        //                {
        //                    var user = db.UserProfiles.Where(t => t.UserName == item.FUserApprove).FirstOrDefault();
        //                    if (user != null)
        //                        inspec.UserApprove = user.FullName;
        //                }
        //                inspec.itemInspection = item;
        //                var ObjInspec = db.ObjectByInspections.Where(t => t.F_Inspection == item.FCode).ToList();
        //                inspec.listObj = ObjInspec;
        //                ListIn.Add(inspec);
        //            }
        //            return ListIn;
        //        }
        //    }
        //    else
        //    {
        //        if (check)
        //        {
        //            List<objInspection> ListIn = new List<objInspection>();
        //            var data = (from ins in db.Inspections
        //                        join lhtt in db.LoaiHinhTTs on ins.LoaiHinhTT equals lhtt.FCode
        //                        where lhtt.CheckLH == type
        //                        && ins.FInUse == true && ins.Year == DateTime.Now.Year
        //                        && (ins.Status == Constants.ThucHien || ins.Status == Constants.Duyet || ins.Status == Constants.KetThuc)
        //                        select ins).ToList();
        //            foreach (var item in data)
        //            {
        //                objInspection inspec = new objInspection();
        //                inspec.NameThoiGianThucHien = Common.GetNameKH(db, item.ThoiGianThucHien);
        //                inspec.NameDonViChuTri = Common.GetNameDonVi(db, item.DonViChuTri);
        //                inspec.NameDonViPhoiHop = Common.GetNameDonVi(db, item.DonViPhoiHop);
        //                inspec.StatusName = Common.GetStatusName(item.Status);
        //                if (item.FUserApprove != null && item.FUserApprove != "")
        //                {
        //                    var user = db.UserProfiles.Where(t => t.UserName == item.FUserApprove).FirstOrDefault();
        //                    if (user != null)
        //                        inspec.UserApprove = user.FullName;
        //                }
        //                inspec.itemInspection = item;
        //                var ObjInspec = db.ObjectByInspections.Where(t => t.F_Inspection == item.FCode).ToList();
        //                inspec.listObj = ObjInspec;
        //                ListIn.Add(inspec);
        //            }
        //            return ListIn;
        //        }
        //        else
        //        {
        //            List<objInspection> ListIn = new List<objInspection>();
        //            var data = (from ins in db.Inspections
        //                        join lhtt in db.LoaiHinhTTs on ins.LoaiHinhTT equals lhtt.FCode
        //                        where lhtt.CheckLH == type
        //                        && ins.FInUse == true && ins.Year == DateTime.Now.Year
        //                        && (ins.Status == Constants.ThucHien || ins.Status == Constants.KetThuc)
        //                        select ins).ToList();
        //            foreach (var item in data)
        //            {
        //                objInspection inspec = new objInspection();
        //                inspec.NameThoiGianThucHien = Common.GetNameKH(db, item.ThoiGianThucHien);
        //                inspec.NameDonViChuTri = Common.GetNameDonVi(db, item.DonViChuTri);
        //                inspec.NameDonViPhoiHop = Common.GetNameDonVi(db, item.DonViPhoiHop);
        //                inspec.StatusName = Common.GetStatusName(item.Status);
        //                if (item.FUserApprove != null && item.FUserApprove != "")
        //                {
        //                    var user = db.UserProfiles.Where(t => t.UserName == item.FUserApprove).FirstOrDefault();
        //                    if (user != null)
        //                        inspec.UserApprove = user.FullName;
        //                }
        //                inspec.itemInspection = item;
        //                var ObjInspec = db.ObjectByInspections.Where(t => t.F_Inspection == item.FCode).ToList();
        //                inspec.listObj = ObjInspec;
        //                ListIn.Add(inspec);
        //            }
        //            return ListIn;
        //        }
        //    }


        //}
        //#endregion
        //[HttpGet]
        //[Route("api/Index/GetNotification")]
        //public IHttpActionResult GetNotification(string status)
        //{
        //    CountInspectByStatus ls = new CountInspectByStatus();
        //    var cmd = db.Database.Connection.CreateCommand();
        //    cmd.CommandText = "[dbo].[CountInspectByStatus] " + "'" + status + "'";
        //    db.Database.Connection.Open();
        //    var reader = cmd.ExecuteReader();
        //    var dt = ((IObjectContextAdapter)db)
        //        .ObjectContext
        //        .Translate<CountInspectByStatus>(reader).ToList();

        //    db.Database.Connection.Close();
        //    return Ok(dt);
        //}
        //public class CountInspectByStatus
        //{
        //    public string FName { get; set; }
        //    public int NumberOfInspects { get; set; }
        //}
        //[HttpGet]
        //[Route("api/Index/GetNotification_DV")]
        //public IHttpActionResult GetNotification_DV()
        //{
        //    var curr = Common.GetCurrentCompanyName(db, HttpContext.Current.User.Identity.Name);
        //    ArrayList arr = new ArrayList();
        //    var tralai = db.Plans.Where(t => t.Status == Constants.KhongDuyet && t.FInUse == true && t.FBranchCode == curr).ToList();
        //    if (tralai.Count > 0)
        //    {
        //        obj o = new obj();
        //        o.type = Constants.KhongDuyet;
        //        o.FName = "kế hoạch bị trả lại";
        //        o.NumberOfInspects = tralai.Count;
        //        arr.Add(o);
        //    }


        //    var duyet = db.Plans.Where(t => t.Status == Constants.Duyet && t.FInUse == true && t.FBranchCode == curr).ToList();
        //    if (duyet.Count > 0)
        //    {
        //        obj i = new obj();
        //        i.type = Constants.Duyet;
        //        i.FName = "kế hoạch đã được duyệt";
        //        i.NumberOfInspects = duyet.Count;
        //        arr.Add(i);
        //    }


        //    return Ok(arr);
        //}
        //public class obj
        //{
        //    public string type { get; set; }
        //    public string FName { get; set; }
        //    public int NumberOfInspects { get; set; }
        //}

        //[HttpGet]
        //[Route("api/Index/GetNotificationUserByInspect")]
        //public IHttpActionResult GetNotificationUserByInspect()
        //{
        //    string currUser = HttpContext.Current.User.Identity.Name;
        //    var dt = (from user in db.UserByInspections
        //              join insp in db.Inspections on user.F_Inspection equals insp.FCode
        //              where user.F_UserProfile == currUser
        //                    && user.FInUse == true
        //                    && insp.Status == Constants.ThucHien
        //              select new
        //              {
        //                  FCode = user.F_Inspection,
        //                  F_Inspection = insp.FName,
        //                  FCreateTime = user.FCreateTime,
        //              }).OrderByDescending(t => t.FCreateTime).ToList();


        //    return Ok(dt);

        //}

        //[HttpGet]
        //[Route("api/Index/GetNotificationTTDX")]
        //public IHttpActionResult GetNotificationTTDX()
        //{
        //    // var NotiTTDX = db.NotificationTTDXes.ToList();
        //    string currUser = HttpContext.Current.User.Identity.Name;
        //    var dt = db.Inspections.Where(t => t.FInUse == true && t.F_Plan == null).ToList();
        //    foreach (var item in dt)
        //    {
        //        var check = db.NotificationTTDXes.Where(t => t.FCode == item.FCode).FirstOrDefault();
        //        if (check == null)
        //        {
        //            NotificationTTDX noti = new NotificationTTDX();
        //            noti.FCode = item.FCode;
        //            noti.FName = item.FName;
        //            noti.FStatus = item.LoaiHinhTT;
        //            noti.FDescription = item.FBranchCode;
        //            db.NotificationTTDXes.Add(noti);
        //            db.SaveChanges();
        //        }
        //    }
        //    //var NotiTTDX = db.NotificationTTDXes.Where(t => t.FInUse == true && t.UserRead == null).ToList();
        //    var except = (from org in db.Organizations
        //                  join not in db.NotificationTTDXes on org.FCode equals not.FDescription
        //                  join type in db.LoaiHinhTTs on not.FStatus equals type.FCode
        //                  where not.FInUse == true && not.UserRead.Contains(currUser)
        //                  select new
        //                  {
        //                      FCode = not.FCode,
        //                      InsName = not.FName,
        //                      DVCT = org.FName,
        //                      Loai = type.FName
        //                  }).ToList();
        //    var NotiTTDX = (from org in db.Organizations
        //                    join not in db.NotificationTTDXes on org.FCode equals not.FDescription
        //                    join type in db.LoaiHinhTTs on not.FStatus equals type.FCode
        //                    where not.FInUse == true
        //                    select new
        //                    {
        //                        FCode = not.FCode,
        //                        InsName = not.FName,
        //                        DVCT = org.FName,
        //                        Loai = type.FName
        //                    }).ToList().Except(except);

        //    return Ok(NotiTTDX);

        //}

        //[HttpPost]
        //[Route("api/Index/CheckReadNotiTTDX")]
        //public IHttpActionResult CheckReadNotiTTDX(string FCode)
        //{
        //    var curr = HttpContext.Current.User.Identity.Name;
        //    var NotiTTDX = db.NotificationTTDXes.Where(t => t.FCode == FCode).FirstOrDefault();
        //    NotiTTDX.UserRead = NotiTTDX.UserRead + " " + curr;
        //    int i = db.SaveChanges();

        //    return Ok(i);

        //}

        //public string GetInspection(string us)
        //{

        //    var dt = db.Inspections.Where(t => t.FCode == us).FirstOrDefault();
        //    return dt.FName;

        //}

        [HttpGet]
        [Route("api/UserProfile/GetDVOfUser")]
        [ResponseType(typeof(object))]
        public IHttpActionResult GetDVOfUser()
        {
            var us = Common.GetCurrentCompanyName(db, HttpContext.Current.User.Identity.Name);
            var dt = db.Organizations.Where(t => t.FCode == us).FirstOrDefault();
            return Ok(dt);
        }
        [HttpGet]
        [Route("api/UserProfiles/GetRoleOfCurentUser")]
        [ResponseType(typeof(UserProfile))]
        public async Task<IHttpActionResult> GetRoleOfCurentUser()
        {
            string check = "0";
            var currUser = HttpContext.Current.User.Identity.Name;
            var obj = await (from gr_role in db.Group_Role
                       join gr_us in db.Group_User on gr_role.CodeGroup equals gr_us.CodeGroup
                       join us in db.UserProfiles on gr_us.UserName equals us.UserName
                       where gr_role.CodeRole == Constants.DUYETKH && gr_role.FInUse == true && us.UserName == currUser && us.FInUse == true
                       select gr_role).FirstOrDefaultAsync();
            if (obj != null)
            {
                check = "1";
            }
            return Ok(check);
        }
        //[HttpGet]
        //[Route("api/Index/GetMessReceived")]
        //[ResponseType(typeof(UserProfile))]
        //public IHttpActionResult GetMessReceived()
        //{
        //    var curUser = HttpContext.Current.User.Identity.Name;
        //    var curOrg = Common.GetCurrentCompanyName(db, curUser);
        //    var dt = db.Notifications.Where(t => (t.OrgRecieved.Contains(curOrg) || t.UserReceived.Contains(curUser)) && t.FStatus == "SEND" && !t.UserRead.Contains(curUser)).Count();
        //    return Ok(dt);
        //}
        //[HttpGet]
        //[Route("api/Index/GetMessOrgLead")]
        //[ResponseType(typeof(UserProfile))]
        //public IHttpActionResult GetMessOrgLead()
        //{
        //    var curOrg = Common.GetCurrentCompanyName(db, HttpContext.Current.User.Identity.Name);
        //    var dt = (from x in db.Inspections
        //              join y in db.Organizations on x.DonViChuTri equals y.FCode
        //              where x.FInUse == true && x.Status != Constants.ThucHien && x.Status != Constants.KetThuc
        //              && y.FParent == curOrg
        //              select x).OrderByDescending(t => t.FCreateTime);
        //    //.Where(t => t.FInUse == true && t.DonViChuTri == curOrg && t.Status != Constants.ThucHien && t.Status != Constants.KetThuc).OrderByDescending(t => t.FCreateTime);
        //    return Ok(dt);
        //}
    }
}
