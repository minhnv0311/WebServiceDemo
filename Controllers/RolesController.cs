using System;
using System.Collections.Generic;
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
    public class RolesController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();

        // GET: api/Roless
        public IQueryable<Role> GetRoles()
        {
            return db.Roles;
        }
        [Route("api/GetDropRole")]
        public IQueryable<Role> GetDropRoles()
        {
            return db.Roles.Where(t => t.FInUse == true);
        }
        [Route("api/GetDropMainMenu")]
        public IQueryable<MainMenu> GetDropMainMenu()
        {
            return db.MainMenus;
        }
        // GET: api/Roles/5
        [ResponseType(typeof(Role))]
        public async Task<IHttpActionResult> GetRole(long id)
        {
            Role Role = await db.Roles.FindAsync(id);
            if (Role == null)
            {
                return NotFound();
            }

            return Ok(Role);
        }

        // PUT: api/Roles/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRole(long id, Role Role)
        {
            ValidateMenu(Role);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Role.Id)
            {
                return BadRequest();
            }

            db.Entry(Role).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
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

        // POST: api/Roles
        [ResponseType(typeof(Role))]
        public async Task<IHttpActionResult> PostRole(Role Role)
        {
            ValidateMenu(Role);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //Role.FCreateTime = DateTime.Now;
            //Role.FInUse = true;
            db.Roles.Add(Role);
            await db.SaveChangesAsync();
            return Ok();            //return CreatedAtRoute("DefaultApi", new { id = Role.Id }, Role);
        }

        // DELETE: api/Roles/5
        [ResponseType(typeof(Role))]
        public async Task<IHttpActionResult> DeleteRole(long id)
        {
            Role Role = await db.Roles.FindAsync(id);
            if (Role == null)
            {
                return NotFound();
            }

            db.Roles.Remove(Role);
            await db.SaveChangesAsync();

            return Ok(Role);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoleExists(long id)
        {
            return db.Roles.Count(e => e.Id == id) > 0;
        }
        private void ValidateMenu(Role menu)
        {
            if (string.IsNullOrEmpty(menu.FCode))
            {
                ModelState.AddModelError("FCode", "Bắt buộc nhập mã vai trò");
                ModelState.AddModelError("FCode", "has-error");
            }
            if (string.IsNullOrEmpty(menu.FName))
            {
                ModelState.AddModelError("FName", "Bắt buộc nhập tên vai trò");
                ModelState.AddModelError("FName", "has-error");
            }
        }
        [HttpGet]
        [Route("api/CheckValidRole/{FCode}")]
        //[ResponseType(typeof(Area))]
        public async Task<IHttpActionResult> CheckValid(string FCode)
        {
            //string sql = "SELECT * FROM " + tbName + " WHERE FCode='" + FCode + "'";
            //var dt = db.Database.SqlQuery<>(sql);
            var dt = db.Roles.Where(t => t.FCode == FCode).FirstOrDefault();
            if (dt != null)
                return Ok(dt);
            else return Ok("undefined");
        }

    }
}
