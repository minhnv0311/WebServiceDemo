using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
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
    public class CMS_NewsController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();
        [HttpPost]
        [Route("api/CMS_News")]
        public IHttpActionResult CMS_News(NewsContent objNews)
        {
            try
            {
                Validate(objNews.News);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];
                CMS_News oNews = objNews.News;
                var Tag = db.TAGS.Where(x => x.FCode == oNews.MainTag).FirstOrDefault();
                if (oNews.IsLiveNews != true)
                {
                    oNews.MainTag = Tag.FName;
                    oNews.UrlTag = Tag.Url;
                }
                if (oNews.Id == 0)
                {
                    oNews.FCode = "NEWS_" + DateTime.Now.Ticks;
                    if(oNews.FCreateTime == null) oNews.FCreateTime = DateTime.Now;
                    oNews.FUpdateTime = DateTime.Now;
                    oNews.FUserCreate = RequestContext.Principal.Identity.Name;
                    oNews.FLanguage = language;
                    oNews.FBranchCode = branchCode;
                    oNews.FInUse = true;
                    oNews.FIndex = 0;
                    if (oNews.IsLiveNews == true)
                    {
                        var newsByMenu = db.CMS_News.Where(x => x.FBranchCode == branchCode && x.FLanguage == language && x.IsLiveNews == true && x.Menu == oNews.Menu).ToList();
                        foreach (var item in newsByMenu)
                        {
                            db.Entry(item).State = EntityState.Modified;
                            db.SaveChanges();
                        }
                    }
                    else oNews.IsLiveNews = false;
                    db.CMS_News.Add(oNews);
                }
                else
                {
                    //oNews.FCreateTime = DateTime.Now;
                    if (oNews.FCreateTime == null) oNews.FCreateTime = DateTime.Now;
                    oNews.FUpdateTime = DateTime.Now;
                    db.Entry(oNews).State = EntityState.Modified;
                    if (oNews.IsLiveNews == true)
                    {
                        var newsByMenu = db.CMS_News.Where(x => x.FBranchCode == branchCode && x.FLanguage == language && x.IsLiveNews == true && x.Menu == oNews.Menu).ToList();
                        foreach (var item in newsByMenu)
                        {
                            db.Entry(item).State = EntityState.Modified;
                            db.SaveChanges();
                        }
                    }
                    else oNews.IsLiveNews = false;
                }
                db.SaveChanges();

                if (objNews.Files.Count > 0)
                {
                    foreach (CMS_News_Files file in objNews.Files)
                    {
                        if (file.Id == 0)
                        {
                            file.FCode = "NEWSFILES_" + DateTime.Now.Ticks;
                            file.NewsId = oNews.Id;
                            file.FBranchCode = branchCode;
                            file.FLanguage = language;
                            file.FCreateTime = DateTime.Now;
                            file.FUserCreate = RequestContext.Principal.Identity.Name;
                            file.FInUse = true;
                            db.CMS_News_Files.Add(file);
                        }
                        else
                        {
                            db.Entry(file).State = EntityState.Modified;
                        }
                    }
                }
                db.SaveChanges();
                return Ok(oNews.FCode);

            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                        ModelState.AddModelError(ve.PropertyName, ve.ErrorMessage);

                    }
                }
                return BadRequest(ModelState);
            }
        }

    
        [HttpGet]
        [Route("api/CMS_News/GetById")]
        public IHttpActionResult CMS_NewsByMenu(long id)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
      
            var data = db.CMS_News.Where(x => x.Id == id).FirstOrDefault();
            string tags = "[";
            var dt = db.Group_Tags.Where(t => t.CodeNews == data.FCode && t.FInUse == true).ToList();
            var i = 1;
            foreach (var item in dt)
            {
                    if (i < dt.Count())
                        tags += "\"" + item.CodeTag + "\"" + ",";
                    if (i == dt.Count())
                        tags += "\"" + item.CodeTag + "\"" + "]";
                    i++;

            }
            data.Tags = tags;
            return Ok(data);
        }
        [HttpPost]
        [Route("api/CMS_News/DeleteFile")]
        public IHttpActionResult DeleteFile(long fileId)
        {
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var data = db.CMS_News_Files.Where(x => x.Id == fileId).FirstOrDefault();
                if (data != null)
                {
                    db.CMS_News_Files.Remove(data);
                    db.SaveChanges();
                    return Ok("SUCCESS");
                }
                return Ok("FAILED");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.ToString());
            }
          
        }
        [HttpGet]
        [Route("api/CMS_News/GetTags")]
        public IHttpActionResult GetTags()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.TAGS.Where(x => x.FLanguage == language).ToList();
            return Ok(data);
        }
        [HttpGet]
        [Route("api/CMS_News/GetCategories")]
        public IHttpActionResult GetCategories()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_Categories.Where(x => x.FLanguage == language).ToList();
            return Ok(data);
        }
        [HttpPost]
        [Route("api/CMS_News/SaveGroupTags")]
        [ResponseType(typeof(object))]
        public void SaveGroupByUser(string CodeTags, string news)
        {
            var model = JsonConvert.DeserializeObject<List<string>>(CodeTags);
            var ListGroup = ";";
            var DelGroup = db.Group_Tags.Where(t => t.CodeNews == news).ToList();
            foreach (var i in DelGroup)
            {
                if (!ListGroup.Contains(i.CodeTag))
                {
                    i.FInUse = false;
                    db.SaveChanges();
                }
            }
            foreach (var item in model)
            {
                if (item != "")
                {
                    var dt = db.Group_Tags.Where(t => t.CodeNews == news && t.CodeTag == item).FirstOrDefault();
                    if (dt != null)
                    {
                        dt.FInUse = true;
                        db.SaveChanges();
                    }
                    else
                    {
                        dt = new Group_Tags();
                        dt.FCode = Guid.NewGuid().ToString();
                        dt.CodeNews = news;
                        dt.CodeTag = item;
                        dt.FInUse = true;
                        db.Group_Tags.Add(dt);
                        db.SaveChanges();
                    }
                    ListGroup += item + ";";
                }

            }
        }
        [HttpGet]
        [Route("api/CMS_News/GetByMenu")]
        public IHttpActionResult CMS_NewsByMenu(string menu, int pageNumber,int pageSize, string searchKey)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            //var listNews = (from news in db.CMS_News where news.Menu == menu && news.FBranchCode == branchCode && news.FLanguage == language 
            //                orderby news.FCreateTime descending
            //                select news).ToList();
            //return Ok(listNews);
            var data = db.CMS_News.Where(x => x.FBranchCode == branchCode && x.FLanguage == language
                && (x.Menu == menu || x.Tags.Contains(menu)) && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var total = db.CMS_News.Where(x =>  x.FBranchCode == branchCode && x.FLanguage == language
             && (x.Menu == menu || x.Tags.Contains(menu)) && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).ToList();
            var respon = new
            {
                list = data,
                total = total.Count()
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("api/CMS_News/GetNews")]
        public IHttpActionResult GetNews(int pageNumber, int pageSize, string searchKey)
        {
            //string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            //var listNews = (from news in db.CMS_News where news.Menu == menu && news.FBranchCode == branchCode && news.FLanguage == language 
            //                orderby news.FCreateTime descending
            //                select news).ToList();
            //return Ok(listNews);
            var data = db.CMS_News.Where(x => x.FInUse == true && x.FLanguage == language
                 && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var total = db.CMS_News.Where(x => x.FInUse == true && x.FLanguage == language
              && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).ToList();
            var respon = new
            {
                list = data,
                total = total.Count()
            };
            return Ok(respon);
        }


        [HttpGet]
        [Route("api/CMS_News/GetByStatus")]
        public IHttpActionResult GetByStatus(string status, int pageNumber, int pageSize,string searchKey)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            //var listNews = (from news in db.CMS_News
            //                where news.FStatus == status && news.FBranchCode == branchCode && news.FLanguage == language
            //                orderby news.FCreateTime descending
            //                select news).ToList();
            var data = db.CMS_News.Where(x => x.FBranchCode == branchCode && x.FLanguage == language
              && x.FStatus == status && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                  .OrderByDescending(x => x.FCreateTime)
                  .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var total = db.CMS_News.Where(x => x.FBranchCode == branchCode && x.FLanguage == language
             && x.FStatus == status && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).ToList();
            var respon = new
            {
                list = data,
                total = total.Count()
            };
            return Ok(respon);
            //return Ok(listNews);
        }

      

        [HttpGet]
        [Route("api/CMS_News/GetAllNews")]
        public IHttpActionResult GetAllNews()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FBranchCode == branchCode && x.FLanguage == language)
                  .OrderByDescending(x => x.FCreateTime)
                  .ToList();
            return Ok(data);
        }

        [HttpPost]
        [Route("api/CMS_News/Delete")]
        public IHttpActionResult DeleteNew(CMS_News file)
        {
            try
            {
                string branchCode = Request.Headers.GetValues("x-company").FirstOrDefault();
                string language = Request.Headers.GetValues("x-language").FirstOrDefault();

                var obj = db.CMS_News.Where(x =>  x.Id == file.Id).FirstOrDefault();
                if (obj != null)
                {
                    db.CMS_News.Remove(obj);
                    db.SaveChanges();
                    return Ok("SUCCESS");
                }
                return Ok("FAILED");
                //return Ok(obj);



            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                        ModelState.AddModelError(ve.PropertyName, ve.ErrorMessage);

                    }
                }
                return BadRequest(ModelState);
            }


        }
        private void Validate(CMS_News item)
        {
            //if (string.IsNullOrEmpty(item.FCode))
            //{
            //    ModelState.AddModelError("code", "Bắt buộc nhập dữ liệu");
            //    ModelState.AddModelError("code", "has-error");
            //}
            if (string.IsNullOrEmpty(item.FName))
            {
                ModelState.AddModelError("FName", "Nhập tiêu đề bài viết!");
                ModelState.AddModelError("FName", "has-error");
            }
            if (string.IsNullOrEmpty(item.Tags) && item.IsLiveNews != true)
            {
                ModelState.AddModelError("Tags", "Không được để trống trường này!");
                ModelState.AddModelError("Tags", "has-error");
            }
            if (string.IsNullOrEmpty(item.Menu))
            {
                ModelState.AddModelError("Menu", "Không được để trống trường này!");
                ModelState.AddModelError("Menu", "has-error");
            }
            //var isQA = db.CMS_Categories.Where(x => x.FCode == item.Menu).FirstOrDefault();
            //if(isQA!= null)
            //{
            //    if(isQA.IsQA != true)
            //    {
            //        if (string.IsNullOrEmpty(item.Image))
            //        {
            //            ModelState.AddModelError("Image", "Chọn ảnh hiển thị bài viết!");
            //            ModelState.AddModelError("Image", "has-error");
            //        }
            //    }
            //}
          
            if (string.IsNullOrEmpty(item.FStatus))
            {
                ModelState.AddModelError("FStatus", "Chọn trạng thái bài viết!");
                ModelState.AddModelError("FStatus", "has-error");
            }
        }
    }
 
    public class NewsContent
    {
        public CMS_News News;
        public List<CMS_News_Files> Files;
    }
}