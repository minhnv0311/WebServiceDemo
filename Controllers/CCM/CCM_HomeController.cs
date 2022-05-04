using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApiCore.Models;

namespace WebApiCore.Controllers
{
    [RoutePrefix("api/CCM_Home")]
    public class CCM_HomeController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();

        // GET: api/Groups
        [HttpGet]
        [Route("GetTopNews")]
        public IHttpActionResult GetTopNews(string searchKey)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FInUse == true && x.IsTopNews == true && x.FLanguage == language
                 && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((1 - 1) * 5).Take(5).ToList();
            var data2 = db.CMS_News.Where(x => x.FInUse == true && x.IsTopNews == true && x.FLanguage == language
                && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                   .OrderByDescending(x => x.FCreateTime)
                   .Skip((2 - 1) * 5).Take(5).ToList();
            var respon = new
            {
                list = data,
                list2 = data2
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetTags")]
        public IHttpActionResult GetTags(string code)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var gt = db.Group_Tags.Where(x => x.CodeNews == code && x.FInUse == true).Select(y => y.CodeTag).ToList();
            var data = new List<TAG>();
            foreach(var d in gt)
            {
                var tag = db.TAGS.Where(x => x.FLanguage == language && x.FCode == d).FirstOrDefault();
                data.Add(tag);
            }
            
            var respon = new
            {
                list = data
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetListTags")]
        public IHttpActionResult GetListTags()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.TAGS.Where(x => x.FLanguage == language).ToList();
            var respon = new
            {
                list = data
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetAllNews")]
        public IHttpActionResult GetAllNews(string searchKey)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            string news = "";
            if (language == "vi-VN") news = "tin-tuc-su-kien";
            else news = "news";
            var data = db.CMS_News.Where(x => x.FInUse == true && x.FLanguage == language && x.IsLiveNews != true && x.Menu == news
                 && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((1 - 1) * 10).Take(10).ToList();
            var respon = new
            {
                list = data
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetCDTD")]
        public IHttpActionResult GetCDTD()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            string Url = "";
            var data = db.CMS_News.Where(x => x.FInUse == true && x.FLanguage == language && (x.Tags.Contains("chinh-sach-doi-ngoai") || x.Tags.Contains("foreign-policy")))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((1 - 1) * 3).Take(3).ToList();
            if (language == "vi-VN") Url = "category/van-ban--chinh-sach/chinh-sach-doi-ngoai";
            else Url = "category/meeting-minutes/foreign-policy";
            var respon = new
            {
                list = data,
                url = Url
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetNewsNCQG")]
        public IHttpActionResult GetNewsNCQG()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FInUse == true && x.FLanguage == language && (x.Tags.Contains("chu-quyen-lanh-tho") || x.Tags.Contains("territorial-sovereignty")))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((1 - 1) * 5).Take(5).ToList();
            var respon = new
            {
                list = data
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetNewsBienBan")]
        public IHttpActionResult GetNewsBienBan()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FInUse == true && x.FLanguage == language && (x.Tags.Contains("van-ban-phap-quy") || x.Tags.Contains("legal-documents")))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((1 - 1) * 5).Take(5).ToList();
            var respon = new
            {
                list = data
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetNewsTieuBan")]
        public IHttpActionResult GetNewsTieuBan()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FInUse == true && x.FLanguage == language && (x.Tags.Contains("thong-tin-kt-xh") || x.Tags.Contains("economy-society")))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((1 - 1) * 5).Take(5).ToList();
            var respon = new
            {
                list = data
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetNewsThongBao")]
        public IHttpActionResult GetNewsThongBao()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FInUse == true && x.IsImportantNews == true && x.FLanguage == language)
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((1 - 1) * 5).Take(5).ToList();
            var respon = new
            {
                list = data
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetLinks")]
        public IHttpActionResult GetLinks()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_Links.Where(x => x.FInUse == true).OrderBy(y => y.FIndex).ToList();
            var respon = new
            {
                list = data,
                max = data.Max(x => x.FIndex)
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetList10BienBan")]
        public IHttpActionResult GetListBienBan(int pageNumber, int pageSize, string searchKey, string TAG)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FInUse == true && (x.Menu == TAG || x.Tags.Contains(TAG)) && x.FLanguage == language
                 && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var count = db.CMS_News.Where(x => x.FInUse == true && (x.Menu == TAG || x.Tags.Contains(TAG)) && x.FLanguage == language
                 && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).Count();
            var total = 0;
            if (count > 0) total = (count % pageSize == 0) ? count / pageSize : (count / pageSize + 1);
            var respon = new
            {
                list = data,
                total = total
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetHotNews")]
        public IHttpActionResult GetHotNews()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FInUse == true && x.IsHotNews == true && x.FLanguage == language)
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((1 - 1) * 10).Take(10).ToList();
            var respon = new
            {
                list = data
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("ViewNews")]
        public IHttpActionResult ViewNews(int Id)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.Id == Id).FirstOrDefault();
            return Ok(data);
        }
        [HttpGet]
        [Route("SearchNews")]
        public IHttpActionResult SearchNews(int pageNumber, int pageSize, string searchKey)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FInUse == true && x.FLanguage == language
                 && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var count = db.CMS_News.Where(x => x.FInUse == true && x.FLanguage == language
                 && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).Count();
            var total = 0;
            if (count > 0) total = (count % pageSize == 0) ? count / pageSize : (count / pageSize + 1);
            var respon = new
            {
                list = data,
                total = total
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetBanner")]
        public IHttpActionResult GetBanner()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var respon = new
            {
                list = db.CMS_Banner.Where(x => x.FInUse == true).OrderByDescending(y => y.FCreateTime).ToList()
        };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetMenuBar")]
        public IHttpActionResult GetMenuBar()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var respon = new
            {
                list = db.CMS_Categories.Where(x => x.FInUse == true && x.FLanguage == language).OrderBy(y => y.FLevel).ThenBy(c => c.FIndex).ToList()
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetNameMenu")]
        public IHttpActionResult GetNameMenu(string Url)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            return Ok(db.CMS_Categories.Where(x => x.Url == Url).FirstOrDefault());
        }
        [HttpGet]
        [Route("GetNameParentMenu")]
        public IHttpActionResult GetNameParentMenu(string FCode)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            return Ok(db.CMS_Categories.Where(x => x.FCode == FCode).FirstOrDefault());
        }
        [HttpGet]
        [Route("GetParentTag")]
        public IHttpActionResult GetParentTag(string Url)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var m = db.CMS_Categories.Where(a => a.FCode == db.TAGS.Where(x => x.Url == Url).FirstOrDefault().FCode).FirstOrDefault();
            return Ok(db.CMS_Categories.Where(a => a.FCode == m.ParentMenu).FirstOrDefault());
        }
        [HttpGet]
        [Route("GetPage")]
        public IHttpActionResult GetPage()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            return Ok(db.CMS_Categories.Where(x => x.FLanguage == language).ToList());
        }
        [HttpGet]
        [Route("GetPageByCode")]
        public IHttpActionResult GetPageByCode(string code)
        {
            return Ok(db.CMS_Categories.Where(x => x.FCode == code).FirstOrDefault());
        }
        [HttpGet]
        [Route("GetPageContent")]
        public IHttpActionResult GetPageContent(string code)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            return Ok(db.CMS_News.Where(x => x.FInUse == true && x.Menu == code).OrderByDescending(y => y.FCreateTime).FirstOrDefault());
        }
        [HttpGet]
        [Route("GetNextPrevNews")]
        public IHttpActionResult GetNextPrevNews(long newsId, string menu)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var nextNews = db.CMS_News.Where(x => x.FInUse == true && x.Menu == menu && x.Id > newsId).OrderBy(y => y.Id).FirstOrDefault();
            if(nextNews == null) nextNews = db.CMS_News.Where(x => x.FInUse == true && x.Menu == menu && x.Id != newsId).OrderBy(y => y.Id).FirstOrDefault();
            var prevNews = db.CMS_News.Where(x => x.FInUse == true && x.Menu == menu && x.Id < newsId).OrderByDescending(y => y.Id).FirstOrDefault();
            if(prevNews == null) prevNews = db.CMS_News.Where(x => x.FInUse == true && x.Menu == menu && x.Id != newsId).OrderByDescending(y => y.Id).FirstOrDefault();
            if (nextNews != null)
            {
                if (nextNews.Id == prevNews.Id)
                {
                    if (nextNews.Id > newsId) prevNews = null;
                    else nextNews = null;
                }
            }
            var respon = new
            {
                NextNews = nextNews,
                PrevNews = prevNews
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("GetVideoIntro")]
        public IHttpActionResult GetVideoIntro()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            return Ok(db.CMS_Videos.Where(x => x.FInUse == true && x.GroupLinks == 12).OrderByDescending(y => y.FCreateTime).FirstOrDefault());
        }
        [HttpGet]
        [Route("GetStorage")]
        public IHttpActionResult GetStorage()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.GetStorage(language).OrderBy(y => y.yyyy).ThenBy(z => z.MM).ToList();
            var result = new List<GetStorage_Result>();
            if (language == "vi-VN")
            {
                for (var i = 0; i < data.Count; i++)
                {
                    var month = "";
                    if (data[i].MM == "01") month = "Tháng Một ";
                    if (data[i].MM == "02") month = "Tháng Hai ";
                    if (data[i].MM == "03") month = "Tháng Ba ";
                    if (data[i].MM == "04") month = "Tháng Tư ";
                    if (data[i].MM == "05") month = "Tháng Năm ";
                    if (data[i].MM == "06") month = "Tháng Sáu ";
                    if (data[i].MM == "07") month = "Tháng Bảy ";
                    if (data[i].MM == "08") month = "Tháng Tám ";
                    if (data[i].MM == "09") month = "Tháng Chín ";
                    if (data[i].MM == "10") month = "Tháng Mười ";
                    if (data[i].MM == "11") month = "Tháng Mười Một ";
                    if (data[i].MM == "12") month = "Tháng Mười Hai ";
                    result.Add(new GetStorage_Result
                    {
                        MMMM = month,
                        MM = data[i].MM,
                        yyyy = data[i].yyyy
                    });
                };
            }
            else result = data;
            return Ok(result);
        }
        [HttpGet]
        [Route("GetList10Categories")]
        public IHttpActionResult GetList10Categories(int pageNumber, int pageSize, string searchKey, string month, string year)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            //DateTime? start = DateTime.Parse(month == null ? "01/01/" + year : "01/" + month + "/" + year);
            //string newyear = year;
            //if (month == "12" || month == null)
            //{
            //    newyear = (Int32.Parse(year) + 1).ToString();
            //}
            //DateTime? end = DateTime.Parse(month == null ? "01/01/" + newyear : "01" + "/" + (Int32.Parse(month) + 1).ToString() + "/" + newyear);
            DateTime? start = DateTime.Parse(month == null ? "01/01/" + year : month + "/01/" + year);
            string newyear = year;
            if (month == "12" || month == null)
            {
                newyear = (Int32.Parse(year) + 1).ToString();
            }
            DateTime? end = DateTime.Parse(month == null ? "01/01/" + newyear : (Int32.Parse(month) + 1).ToString() + "/01" + "/" + newyear);
            var data = db.CMS_News.Where(x => x.FInUse == true && x.FCreateTime >= start && x.FCreateTime <= end && x.FLanguage == language
                 && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var count = db.CMS_News.Where(x => x.FInUse == true && x.FCreateTime >= start && x.FCreateTime <= end && x.FLanguage == language
                 && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).Count();
            var total = 0;
            if (count > 0) total = (count % pageSize == 0) ? count / pageSize : (count / pageSize + 1);
            var respon = new
            {
                list = data,
                total = total
            };
            return Ok(respon);
        }
        [HttpPost]
        [Route("PostComment")]
        public IHttpActionResult PostComment(string Name, string Email, string WebSite, string Comment, long NewsId)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            try
            {
                var comment = new CMS_News_Comments()
                {
                    FCode = "COMMENT_" + DateTime.Now.Ticks,
                    Name = Name,
                    Email = Email,
                    Website = WebSite,
                    FComment = Comment,
                    FCreateTime = DateTime.Now,
                    FLanguage = language,
                    NewsId = NewsId,
                    IsShow = false,
                    FInUse = true
                };
                db.CMS_News_Comments.Add(comment);
                var news = db.CMS_News.Where(x => x.Id == NewsId).FirstOrDefault();
                news.FIndex += 1;
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
        }
        [HttpGet]
        [Route("GetComments")]
        public IHttpActionResult GetComments(long NewsId)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            return Ok(db.CMS_News_Comments.Where(x => x.FInUse == true && x.NewsId == NewsId && x.IsShow == true).OrderByDescending(y => y.FCreateTime).Take(5).ToList());
        }
        [HttpGet]
        [Route("GetCommentById")]
        public IHttpActionResult GetCommentById(long Id)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var comment = db.CMS_News_Comments.Where(x => x.FInUse == true && x.Id == Id).FirstOrDefault();
            var result = new
            {
                Comment = comment,
                News = db.CMS_News.Where(x => x.FInUse == true && x.Id == comment.NewsId).FirstOrDefault()
            };
            return Ok(result);
        }
        [HttpGet]
        [Route("GetProcComments")]
        public IHttpActionResult GetProcComments(bool IsShow, string Status, int pageNumber, int pageSize, string searchKey)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var comments = db.Get_Comments(Status, searchKey, language, IsShow).OrderByDescending(x => x.FCreateTime).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var total = comments.Count();
            var result = new
            {
                list = comments,
                total = total
            };
            return Ok(result);
        }
        [HttpPost]
        [Route("ApproveComment")]
        public IHttpActionResult ApproveComment(CMS_News_Comments Comment)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            try
            {
                Comment.FUpdateTime = DateTime.Now;
                Comment.FStatus = "APPROVED";
                db.Entry(Comment).State = EntityState.Modified;
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
        }
        [HttpDelete]
        [Route("DeleteComment")]
        public IHttpActionResult DeleteComment(long Id)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var obj = db.CMS_News_Comments.Where(x => x.Id == Id).FirstOrDefault();
            if (obj != null)
            {
                db.CMS_News_Comments.Remove(obj);
                db.SaveChanges();
                return Ok("SUCCESS");
            }
            return Ok("FAILED");
        }
        [HttpGet]
        [Route("GetAlbum")]
        public IHttpActionResult GetAlbum(long Id)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            try
            {
                var data = db.CMS_GroupLinks.Where(x => x.Id == Id).FirstOrDefault();
                return Ok(data);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
        }
        [HttpPost]
        [Route("Contact")]
        public IHttpActionResult Contact(Contact c)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            try
            {
                var contact = new CMS_Contact()
                {
                    FCode = "CONTACT_" + DateTime.Now.Ticks,
                    FName = c.Name,
                    Email = c.Email,
                    Title = c.Address,
                    Content = c.Comment,
                    FCreateTime = DateTime.Now,
                    FLanguage = language,
                    PhoneNumber = c.PhoneNumber,
                    FIndex = 0,
                    FInUse = true
                };
                db.CMS_Contact.Add(contact);
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.ToString());
            }
        }
    }
    public class Comments
    {
        public string Name;
        public string Email;
        public string WebSite;
        public string Comment;
        public long NewsId;
    }
    public class Contact
    {
        public string Name;
        public string Email;
        public string PhoneNumber;
        public string Comment;
        public string Address;
    }
}
