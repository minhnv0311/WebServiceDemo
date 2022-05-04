using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiCore.Commons;
using WebApiCore.Models;

namespace WebApiCore.Controllers
{
    public class NotificationsController : ApiController
    {
        //private WebApiDataEntities db = new WebApiDataEntities();

        //// GET: api/Notifications
        //public IQueryable<Notification> GetNotifications()
        //{
        //    return db.Notifications;
        //}
        //public string GetUserName(string us)
        //{
        //    var text = "";
        //    var user = db.UserProfiles.Where(t => t.UserName == us).FirstOrDefault();
        //    if (user != null)
        //    {
        //        text = user.FullName;
        //    }
        //    return text;
        //}
        //[HttpGet]
        //[Route("api/Notification/GetNoti")]
        //public List GetNoti(int pageNumber, int pageSize, string searchKey, string status)
        //{
        //    List ls = new List();
        //    var curUser = HttpContext.Current.User.Identity.Name;
        //    if (searchKey == null) searchKey = "";
        //    var dt = db.Notifications.Where(t => (t.FName.Contains(searchKey) || searchKey == "") && t.FUserCreate == curUser && t.FStatus == status)
        //        .ToList()
        //        .Select(t => new View
        //        {
        //            Id = t.Id,
        //            FCode = t.FCode,
        //            FName = t.FName,
        //            FStatus = t.FStatus,
        //            UserReceived = Common.GetUserReceived(db, t.UserReceived),
        //            OrgRecieved = Common.GetOrgReceived(db, t.OrgRecieved),
        //            FDescription = t.FDescription,
        //            FCreateTime = t.FCreateTime,
        //            UserRead = t.UserRead,
        //            FileDinhKem = t.FileDinhKem,
        //            FUserCreate = GetUserName(t.FUserCreate)
        //        });
        //    var count = dt.ToList().Count;
        //    ls.dt = dt.ToList();
        //    ls.totalCount = count;
        //    ls.totalPage = System.Convert.ToInt32(System.Math.Ceiling(ls.totalCount / System.Convert.ToDouble(pageSize)));
        //    ls.pageStart = ((pageNumber - 1) * pageSize) + 1;
        //    if (ls.totalPage == pageNumber)
        //    {
        //        ls.pageEnd = ls.totalCount;
        //    }
        //    else ls.pageEnd = ((pageNumber - 1) * pageSize) + pageSize;
        //    return ls;
        //}
        //public class View
        //{
        //    public long Id { get; set; }
        //    public string FCode { get; set; }
        //    public string FName { get; set; }
        //    public string FStatus { get; set; }
        //    public string OrgRecieved { get; set; }
        //    public string UserReceived { get; set; }
        //    public string FDescription { get; set; }
        //    public string FUserCreate { get; set; }
        //    public string FileDinhKem { get; set; }
        //    public string UserRead { get; set; }
        //    public DateTime? FCreateTime { get; set; }
        //}
        //public class List
        //{
        //    public List<View> dt { get; set; }
        //    public int totalCount { get; set; }
        //    public int pageStart { get; set; }
        //    public int pageEnd { get; set; }
        //    public int totalPage { get; set; }
        //}
        //[HttpGet]
        //[Route("api/Notification/GetNotiReceived")]
        //public List GetNotiReceived(int pageNumber, int pageSize, string searchKey, string status)
        //{
        //    List ls = new List();
        //    var curUser = HttpContext.Current.User.Identity.Name;
        //    var curOrg = Common.GetCurrentCompanyName(db, curUser);
        //    if (searchKey == null) searchKey = "";
        //    var dt = db.Notifications.Where(t => (t.FName.Contains(searchKey) || searchKey == "")
        //    && (t.OrgRecieved.Contains(curOrg) || t.UserReceived.Contains(curUser))
        //    && t.FStatus == status)
        //        .ToList()
        //        .Select(t => new View
        //        {
        //            Id = t.Id,
        //            FCode = t.FCode,
        //            FName = t.FName,
        //            FStatus = t.FStatus,
        //            UserReceived = Common.GetUserReceived(db, t.UserReceived),
        //            OrgRecieved = Common.GetOrgReceived(db, t.OrgRecieved),
        //            FDescription = t.FDescription,
        //            FCreateTime = t.FCreateTime,
        //            FUserCreate = GetUserName(t.FUserCreate),
        //            FileDinhKem = t.FileDinhKem,
        //            UserRead = t.UserRead
        //        });
        //    var count = dt.ToList().Count;
        //    ls.dt = dt.ToList();
        //    ls.totalCount = count;
        //    ls.totalPage = System.Convert.ToInt32(System.Math.Ceiling(ls.totalCount / System.Convert.ToDouble(pageSize)));
        //    ls.pageStart = ((pageNumber - 1) * pageSize) + 1;
        //    if (ls.totalPage == pageNumber)
        //    {
        //        ls.pageEnd = ls.totalCount;
        //    }
        //    else ls.pageEnd = ((pageNumber - 1) * pageSize) + pageSize;
        //    return ls;
        //}
        //// GET: api/Notifications/5
        //[ResponseType(typeof(Notification))]
        //public IHttpActionResult GetNotification(long id)
        //{
        //    Notification notification = db.Notifications.Find(id);
        //    if (notification == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(notification);
        //}

        //// PUT: api/Notifications/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutNotification(long id, Notification notification, string status, bool check)
        //{
        //    Validate(notification);
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != notification.Id)
        //    {
        //        return BadRequest();
        //    }

        //    if (check == true)
        //    {
        //        db.Entry(notification).State = EntityState.Modified;
        //        db.SaveChanges();
        //    }
        //    else
        //    {
        //        var noti = db.Notifications.Where(t => t.Id == id).FirstOrDefault();
        //        if (noti != null)
        //        {
        //            notification = noti;
        //            noti.FStatus = status;
        //        }

        //        db.SaveChanges();
        //    }
        //    //try
        //    //{

        //    //}
        //    //catch (DbUpdateConcurrencyException)
        //    //{
        //    //    if (!NotificationExists(id))
        //    //    {
        //    //        return NotFound();
        //    //    }
        //    //    else
        //    //    {
        //    //        throw;
        //    //    }
        //    //}

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //// POST: api/Notifications
        //[ResponseType(typeof(Notification))]
        //public IHttpActionResult PostNotification(Notification notification, string status)
        //{
        //    Validate(notification);
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    var Code = "NOTI";
        //    Code = Code.ToUpper();
        //    AutoID AutoId = db.AutoIDs.Where(x => x.FCode == Code).SingleOrDefault();
        //    if (AutoId == null)
        //    {
        //        AutoId = new AutoID();
        //        AutoId.FCode = Code;
        //        AutoId.Counter = 1;
        //        db.AutoIDs.Add(AutoId);
        //    }
        //    AutoId.FName = Code;
        //    for (int i = 0; i < 6 - AutoId.Counter.ToString().Length; i++)
        //        AutoId.FName += 0;
        //    AutoId.FName += AutoId.Counter.ToString();
        //    AutoId.Counter += 1;
        //    notification.FCode = AutoId.FName;
        //    notification.FStatus = status;
        //    notification.UserRead = "";
        //    db.Notifications.Add(notification);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = notification.Id }, notification);
        //}
        //[HttpPost]
        //[Route("api/Notification/CheckLog")]
        //[ResponseType(typeof(Notification))]
        //public IHttpActionResult CheckLog(Notification notification)
        //{
        //    var currentUs = HttpContext.Current.User.Identity.Name;
        //    var check = db.Notifications.Where(t=>t.Id == notification.Id).FirstOrDefault();
        //    if (check != null)
        //    {
        //        if(check.UserRead==null || check.UserRead == "")
        //        {
        //            check.UserRead = ";";
        //        }
        //        if (!check.UserRead.Contains(currentUs))
        //        {
        //            check.UserRead += currentUs + ";";
        //            db.SaveChanges();
        //        }

        //    }
        //    return Ok();
        //}

        //// DELETE: api/Notifications/5
        //[ResponseType(typeof(Notification))]
        //public IHttpActionResult DeleteNotification(long id)
        //{
        //    Notification notification = db.Notifications.Find(id);
        //    if (notification == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Notifications.Remove(notification);
        //    db.SaveChanges();

        //    return Ok(notification);
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}
        //private void Validate(Notification item)
        //{

        //    if (string.IsNullOrEmpty(item.FName))
        //    {
        //        ModelState.AddModelError("FName", "Nhập tiêu đề");
        //        ModelState.AddModelError("FName", "has-error");
        //    }
        //}
        //private bool NotificationExists(long id)
        //{
        //    return db.Notifications.Count(e => e.Id == id) > 0;
        //}
    }
}