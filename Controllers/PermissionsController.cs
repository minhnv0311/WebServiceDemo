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
    public class PermissionsController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();
        // GET: api/Permissions
        public IQueryable<Permission> GetPermissions()
        {
            return db.Permissions;
        }

        // GET: api/Permissions/5
        [ResponseType(typeof(Permission))]
        public async Task<IHttpActionResult> GetPermission(long id)
        {
            Permission permission = await db.Permissions.FindAsync(id);
            if (permission == null)
            {
                return NotFound();
            }

            return Ok(permission);
        }

        // PUT: api/Permissions/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPermission(long id, Permission permission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != permission.Id)
            {
                return BadRequest();
            }

            db.Entry(permission).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PermissionExists(id))
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

        // POST: api/Permissions
        [ResponseType(typeof(Permission))]
        public async Task<IHttpActionResult> PostPermission(Permission permission)
        {
            ValidatePermission(permission);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            permission.FCode = permission.FCode.ToUpper();
            permission.FInUse = true;
            permission.FCreateTime = System.DateTime.Now;
            permission.FUpdateTime = System.DateTime.Now;
            permission.FUserCreate = RequestContext.Principal.Identity.Name;
            permission.FBranchCode = Commons.Common.GetCurrentCoCode(db, RequestContext.Principal.Identity.Name);
            db.Permissions.Add(permission);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = permission.Id }, permission);
        }
        private void ValidatePermission(Permission pre)
        {
            if (string.IsNullOrEmpty(pre.FCode))
            {
                ModelState.AddModelError("FCode", "Bắt buộc nhập dữ liệu");
                ModelState.AddModelError("FCode", "has-error");

            }
            if (string.IsNullOrEmpty(pre.FName))
            {
                ModelState.AddModelError("FName", "Bắt buộc nhập dữ liệu");
                ModelState.AddModelError("FName", "has-error");
            }
           
        }
        // DELETE: api/Permissions/5
        [ResponseType(typeof(Permission))]
        public async Task<IHttpActionResult> DeletePermission(long id)
        {
            Permission permission = await db.Permissions.FindAsync(id);
            if (permission == null)
            {
                return NotFound();
            }

            db.Permissions.Remove(permission);
            await db.SaveChangesAsync();

            return Ok(permission);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PermissionExists(long id)
        {
            return db.Permissions.Count(e => e.Id == id) > 0;
        }
        [HttpGet]
        [Route("api/CheckValidPermission/{FCode}")]
        //[ResponseType(typeof(Area))]
        public async Task<IHttpActionResult> CheckValid(string FCode)
        {
            //string sql = "SELECT * FROM " + tbName + " WHERE FCode='" + FCode + "'";
            //var dt = db.Database.SqlQuery<>(sql);
            var dt = db.Permissions.Where(t => t.FCode == FCode).FirstOrDefault();
            if (dt != null)
                return Ok(dt);
            else return Ok("undefined");
        }
    }
}