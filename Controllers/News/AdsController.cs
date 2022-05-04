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

namespace WebApiCore.Controllers.News
{
    [Authorize]
    public class AdsController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();
        [HttpPost]
        [Route("api/CMS_Ads")]
        public IHttpActionResult CMS_Ads(CMS_Ads oNews)
        {
            try
            {
                Validate(oNews);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                

                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                if (oNews.Id == 0)
                {

                    if (string.IsNullOrEmpty(oNews.FCode))
                        oNews.FCode = "ADS_" + DateTime.Now.Ticks;
                    if (oNews.IsShowWithCategory == null)
                        oNews.IsShowWithCategory = false;
                    oNews.FCreateTime = DateTime.Now;
                    oNews.FInUse = true;
                    oNews.FUserCreate = RequestContext.Principal.Identity.Name;
                    oNews.FLanguage = language;
                    oNews.FBranchCode = branchCode;
                    db.CMS_Ads.Add(oNews);
                }
                else
                {
                    oNews.FUpdateTime = DateTime.Now;
                    db.Entry(oNews).State = EntityState.Modified;
                }
                db.SaveChanges();

                return Ok(oNews);

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

        [HttpDelete]
        [Route("api/CMS_Ads/Delete")]
        public IHttpActionResult CMS_AdsDelete(long id)
        {
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var obj = db.CMS_Ads.Where(x => x.FInUse == true && x.FBranchCode == branchCode && x.FLanguage == language && x.Id == id).FirstOrDefault();
                if (obj != null)
                {
                    obj.FInUse = false;
                    db.Entry(obj).State = EntityState.Modified;
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
        [HttpGet]
        [Route("api/CMS_Ads")]
        public IHttpActionResult CMS_ListLinks(int pageNumber, int pageSize, string searchKey)
        {
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var data = db.CMS_Ads.Where(x => x.FInUse == true && x.FBranchCode == branchCode && x.FLanguage == language
                && (x.Url.Contains(searchKey) || x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
                var total = db.CMS_Ads.Where(x => x.FInUse == true && x.FBranchCode == branchCode && x.FLanguage == language
                 && (x.Url.Contains(searchKey) || x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).ToList();
                var respon = new
                {
                    list = data,
                    total = total.Count()
                };
                return Ok(respon);

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
        [Route("api/CMS_Ads/GetById")]
        public IHttpActionResult GetById(long id)
        {
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var data = db.CMS_Ads.Where(x => x.FInUse == true && x.FBranchCode == branchCode && x.FLanguage == language && x.Id == id).FirstOrDefault();
                return Ok(data);

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
        private void Validate(CMS_Ads item)
        {

            if (string.IsNullOrEmpty(item.FName))
            {
                ModelState.AddModelError("FName", "Bắt buộc nhập dữ liệu");
                ModelState.AddModelError("FName", "has-error");
            }

        }
    }
}
