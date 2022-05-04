using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiCore.Models;

namespace WebApiCore.Controllers
{
    [Authorize]
    public class CompaniesController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();

       // GET: api/Companies
        public IQueryable<Company> GetCompanies()
        {
            return db.Companies;
        }

        // GET: api/Companies/5
        [ResponseType(typeof(Company))]
        public async Task<IHttpActionResult> GetCompany(long id)
        {
            Company company = await db.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }

        // PUT: api/Companies/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCompany(long id, Company company)
        {
            Validate(company);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != company.Id)
            {
                return BadRequest();
            }

            db.Entry(company).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        private void Validate(Company item)
        {
            if (string.IsNullOrEmpty(item.FCode))
            {
                ModelState.AddModelError("FCode", "Bắt buộc nhập mã công ty");
                ModelState.AddModelError("FCode", "has-error");

            }
            if (string.IsNullOrEmpty(item.FName))
            {
                ModelState.AddModelError("FName", "Bắt buộc nhập tên công ty");
                ModelState.AddModelError("FName", "has-error");
            }

        }
        // POST: api/Companies
        [ResponseType(typeof(Company))]
        public async Task<IHttpActionResult> PostCompany(Company company)
        {
            Validate(company);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Companies.Add(company);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = company.Id }, company);
        }

        // DELETE: api/Companies/5
        [ResponseType(typeof(Company))]
        public async Task<IHttpActionResult> DeleteCompany(long id)
        {
            Company company = await db.Companies.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            db.Companies.Remove(company);
            await db.SaveChangesAsync();

            return Ok(company);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CompanyExists(long id)
        {
            return db.Companies.Count(e => e.Id == id) > 0;
        }
        [HttpGet]
        [Route("api/CheckValidCompany/{FCode}")]
        //[ResponseType(typeof(Area))]
        public async Task<IHttpActionResult> CheckValid(string FCode)
        {
            //string sql = "SELECT * FROM " + tbName + " WHERE FCode='" + FCode + "'";
            //var dt = db.Database.SqlQuery<>(sql);
            var dt = db.Companies.Where(t => t.FCode == FCode).FirstOrDefault();
            if (dt != null)
                return Ok(dt);
            else return Ok("undefined");
        }
    }
}