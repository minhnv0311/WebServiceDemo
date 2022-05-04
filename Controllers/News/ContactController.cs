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
    public class ContactController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();
        [HttpPost]
        [Route("api/CMS_Contact")]
        public IHttpActionResult CMS_Contact(CMS_Contact objNews)
        {
            try
            {
                if (string.IsNullOrEmpty(objNews.FName))
                {
                    ModelState.AddModelError("FName", "Require Name");
                    ModelState.AddModelError("FName", "has-error");
                }
                if (string.IsNullOrEmpty(objNews.PhoneNumber))
                {
                    ModelState.AddModelError("PhoneNumber", "Require Phone");
                    ModelState.AddModelError("PhoneNumber", "has-error");
                }
                if (string.IsNullOrEmpty(objNews.Content))
                {
                    ModelState.AddModelError("Content", "Require Content");
                    ModelState.AddModelError("Content", "has-error");
                }
                if (string.IsNullOrEmpty(objNews.Title))
                {
                    ModelState.AddModelError("Title", "Require Title");
                    ModelState.AddModelError("Title", "has-error");
                }
                if (string.IsNullOrEmpty(objNews.Email))
                {
                    ModelState.AddModelError("Email", "Require Email");
                    ModelState.AddModelError("Email", "has-error");
                }
                if (string.IsNullOrEmpty(objNews.Type))
                {
                    ModelState.AddModelError("Type", "Require Type");
                    ModelState.AddModelError("Type", "has-error");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                CMS_Contact oNews = objNews;
                if (oNews.Id == 0)
                {
                    oNews.FCode = "CONTACT_" + DateTime.Now.Ticks;
                    oNews.FCreateTime = DateTime.Now;
                    oNews.FUpdateTime = DateTime.Now;
                    oNews.FUserCreate = RequestContext.Principal.Identity.Name;
                    oNews.FLanguage = language;
                    oNews.FBranchCode = branchCode;
                    oNews.FInUse = true;
                    oNews.FIndex = 0;
                    db.CMS_Contact.Add(oNews);
                }
                else
                {
                    //oNews.FCreateTime = DateTime.Now;
                    oNews.FUpdateTime = DateTime.Now;
                    db.Entry(oNews).State = EntityState.Modified;
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
        [Route("api/CMS_Contact/GetList")]
        public IHttpActionResult GetList(int pageNumber, int pageSize, string searchKey)
        {
            string branchCode = HttpContext.Current.Request.Headers["x-company"];
            string language = HttpContext.Current.Request.Headers["x-language"];
            var data = db.CMS_Contact.Where(x => x.FLanguage == language && x.FInUse == true
                && (x.FName.Contains(searchKey) || x.PhoneNumber.Contains(searchKey) || x.Email.Contains(searchKey) || x.Title.Contains(searchKey) || string.IsNullOrEmpty(searchKey)))
                    .OrderByDescending(x => x.FCreateTime)
                    .Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            var total = db.CMS_Contact.Where(x => x.FLanguage == language && x.FInUse == true
              && (x.FName.Contains(searchKey) || x.PhoneNumber.Contains(searchKey) || x.Email.Contains(searchKey) || x.Title.Contains(searchKey) || string.IsNullOrEmpty(searchKey))).ToList();
            var respon = new
            {
                list = data,
                total = total.Count()
            };
            return Ok(respon);
        }

        [HttpGet]
        [Route("api/CMS_Contact/GetById")]
        public IHttpActionResult GetById(long id)
        {
            try
            {
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var data = db.CMS_Contact.Where(x => x.FInUse == true && x.FLanguage == language && x.Id == id).FirstOrDefault();
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

        [HttpPost]
        [Route("api/CMS_Contact/MakeUnRead")]
        public IHttpActionResult MakeUnRead(CMS_Contact obj)
        {
            try
            {
                
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                CMS_Contact oNews = obj;
                oNews.FUpdateTime = DateTime.Now;
                oNews.FIndex = 0;
                db.Entry(oNews).State = EntityState.Modified;
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
        
        [HttpPost]
        [Route("api/CMS_Contact/HasRead")]
        public IHttpActionResult HasRead(CMS_Contact obj)
        {
            try
            {
                
                string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                CMS_Contact oNews = obj;
                oNews.FUpdateTime = DateTime.Now;
                oNews.FIndex = 1;
                db.Entry(oNews).State = EntityState.Modified;
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

        [HttpDelete]
        [Route("api/CMS_Contact/Delete")]
        public IHttpActionResult Delete(long id)
        {
            try
            {
                //string branchCode = HttpContext.Current.Request.Headers["x-company"];
                string language = HttpContext.Current.Request.Headers["x-language"];

                var obj = db.CMS_Contact.Where(x => x.FInUse == true && x.FLanguage == language && x.Id == id).FirstOrDefault();
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
    }
}
