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
    public class CMS_FAQController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();
        [HttpPost]
        [Route("api/CMS_FAQ")]
        public IHttpActionResult CMS_FAQ(FAQContent objFAQ)
        {
            try
            {
                Validate(objFAQ.FAQ);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                CMS_FAQ oFAQ = objFAQ.FAQ;
                if (oFAQ.Id == 0)
                {
                    oFAQ.FCode = "FAQ_" + DateTime.Now.Ticks;
                    oFAQ.FCreateTime = DateTime.Now;
                    oFAQ.FUpdateTime = DateTime.Now;
                    oFAQ.FUserCreate = RequestContext.Principal.Identity.Name;
                    oFAQ.FLanguage = language;
                    oFAQ.FBranchCode = branchCode;
                    oFAQ.FInUse = true;
                    db.CMS_FAQ.Add(oFAQ);
                }
                else
                {
                    //oFAQ.FCreateTime = DateTime.Now;
                    oFAQ.FUpdateTime = DateTime.Now;
                    db.Entry(oFAQ).State = EntityState.Modified;
                }
                db.SaveChanges();

                if (objFAQ.Files.Count > 0)
                {
                    foreach (CMS_News_Files file in objFAQ.Files)
                    {
                        if (file.Id == 0)
                        {
                            file.FCode = "FAQFILES_" + DateTime.Now.Ticks;
                            file.FAQId = oFAQ.Id;
                            file.FBranchCode = branchCode;
                            file.FLanguage = language;
                            file.FCreateTime = DateTime.Now;
                            file.FUserCreate = RequestContext.Principal.Identity.Name;
                            db.CMS_News_Files.Add(file);
                        }
                        else
                        {
                            db.Entry(file).State = EntityState.Modified;
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
        [Route("api/CMS_FAQ/GetById")]
        public IHttpActionResult CMS_FAQByMenu(long id)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];

            var data = db.CMS_FAQ.Where(x => x.Id == id).FirstOrDefault();
            return Ok(data);
        }
        [HttpPost]
        [Route("api/CMS_FAQ/DeleteFile")]
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
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }

        }
        [HttpGet]
        [Route("api/CMS_FAQ/GetByMenu")]
        public IHttpActionResult CMS_FAQByMenu(string menu, int pageNumber, int pageSize, string searchKey)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            //var listFAQ = (from FAQ in db.CMS_FAQ where FAQ.Menu == menu && FAQ.FBranchCode == branchCode && FAQ.FLanguage == language 
            //                orderby FAQ.FCreateTime descending
            //                select FAQ).ToList();
            //return Ok(listFAQ);
            var data = db.CMS_FAQ.Where(x => x.FBranchCode == branchCode && x.FLanguage == language
                && x.Menu == menu && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var total = db.CMS_FAQ.Where(x => x.FBranchCode == branchCode && x.FLanguage == language
             && x.Menu == menu && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).ToList();
            var respon = new
            {
                list = data,
                total = total.Count()
            };
            return Ok(respon);
        }
        [HttpGet]
        [Route("api/CMS_FAQ/GetFAQ")]
        public IHttpActionResult GetFAQ(int pageNumber, int pageSize, string searchKey)
        {
            //string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            //var listFAQ = (from FAQ in db.CMS_FAQ where FAQ.Menu == menu && FAQ.FBranchCode == branchCode && FAQ.FLanguage == language 
            //                orderby FAQ.FCreateTime descending
            //                select FAQ).ToList();
            //return Ok(listFAQ);
            var data = db.CMS_FAQ.Where(x => x.FInUse == true && x.FLanguage == language
                 && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var total = db.CMS_FAQ.Where(x => x.FInUse == true && x.FLanguage == language
              && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).ToList();
            var respon = new
            {
                list = data,
                total = total.Count()
            };
            return Ok(respon);
        }


        [HttpGet]
        [Route("api/CMS_FAQ/GetByStatus")]
        public IHttpActionResult GetByStatus(string status, int pageNumber, int pageSize, string searchKey)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            //var listFAQ = (from FAQ in db.CMS_FAQ
            //                where FAQ.FStatus == status && FAQ.FBranchCode == branchCode && FAQ.FLanguage == language
            //                orderby FAQ.FCreateTime descending
            //                select FAQ).ToList();
            var data = db.CMS_FAQ.Where(x => x.FBranchCode == branchCode && x.FLanguage == language
              && x.FStatus == status && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                  .OrderByDescending(x => x.FCreateTime)
                  .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var total = db.CMS_FAQ.Where(x => x.FBranchCode == branchCode && x.FLanguage == language
             && x.FStatus == status && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || x.Content.Contains(searchKey) || x.SortContent.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).ToList();
            var respon = new
            {
                list = data,
                total = total.Count()
            };
            return Ok(respon);
        }



        [HttpGet]
        [Route("api/CMS_FAQ/GetAllFAQ")]
        public IHttpActionResult GetAllFAQ()
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_FAQ.Where(x => x.FBranchCode == branchCode && x.FLanguage == language)
                  .OrderByDescending(x => x.FCreateTime)
                  .ToList();
            return Ok(data);
        }

        [HttpPost]
        [Route("api/CMS_FAQ/Delete")]
        public IHttpActionResult DeleteNew(CMS_FAQ file)
        {
            try
            {
                string branchCode = Request.Headers.GetValues("x-company").FirstOrDefault();
                string language = Request.Headers.GetValues("x-language").FirstOrDefault();

                var obj = db.CMS_FAQ.Where(x => x.FBranchCode == branchCode && x.FLanguage == language && x.Id == file.Id).FirstOrDefault();
                if (obj != null)
                {
                    db.CMS_FAQ.Remove(obj);
                    db.SaveChanges();
                    return Ok("SUCCESS");
                }
                return Ok("FAILED");
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
        private void Validate(CMS_FAQ item)
        {
            if (string.IsNullOrEmpty(item.FName))
            {
                ModelState.AddModelError("FName", "Nhập câu hỏi!");
                ModelState.AddModelError("FName", "has-error");
            }
            if (item.FIndex == null)
            {
                ModelState.AddModelError("FIndex", "Nhập thứ tự hiển thị!");
                ModelState.AddModelError("FIndex", "has-error");
            }
        }
    }

    public class FAQContent
    {
        public CMS_FAQ FAQ;
        public List<CMS_News_Files> Files;
    }
}