using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApiCore.Models;

namespace WebApiCore.Controllers.News
{
    public class SponsorAndPartnerController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();
        [HttpPost]
        [Route("api/SponsorAndPartner")]
        public IHttpActionResult SponsorAndPartner(CMS_Sponsors oNews)
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
                        oNews.FCode = "SPONSOR_" + DateTime.Now.Ticks;
                    oNews.FCreateTime = DateTime.Now;
                    oNews.FInUse = true;
                    oNews.FUserCreate = RequestContext.Principal.Identity.Name;
                    oNews.FLanguage = language;
                    oNews.FBranchCode = branchCode;
                    db.CMS_Sponsors.Add(oNews);
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
        [Route("api/SponsorAndPartner/Delete")]
        public IHttpActionResult SponsorAndPartnerDelete(long id)
        {
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var obj = db.CMS_Sponsors.Where(x => x.FInUse == true && x.FBranchCode == branchCode && x.FLanguage == language && x.Id == id).FirstOrDefault();
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
        [Route("api/SponsorAndPartner")]
        public IHttpActionResult ListSponsorAndPartner(int pageNumber, int pageSize, string searchKey)
        {
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var data = db.CMS_Sponsors.Where(x => x.FInUse == true && x.FBranchCode == branchCode && x.FLanguage == language
                && (x.Url.Contains(searchKey) || x.FName.Contains(searchKey) || x.FDescription.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
                var total = db.CMS_Sponsors.Where(x => x.FInUse == true && x.FBranchCode == branchCode && x.FLanguage == language
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
        [Route("api/SponsorAndPartner/GetById")]
        public IHttpActionResult GetById(long id)
        {
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var data = db.CMS_Sponsors.Where(x => x.FInUse == true && x.FBranchCode == branchCode && x.FLanguage == language && x.Id == id).FirstOrDefault();
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
        private void Validate(CMS_Sponsors item)
        {

            if (string.IsNullOrEmpty(item.FName))
            {
                ModelState.AddModelError("FName", "Bắt buộc nhập dữ liệu");
                ModelState.AddModelError("FName", "has-error");
            }

        }
    }
}
