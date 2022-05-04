using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.VariantTypes;
using Newtonsoft.Json;
using Stimulsoft.System.Windows.Forms;
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
    [AllowAnonymous]
    public class CMSController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();
        [HttpGet]
        [Route("api/CMS_News/GetFilesByNews")]
        public IHttpActionResult GetFilesByNews(long newsId)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var listFiles = (from files in db.CMS_News_Files
                             where files.NewsId == newsId && (files.FBranchCode == branchCode || branchCode == null) && files.FLanguage == language
                             orderby files.FCreateTime descending
                             select files).ToList();
            return Ok(listFiles);
        }
        [HttpGet]
        [Route("api/CMS_News/GetFilesByDoc")]
        public IHttpActionResult GetFilesByDoc(string docCode)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var listFiles = (from files in db.CMS_DocumentInfo
                             where files.DocumentCode == docCode && files.FBranchCode == branchCode && files.FLanguage == language
                             orderby files.FCreateTime descending
                             select files).ToList();
            return Ok(listFiles);
        }
        [HttpGet]
        [Route("CMS/GetMenu")]
        public IHttpActionResult GetMenu(string type)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];

            var top = (from menu in db.CMS_Categories
                       where menu.Type == type && menu.FLanguage == language && menu.FBranchCode == branchCode
                       orderby menu.FIndex ascending
                       select menu).FirstOrDefault();
            if (type == "ALL")
            {
                var listMenu = (from menu in db.CMS_Categories
                                where menu.FLanguage == language && menu.FBranchCode == branchCode
                                orderby menu.FIndex ascending
                                select menu).ToList();
                return Ok(listMenu);
            }
            else
            {
                var listMenu = (from menu in db.CMS_Categories
                                where menu.ParentMenu == top.FCode && menu.FLanguage == language && menu.FBranchCode == branchCode
                                orderby menu.FIndex ascending
                                select menu).ToList();

                return Ok(listMenu);
            }

        }

        [HttpGet]
        [Route("CMS/GetBanner")]
        public IHttpActionResult GetBanner()
        {

            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var top = (from banner in db.CMS_Banner
                           where banner.FInUse == true // && banner.FLanguage == language //&& banner.FBranchCode == branchCode
                           select banner).ToList();
                return Ok(top);
            }
            catch (System.Exception ex)
            {
                return Ok(ex);
            }

        }

        [HttpGet]
        [Route("CMS/GetOrg")]
        public IHttpActionResult GetOrg()
        {
            var top = (from org in db.Organizations
                       where org.IsDV == true
                       select org).ToList();
            return Ok(top);
        }

        [HttpGet]
        [Route("CMS/GetLanguage")]
        public IHttpActionResult GetLanguage()
        {
            //string branchCode = HttpContext.Current.Request.Headers["x-company"];
            //string language = HttpContext.Current.Request.Headers["x-language"];
            var listMenu = db.DMNgonNgus.ToList();
            return Ok(listMenu);
        }
        [HttpGet]
        [Route("CMS/GetHotNews")]
        public IHttpActionResult GetHotNews(string menu, int pageNumber, int pageSize)
        {
            //var o = new
            //{
            //    pn = pageNumber,
            //    ps = pageSize,
            //    mn = menu
            //};
            //return Ok(o);
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];

                string language = HttpContext.Current.Request.Headers["x-language"];


                var data = db.CMS_News.Where(news => news.IsHotNews == true && (news.Menu == menu.ToUpper() || menu == "NEW") && news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED")
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

                var total = db.CMS_News.Where(news => news.IsHotNews == true && (news.Menu == menu.ToUpper() || menu == "NEW") && news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED").ToList();
                var respon = new
                {
                    list = data,
                    total = total.Count()
                };
                return Ok(respon);
            }
            catch(Exception ex)
            {
                return Ok(ex);
            }
            
        }
        [HttpGet]
        [Route("CMS/GetNewsByCategory")]
        public IHttpActionResult GetNewsByCategory(string menu, int pageNumber, int pageSize,string searchKey)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];


            var data = db.CMS_News.Where(news => (news.Menu == menu.ToUpper() || menu == "NEW") && news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED"
            && (news.FName.Contains(searchKey)  || news.FCode.Contains(searchKey) || news.SortContent.Contains(searchKey) || news.Content.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                .OrderByDescending(x => x.FCreateTime)
                .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var total = db.CMS_News.Where(news => (news.Menu == menu.ToUpper() || menu == "NEW") && news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED"
            && (news.FName.Contains(searchKey) || news.FCode.Contains(searchKey) || news.SortContent.Contains(searchKey) || news.Content.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).ToList();
            var respon = new
            {
                list = data,
                total = total.Count()
            };
            return Ok(respon);
            //var listNews = (from news in db.CMS_News
            //                where (news.Menu == menu.ToUpper() || menu == "NEW") && news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED"
            //                orderby news.FCreateTime descending
            //                select news).Take(7).ToList();
            //return Ok(listNews);
        }
        [HttpGet]
        [Route("CMS/GetNewsBySearch")]
        public IHttpActionResult GetNewsBySearch( int pageNumber, int pageSize,string searchKey)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];


            var data = db.CMS_News.Where(news => (news.FCode.ToLower().Contains(searchKey) || news.FName.ToLower().Contains(searchKey) 
            || news.FDescription.ToLower().Contains(searchKey) || news.Content.ToLower().Contains(searchKey)
            || news.SortContent.ToLower().Contains(searchKey) || string.IsNullOrEmpty(searchKey)) 
            && news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED")
                .OrderByDescending(x => x.FCreateTime)
                .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var total = db.CMS_News.Where(news => (news.FCode.ToLower().Contains(searchKey) || news.FName.ToLower().Contains(searchKey)
            || news.FDescription.ToLower().Contains(searchKey) || news.Content.ToLower().Contains(searchKey)
            || news.SortContent.ToLower().Contains(searchKey) || string.IsNullOrEmpty(searchKey)) && news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED").ToList();
            var respon = new
            {
                list = data,
                total = total.Count()
            };
            return Ok(respon);
            //var listNews = (from news in db.CMS_News
            //                where (news.Menu == menu.ToUpper() || menu == "NEW") && news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED"
            //                orderby news.FCreateTime descending
            //                select news).Take(7).ToList();
            //return Ok(listNews);
        }
        [HttpGet]
        [Route("CMS/GetNewsByAllCategory")]
        public IHttpActionResult GetNewsByAllCategory()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var listNews = (from news in db.CMS_News
                            where news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED"
                            select news).GroupBy(x => x.Menu).SelectMany(d => d.OrderByDescending(r => r.FCreateTime).Take(5)).ToList();
            return Ok(listNews);
        }
        [HttpGet]
        [Route("CMS/GetNewByCode")]
        public IHttpActionResult GetNewByCode(string menu)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var listNews = db.CMS_News.Where(news => (news.Menu == menu.ToUpper() ) && news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED")
                .OrderByDescending(x => x.FCreateTime).ToList();
            return Ok(listNews);
        }

        [HttpGet]
        [Route("CMS/GetNewsByImportant")]
        public IHttpActionResult GetNewsByImportant()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var listNews = (from news in db.CMS_News
                            where news.IsImportantNews == true && news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED"
                            orderby news.FCreateTime descending
                            select news).Take(7).ToList();
            return Ok(listNews);
        }

        [HttpGet]
        [Route("CMS/GetNewsById")]
        public IHttpActionResult GetNewsById(long Id)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var oNews = (from news in db.CMS_News
                         where news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED" && news.Id == Id
                         select news).FirstOrDefault();

            var listNews = (from news in db.CMS_News
                            where news.Menu == oNews.Menu && news.FLanguage == language && news.FBranchCode == branchCode && news.FStatus == "APPROVED" //&& news.Id != Id
                            && DateTime.Compare((DateTime)news.FCreateTime, (DateTime)oNews.FCreateTime) <= 0
                            select news).OrderByDescending(x => x.FCreateTime).Take(10);
            var result = new
            {
                News = oNews,
                ListOrtherNews = listNews
            };

            return Ok(result);
        }
        [HttpGet]
        [Route("CMS/GetLiveNewsByMenu")]
        public IHttpActionResult GetLiveNewsByMenu(string menu)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FBranchCode == branchCode && x.FLanguage == language && x.Menu == menu && x.IsLiveNews == true).FirstOrDefault();

            return Ok(data);
        }
        [HttpGet]
        [Route("CMS/GetLinks")]
        public IHttpActionResult GetLinks()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var listLinks = (from link in db.CMS_Links
                             where link.FLanguage == language && link.FBranchCode == branchCode && link.FInUse == true
                             orderby link.FCreateTime descending
                             select link).ToList();
            return Ok(listLinks);
        }

        [HttpGet]
        [Route("CMS/Gallery")]
        public IHttpActionResult Gallery()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var listGroupLinks = (from link in db.CMS_GroupLinks
                                  where link.FLanguage == language && link.FBranchCode == branchCode && link.FInUse == true && link.Type == "gallery"
                                  orderby link.FCreateTime descending
                                  select link).ToList();
            return Ok(listGroupLinks);
        }

        [HttpGet]
        [Route("CMS/Video")]
        public IHttpActionResult Video()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var listGroupLinks = (from link in db.CMS_GroupLinks
                                  where link.FLanguage == language && link.FBranchCode == branchCode && link.FInUse == true && link.Type == "video"
                                  orderby link.FCreateTime descending
                                  select link).ToList();
            return Ok(listGroupLinks);
        }

        [HttpGet]
        [Route("CMS/GetVideoById")]
        public IHttpActionResult GetVideoById(long Id)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];

            var GroupLink = (from g in db.CMS_GroupLinks where g.Id == Id select g).FirstOrDefault();

            var listVideos = (from link in db.CMS_Videos
                              where link.FLanguage == language && link.FBranchCode == branchCode && link.FInUse == true && link.GroupLinks == Id
                              orderby link.FCreateTime descending
                              select link).ToList();

            var result = new
            {
                GroupLinks = GroupLink,
                ListVideos = listVideos
            };


            return Ok(result);
        }

        [HttpGet]
        [Route("CMS/GetGalleryById")]
        public IHttpActionResult GetGalleryById(long Id)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var GroupLink = (from g in db.CMS_GroupLinks where g.Id == Id select g).FirstOrDefault();

            var listGalleries = (from link in db.CMS_Gallery
                                 where link.FLanguage == language && link.FBranchCode == branchCode && link.FInUse == true && link.GroupLinks == Id
                                 orderby link.FCreateTime descending
                                 select link).ToList();

            var result = new
            {
                GroupLinks = GroupLink,
                ListGalleries = listGalleries
            };

            return Ok(result);
        }

        [HttpGet]
        [Route("CMS/GetAds")]
        public IHttpActionResult GetAds()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];


            var listAds = (from link in db.CMS_Ads
                           where link.FLanguage == language && link.FBranchCode == branchCode && link.FInUse == true
                           orderby link.FCreateTime descending
                           select link).ToList();

            return Ok(listAds);
        }
        //[HttpGet]
        //[Route("CMS/GetPartner")]
        //public IHttpActionResult GetPartner()
        //{
        //    string branchCode = HttpContext.Current.Request.Headers["x-company"];
        //    string language = HttpContext.Current.Request.Headers["x-language"];


        //    var listAds = (from link in db.CMS_Ads
        //                   where link.FLanguage == language && link.FBranchCode == branchCode && link.FInUse == true
        //                   orderby link.FCreateTime descending
        //                   select link).ToList();

        //    return Ok(listAds);
        //}
        [HttpGet]
        [Route("CMS/GetDocuments")]
        public IHttpActionResult GetDocuments()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];


            var listDocuments = (from doc in db.CMS_Documents
                                 where doc.FLanguage == language && doc.FBranchCode == branchCode && doc.FInUse == true && doc.FStatus == "APPROVED"
                                 orderby doc.FCreateTime descending
                                 select doc).Take(1000).ToList();

            return Ok(listDocuments);
        }

        [HttpGet]
        [Route("CMS/GetDocumentById")]
        public IHttpActionResult GetDocumentById(long Id)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var oDocs = (from doc in db.CMS_Documents
                         where doc.FLanguage == language && doc.FBranchCode == branchCode && doc.FStatus == "APPROVED" && doc.Id == Id
                         select doc).FirstOrDefault();

            var listDocs = (from doc in db.CMS_Documents
                            where doc.FLanguage == language && doc.FBranchCode == branchCode && doc.FStatus == "APPROVED" //&& news.Id != Id
                            && DateTime.Compare((DateTime)doc.FCreateTime, (DateTime)oDocs.FCreateTime) <= 0
                            select doc).OrderByDescending(x => x.FCreateTime).Take(10);
            var result = new
            {
                Docs = oDocs,
                ListOrtherDocs = listDocs
            };

            return Ok(result);
        }

        [HttpPost]
        [Route("api/CMS_QA")]
        public IHttpActionResult CMS_QA(CMS_News objNews)
        {
            try
            {
                if (string.IsNullOrEmpty(objNews.FName))
                {
                    ModelState.AddModelError("FName", "Nhập tiêu đề !");
                    ModelState.AddModelError("FName", "has-error");
                }
                //if (string.IsNullOrEmpty(objNews.NguoiGui))
                //{
                //    ModelState.AddModelError("NguoiGui", "Nhập tên người gửi !");
                //    ModelState.AddModelError("NguoiGui", "has-error");
                //}
                if (string.IsNullOrEmpty(objNews.FDescription))
                {
                    ModelState.AddModelError("FDescription", "Nhập nội dung câu hỏi !");
                    ModelState.AddModelError("FDescription", "has-error");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                CMS_News oNews = objNews;
                if (oNews.Id == 0)
                {
                    oNews.FCode = "NEWS_" + DateTime.Now.Ticks;
                    oNews.FCreateTime = DateTime.Now;
                    oNews.FUpdateTime = DateTime.Now;
                    oNews.FUserCreate = RequestContext.Principal.Identity.Name;
                    oNews.FLanguage = language;
                    oNews.FBranchCode = branchCode;
                    if (oNews.IsLiveNews == true)
                    {
                        var newsByMenu = db.CMS_News.Where(x => x.FBranchCode == branchCode && x.FLanguage == language && x.IsLiveNews == true && x.Menu == oNews.Menu).ToList();
                        foreach (var item in newsByMenu)
                        {
                            item.IsLiveNews = false;
                            db.Entry(item).State = EntityState.Modified;
                            db.SaveChanges();
                        }
                    }
                    db.CMS_News.Add(oNews);
                }
                else
                {
                    //oNews.FCreateTime = DateTime.Now;
                    oNews.FUpdateTime = DateTime.Now;
                    db.Entry(oNews).State = EntityState.Modified;
                    if (oNews.IsLiveNews == true)
                    {
                        var newsByMenu = db.CMS_News.Where(x => x.FBranchCode == branchCode && x.FLanguage == language && x.IsLiveNews == true && x.Menu == oNews.Menu).ToList();
                        foreach (var item in newsByMenu)
                        {
                            item.IsLiveNews = false;
                            db.Entry(item).State = EntityState.Modified;
                            db.SaveChanges();
                        }
                    }
                }
                db.SaveChanges();
                return Ok();

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
        [Route("api/CMS_News/GetIntro")]
        public IHttpActionResult GetIntro()
        {
            //string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FLanguage == language
                                              && x.FInUse == true
                                              && (x.Menu == Commons.Constants.REGULATION
                                                 || x.Menu == Commons.Constants.POLICY
                                                 || x.Menu == Commons.Constants.PROGRAMME_EXPODAY
                                                 || x.Menu == Commons.Constants.INTRO_RACKIT
                                                 || x.Menu == Commons.Constants.START_50K
                                                 || x.Menu == Commons.Constants.START_25K
                                                 || x.Menu == Commons.Constants.START_15K
                                                 || x.Menu == Commons.Constants.CLOSINGCEREMONY_AWARDSCEREMONY
                                                 || x.Menu == Commons.Constants.WELCOME_CULTURAL_EVENTS
                                                 || x.Menu == Commons.Constants.INTRODUCING_THESTALLS
                                                  )).ToList();
            return Ok(data);
        }
        [HttpGet]
        [Route("api/CMS_News/GetAchilesInfo")]
        public IHttpActionResult GetAchilesInfo()
        {
            //string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_News.Where(x => x.FLanguage == language && x.FInUse == true && (x.Menu == Commons.Constants.MOVE || x.Menu == Commons.Constants.HOME || x.Menu == Commons.Constants.ITEM)).ToList();
            return Ok(data);
        }

        [HttpGet]
        [Route("api/CMS_RaceKit/GetRaceKitList")]
        public IHttpActionResult GetRaceKitList()
        {
            //string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_RaceKit.Where(x => x.FLanguage == language && x.FInUse == true).ToList();
            return Ok(data);
        }

        [HttpGet]
        [Route("api/SponsorsAndPartner/GetSponsorsList")]
        public IHttpActionResult GetSponsorsList()
        {
            //string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_Sponsors.Where(x => /*x.FLanguage == language &&*/ x.FInUse == true).ToList();
            return Ok(data);
        }
    }
}