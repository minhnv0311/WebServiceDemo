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
    public class CMSBannerController : ApiController
    {

        private WebApiDataEntities db = new WebApiDataEntities();
        [HttpPost]
        [Route("api/CMS_Banner")]
        public IHttpActionResult CMS_Banner(CMS_Banner oNews)
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
                //if(oNews.FInUse == true)
                //{
                //    var obj = (from banner in db.CMS_Banner where banner.FBranchCode == branchCode && banner.FLanguage == language &&  banner.FInUse == true select banner).FirstOrDefault();
                //    if (obj != null)
                //        obj.FInUse = false;
                    db.SaveChanges();
                //}    

                if (oNews.Id == 0)
                {

                    if (string.IsNullOrEmpty(oNews.FCode))
                        oNews.FCode = "BANNER_" + DateTime.Now.Ticks;
                    oNews.FCreateTime = DateTime.Now;
                    oNews.FInUse = true;
                    oNews.FUserCreate = RequestContext.Principal.Identity.Name;
                    oNews.FLanguage = language;
                    oNews.FBranchCode = branchCode;
                    db.CMS_Banner.Add(oNews);
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
        [Route("api/CMS_Banner/Delete")]
        public IHttpActionResult CMS_BannerDelete(long id)
        {
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var obj = db.CMS_Banner.Where(x => x.FInUse == true && x.FBranchCode == branchCode && x.FLanguage == language && x.Id == id).FirstOrDefault();
                if(obj != null)
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
        [Route("api/CMS_Banner")]
        public IHttpActionResult CMS_ListBanner(int pageNumber, int pageSize, string searchKey)
        {
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var data = db.CMS_Banner.Where(x =>   x.FLanguage == language
                && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
                var total = db.CMS_Banner.Where(x =>  x.FLanguage == language
                 && (x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).ToList();
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
        [Route("api/CMS_Banner/GetById")]
        public IHttpActionResult GetById(long id)
        {
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var data = db.CMS_Banner.Where(x => x.FBranchCode == branchCode && x.FLanguage == language && x.Id == id).FirstOrDefault();
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
        private void Validate(CMS_Banner item)
        {
            //if (string.IsNullOrEmpty(item.FCode))
            //{
            //    ModelState.AddModelError("code", "Bắt buộc nhập dữ liệu");
            //    ModelState.AddModelError("code", "has-error");
            //}
            if (string.IsNullOrEmpty(item.FName))
            {
                ModelState.AddModelError("FName", "Bắt buộc nhập dữ liệu");
                ModelState.AddModelError("FName", "has-error");
            }
            //if (string.IsNullOrEmpty(item.FLanguage))
            //{
            //    ModelState.AddModelError("FLanguage", "Bắt buộc nhập dữ liệu");
            //    ModelState.AddModelError("FLanguage", "has-error");
            //}
            //if (item.Id != 0 && !string.IsNullOrEmpty(item.FCode))
            //{
            //_MenuRepository = oMenu.GetConnection(configUrl, Request.Headers["x-companyid"].ToString());
            //Menu list = _MenuRepository.GetMenuByCode(item.Code);

            //if (item.Id != list.Id && list != null)
            //{
            //    ModelState.AddModelError("code", Constants.EXISTS);
            //    ModelState.AddModelError("code", Constants.ERRORCSS);
            //}
            //}
            //else if (string.IsNullOrEmpty(item.Id) && !string.IsNullOrEmpty(item.Code))
            //{
            //    _MenuRepository = oMenu.GetConnection(configUrl, Request.Headers["x-companyid"].ToString());
            //    Menu list = _MenuRepository.GetMenuByCode(item.Code);
            //    if (list != null)
            //    {
            //        ModelState.AddModelError("code", Constants.EXISTS);
            //        ModelState.AddModelError("code", Constants.ERRORCSS);
            //    }
            //}
        }
      
    }
}
