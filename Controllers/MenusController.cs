using Newtonsoft.Json;
using System;
using System.Collections;
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
    public class MenusController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();

        [Route("Menus/Tree/{ComCode}")]
        [ResponseType(typeof(object))]
        public async Task<IHttpActionResult> GetMenuTree(string ComCode)
        {
            if (ComCode != "ALL")
            {
                var Com = await db.MainMenus.Where(x => x.FCode == ComCode).SingleOrDefaultAsync();
                if (Com == null)
                    return NotFound();
                ArrayList List = new ArrayList();
                var orgs = db.Menus.Where(x => x.MainMenu == ComCode).OrderBy(t=>t.FIndex).ToList();
                foreach (Menu org in orgs)
                {
                    var o = new
                    {
                        id = org.FCode, //org.Id,
                        code = org.FCode,
                        text = org.FName,
                        children = await GetChild(org.FCode)
                    };
                    List.Add(o);
                }
                var oCom = new
                {
                    id = ComCode,
                    text = Com.FName,
                    code = Com.FCode,
                    children = List,
                    state = new
                    {
                        opened = true,  // is the node open
                        disabled = false,  // is the node disabled
                        selected = true // is the node selected
                    }

                };
                return Ok(oCom);
            }
            else
            {
                ArrayList ListTT = new ArrayList();

                var Com = db.MainMenus;
                if (Com.Count() > 0)
                {
                    foreach (MainMenu item in Com)
                    {
                        ArrayList List = new ArrayList();
                        var orgs = db.Menus.Where(x => x.MainMenu == item.FCode).OrderBy(t => t.FIndex).ToList();
                        foreach (Menu org in orgs)
                        {
                            var o = new
                            {
                                id = org.FCode,//org.Id,
                                code = org.FCode,
                                text = org.FName,
                                children = await GetChild(org.FCode)
                            };
                            List.Add(o);
                        }
                        var oCom = new
                        {
                            id = item.FCode,
                            text = item.FName,
                            code = item.FCode,
                            children = List,
                            state = new
                            {
                                opened = true,  // is the node open
                                disabled = false,  // is the node disabled
                                selected = true // is the node selected
                            }

                        };
                        ListTT.Add(oCom);
                    }
                }
                return Ok(ListTT);
            }
        }

        public async Task<ArrayList> GetChild(string ComCode)
        {
            ArrayList Child = new ArrayList();
            var Com = await db.Menus.Where(x => x.FCode == ComCode).SingleOrDefaultAsync();
            ArrayList List = new ArrayList();
            var orgs = db.Menus.Where(x => x.ParentMenu == ComCode).OrderBy(t => t.FIndex).ToList();
            foreach (Menu org in orgs)
            {
                var o = new
                {
                    id = org.FCode, //org.Id,
                    code = org.FCode,
                    text = org.FName,
                    children = await GetChild(org.FCode)
                };
                List.Add(o);
            }
            Child = List;
            return Child;
        }

        [Route("Menus/TreeText/{ComCode}")]
        [ResponseType(typeof(object))]
        public async Task<IHttpActionResult> GetOrgTreeText(string ComCode)
        {
            ArrayList OrgList = new ArrayList();
            var Com = db.MainMenus.ToList();
            if (ComCode != "ALL")
            {
                Com = db.MainMenus.Where(x => x.FCode == ComCode).ToList();
            }
            foreach (MainMenu item in Com)
            {
                if (Com == null)
                    return NotFound();


                var oCom = new
                {
                    id = item.FCode,
                    text = item.FName,
                    code = item.FCode,

                };
                OrgList.Add(oCom);
                int index = 1;
                string strEnd = "";
                string strBegin = "";
                for (int i = 0; i <= index; i++)
                {
                    strBegin += "  ";
                    strEnd += "--";
                }
                var orgs = db.Menus.Where(x => x.ParentMenu == ComCode);
                foreach (Menu org in orgs)
                {
                    var o = new
                    {
                        id = org.FCode,
                        code = org.FCode,
                        text = strBegin + "|" + strEnd + " " + org.FName,
                        //children = await GetChild(org.FCode,1)
                    };
                    OrgList.Add(o);
                    OrgList.AddRange(await GetChildText(org.FCode, index + 1));
                }
            }
            return Ok(OrgList);

        }

        public async Task<ArrayList> GetChildText(string ComCode, int index)
        {
            ArrayList Child = new ArrayList();
            var Com = await db.Menus.Where(x => x.FCode == ComCode).SingleOrDefaultAsync();
            ArrayList OrgList = new ArrayList();
            var orgs = db.Menus.Where(x => x.ParentMenu == ComCode);
            string strEnd = "";
            string strBegin = "";
            for (int i = 0; i <= index; i++)
            {
                strBegin += "  ";
                strEnd += "--";
            }
            foreach (Menu org in orgs)
            {
                var o = new
                {
                    id = org.FCode,
                    code = org.FCode,
                    text = strBegin + "|" + strEnd + " " + org.FName,
                    // children = await GetChild(org.FCode)
                };
                OrgList.Add(o);
                OrgList.AddRange(await GetChildText(org.FCode, index + 1));
            }
            Child = OrgList;
            return Child;
        }

        [Route("Menus/MenuByGroup/{Code}")]
        [ResponseType(typeof(Menu))]
        public IQueryable<Menu> GetMenusbyGroup(string Code)
        {
            if (Code != "ALL")
            {
                var menu = db.Menus.Where(t => t.FCode == Code || t.MainMenu == Code || t.ParentMenu == Code).OrderBy(t=>t.FIndex);
                return menu;
            }
            else
            {
                return db.Menus;
            }

        }

        // GET: api/Menus
        public IQueryable<Menu> GetMenus()
        {
            // var a = db.Menus.Count();
            return db.Menus;
        }

        [HttpPost]
        [Route("api/DislayByPermission")]
        public IHttpActionResult DislayByPermission()//(string permission, string FCode)
        {
            //bool check = false;
            string currentUser = User.Identity.Name;
            string SQL = "select Distinct mn.MainMenu,mn.Id,mn.FCode , mn.Fname , mn.FIndex,mn.CodePermission from view_quyen_menu as mn "
                         + "where mn.mauser = '" + currentUser + "'"
                         //+ "AND mn.CodePermission like'%$" + permission + "= TRUE$%'"
                        // + "AND mn.FCode=" + FCode
                          + "order by mn.FIndex asc ";
            var data = db.Database.SqlQuery<ViewPermission>(SQL);
            //if (data != null)
            //{
            //    check = true;
            //}
            return Ok(data);

        }
        [HttpPost]
        [Route("api/getMenuByUser")]
        public List<ViewMenu> GetMenusByLevel()
        {
            string currentUser = User.Identity.Name;
            List<ViewMenu> obj = new List<ViewMenu>();
            // Lấy menu cha
            string SQL = "select distinct mn.Id,mn.FCode , mn.Fname, mn.icon, mn.FIndex, mn.MainMenu,mn.ParentMenu,mn.ControllerName,mn.Url from dbo.Menu as mn inner join "
                        + "dbo.view_quyen_menu as viewq on mn.FCode = viewq.ParentMenu "
                        + "where mn.FInUse=1 AND viewq.FInUse=1 AND viewq.mauser = '" + currentUser + "' "
                        + "AND viewq.CodePermission like'%=TRUE$%'"
                        + " order by mn.FIndex asc";


            var data = db.Database.SqlQuery<ViewMenu>(SQL);
            foreach (ViewMenu cM in data.OrderBy(x => x.FIndex))
            {
                obj.Add(cM);
                // Lấy menu con theo cha
                string SQL_child = "select distinct mn.Id,mn.FCode , mn.Fname , mn.FIndex, mn.icon,mn.MainMenu,mn.ParentMenu,mn.ControllerName,mn.Url from "
                        + "dbo.view_quyen_menu as mn "
                        + "where mn.FInUse=1 AND mn.mauser = '" + currentUser + "' AND mn.ParentMenu = '"
                        + cM.FCode + "' AND mn.CodePermission like'%=TRUE$%'"
                        + " order by mn.FIndex asc";

                var data_child = db.Database.SqlQuery<ViewMenu>(SQL_child);
                foreach (ViewMenu o in data_child.OrderBy(x => x.FIndex))
                {
                    obj.Add(o);
                }
            }
            return obj;
        }
        // GET: api/Menus/5
        [ResponseType(typeof(Menu))]
        public async Task<IHttpActionResult> GetMenu(long id)
        {
            Menu menu = await db.Menus.FindAsync(id);
            if (menu == null)
            {
                return NotFound();
            }

            return Ok(menu);
        }

        // PUT: api/Menus/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMenu(long id, Menu menu)
        {
            ValidateMenu(menu);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != menu.Id)
            {
                return BadRequest();
            }

            db.Entry(menu).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuExists(id))
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

        private void ValidateMenu(Menu menu)
        {
            if (string.IsNullOrEmpty(menu.FCode))
            {

                ModelState.AddModelError("FCode", "Bắt buộc nhập mã danh mục");
                ModelState.AddModelError("FCode", "has-error");


            }
            if (string.IsNullOrEmpty(menu.FName))
            {
                ModelState.AddModelError("FName", "Bắt buộc nhập tên danh mục");
                ModelState.AddModelError("FName", "has-error");

            }
            if (string.IsNullOrEmpty(menu.Permission))
            {
                ModelState.AddModelError("Permission", "Bắt buộc chọn chức năng");
                ModelState.AddModelError("Permission", "has-error");

            }
            if (string.IsNullOrEmpty(menu.ParentMenu) && string.IsNullOrEmpty(menu.MainMenu))
            {
                if (string.IsNullOrEmpty(menu.ParentMenu))
                {
                    ModelState.AddModelError("ParentMenu", "Chưa chọn danh mục chính");
                    ModelState.AddModelError("ParentMenu", "has-error");
                }
                if (string.IsNullOrEmpty(menu.MainMenu))
                {
                    ModelState.AddModelError("MainMenu", "Chưa chọn danh mục chi tiết");
                    ModelState.AddModelError("MainMenu", "has-error");
                }
            }
            if (!string.IsNullOrEmpty(menu.ParentMenu) && !string.IsNullOrEmpty(menu.MainMenu))
            {
                if (!string.IsNullOrEmpty(menu.ParentMenu))
                {
                    ModelState.AddModelError("ParentMenu", "Không được chọn khi đã chọn danh mục chính");
                    ModelState.AddModelError("ParentMenu", "has-error");
                }

            }
            if (!string.IsNullOrEmpty(menu.ParentMenu) && string.IsNullOrEmpty(menu.MainMenu))
            {
                var obj = db.Menus.Where(t => t.FCode == menu.ParentMenu && t.ParentMenu == menu.FCode).FirstOrDefault();

                if (obj != null || menu.FCode == menu.ParentMenu)
                {
                    ModelState.AddModelError("ParentMenu", "Không được biết báo lỗi như thế nào???");
                    ModelState.AddModelError("ParentMenu", "has-error");
                }

            }
        }

        // POST: api/Menus
        [ResponseType(typeof(Menu))]
        public async Task<IHttpActionResult> PostMenu(Menu menu)
        {

            ValidateMenu(menu);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            menu.FCode = menu.FCode.ToUpper();
            menu.FCreateTime = System.DateTime.Now;
            menu.FUpdateTime = System.DateTime.Now;
            menu.FUserCreate = RequestContext.Principal.Identity.Name;
            menu.FInUse = true;
            db.Menus.Add(menu);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = menu.Id }, menu);
        }

        // DELETE: api/Menus/5
        [ResponseType(typeof(Menu))]
        public async Task<IHttpActionResult> DeleteMenu(long id)
        {
            Menu menu = await db.Menus.FindAsync(id);
            if (menu == null)
            {
                return NotFound();
            }

            db.Menus.Remove(menu);
            await db.SaveChangesAsync();

            return Ok(menu);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MenuExists(long id)
        {
            return db.Menus.Count(e => e.Id == id) > 0;
        }
    }

    [RoutePrefix("api/ApiMenus")]
    public class ApiMenusController : ApiController
    {
        private WebApiDataEntities db = new WebApiDataEntities();
        [Route("GetMenusByLevel")]
        [ResponseType(typeof(Menu))]
        public async Task<IHttpActionResult> GetMenusByLevel()
        {
            List<Menu> obj = new List<Menu>();
            var ParentMenu = await db.Menus.Where(x => !string.IsNullOrEmpty(x.MainMenu) && x.FInUse==true).ToListAsync(); //from m in db.Menus where m.MainMenu != null select m;

            foreach (Menu cM in ParentMenu.OrderBy(x => x.FIndex))
            {
                obj.Add(cM);
                var objM = await db.Menus.Where(y => y.ParentMenu == cM.FCode &&  y.FInUse == true).ToListAsync();  //from oCm in db.Menus where oCm.ParentMenu == cM.FCode select oCm;
                foreach (Menu o in objM.OrderBy(x => x.FIndex))
                {
                    obj.Add(o);
                }
            }
            return Ok(obj);
        }
        #region Hàm phân quyền
        [Route("GetMenusByLevel/{id}/{CodeRole}")]
        [ResponseType(typeof(Menu))]
        public async Task<IHttpActionResult> GetMenusByLevel(string id, string CodeRole)
        {
            List<MenuRole> obj = new List<MenuRole>();
            if (id != "ALL")
            {
                var ParentMenu = await db.Menus.Where(x => x.MainMenu == id).ToListAsync(); //from m in db.Menus where m.MainMenu != null select m;
                var permission = db.Permissions;
                foreach (Menu cM in ParentMenu.OrderBy(x => x.FIndex))
                {
                    string a = cM.Permission;
                    List<ListCheck> ls_Pr = new List<ListCheck>();
                    foreach (Permission item in permission)
                    {
                      

                        #region check xem quyền có nằm trên menu không
                        ListCheck itemls_Pr = new ListCheck();
                        if (a != null && a.Contains("\"" + item.FCode + "\""))
                        {
                            itemls_Pr.display = true;
                          
                        }
                        else itemls_Pr.display = false;
                       
                        #endregion
                        #region check xem quyền có đc chọn không

                        var role_as = db.ROLE_ASSIGNMENT.Where(t => t.CodeMenu == cM.FCode
                                                 && t.CodeRole == CodeRole
                                                 && t.CodePermission.Contains("$" + item.FCode + "=TRUE$")).FirstOrDefault();
                        if (role_as != null)
                        {
                            itemls_Pr.checkRole = true;
                        }
                        else itemls_Pr.checkRole = false;
                        #endregion
                        itemls_Pr.permission = item.FCode;
                        itemls_Pr.PerName = item.FName;
                        ls_Pr.Add(itemls_Pr);
                    }
                    MenuRole mnParent = new MenuRole();
                    mnParent.menu = cM;
                    mnParent.check = ls_Pr;


                   
                    obj.Add(mnParent);
                    var objM = await db.Menus.Where(y => y.ParentMenu == cM.FCode).ToListAsync();  //from oCm in db.Menus where oCm.ParentMenu == cM.FCode select oCm;
                    foreach (Menu o in objM.OrderBy(x => x.FIndex))
                    {
                        string b = o.Permission;
                       
                        List<ListCheck> ls = new List<ListCheck>();
                        foreach (Permission itemChild in permission)
                        {
                            #region check xem quyền có nằm trên menu không
                            ListCheck itemls = new ListCheck();
                            if (b != null && b.Contains("\"" + itemChild.FCode + "\""))
                            {
                                itemls.display = true;
                                
                            }
                            else itemls.display = false;
                            #endregion
                            #region check xem quyền có đc chọn không
                           
                            var role_as = db.ROLE_ASSIGNMENT.Where(t => t.CodeMenu == o.FCode
                                                     && t.CodeRole == CodeRole
                                                     && t.CodePermission.Contains("$" + itemChild.FCode + "=TRUE$")).FirstOrDefault();
                            if (role_as != null)
                            {
                                itemls.checkRole = true;
                            }
                            else itemls.checkRole = false;
                            #endregion
                            itemls.permission = itemChild.FCode;
                            itemls.PerName = itemChild.FName;
                            ls.Add(itemls);
                        }
                        MenuRole mnChild = new MenuRole();
                        mnChild.menu = o;
                        mnChild.check = ls;
                        obj.Add(mnChild);
                    }
                }
            }
            return Ok(obj);
        }
        public class MenuRole
        {
            public Menu menu { get; set; }
            public List<ListCheck> check { get; set; }

        }
        public class ListCheck
        {
            public string permission { get; set; }
            public string PerName { get; set; }
            public bool display { get; set; }
            public bool checkRole { get; set; }
        }
        
        [HttpPost]
        [Route("Menus/SaveRoleAssign/{CodeRole}")]
        [ResponseType(typeof(object))]
        public void SaveRoleAssign([FromBody]List<Object> obj, string CodeRole)
        {
            int a = obj.Count;
            for (int i = 0; i < a; i++)
            {
                MenuRole result = JsonConvert.DeserializeObject<MenuRole>(obj[i].ToString());
                string permiss = "$";

                foreach (var it in result.check)
                {
                    permiss += it.permission + "=" + it.checkRole.ToString().ToUpper() + "$";
                }

                // var a = result.check
                var mn = db.ROLE_ASSIGNMENT.Where(t => t.CodeMenu == result.menu.FCode
                                                      && t.CodeRole == CodeRole
                                                      && t.FInUse == true).FirstOrDefault();
                if (mn == null)
                {
                    mn = new ROLE_ASSIGNMENT();
                    mn.FCode = System.Guid.NewGuid().ToString();
                    mn.FCreateTime = System.DateTime.Now;
                    mn.FUpdateTime = System.DateTime.Now;
                    mn.FUserCreate = RequestContext.Principal.Identity.Name;
                    mn.CodeMenu = result.menu.FCode;
                    mn.CodeRole = CodeRole;
                    mn.CodePermission = permiss;
                    mn.FInUse = true;
                    db.ROLE_ASSIGNMENT.Add(mn);
                    db.SaveChanges();
                }
                else
                {
                    mn.CodePermission = permiss;
                    db.SaveChanges();
                }
            }
        }
        #endregion
        [HttpPost]
        [Route("UpdateTree")]
        [ResponseType(typeof(object))]
        public void UpdateTree([FromBody]List<Object> obj)
        {
            int a = obj.Count;
            string maMain = "";
            for (int i = 0; i < a; i++)
            {
                Obj_Menu result = JsonConvert.DeserializeObject<Obj_Menu>(obj[i].ToString());
                if (result.parent != "#")
                {
                    var mn = db.Menus.Where(t => t.FCode == result.id).FirstOrDefault();
                    if (mn != null)
                    {
                        if (result.parent != maMain)

                        {
                            mn.MainMenu = "";
                            mn.ParentMenu = result.parent;
                        }
                        else
                        {
                            mn.MainMenu = maMain;
                            mn.ParentMenu = "";

                        }

                        mn.FIndex = i + 1;
                        db.SaveChanges();
                    }
                    else
                    {
                        var mainmn = db.MainMenus.Where(t => t.FCode == result.id).FirstOrDefault();
                        if (mainmn != null)
                        {
                            Menu menu = new Menu();
                            menu.FCode = menu.FCode.ToUpper();
                            menu.FCreateTime = System.DateTime.Now;
                            menu.FUpdateTime = System.DateTime.Now;
                            menu.FUserCreate = RequestContext.Principal.Identity.Name;

                            menu.FCode = mainmn.FCode;
                            menu.FName = mainmn.FName;
                            menu.FDescription = mainmn.FDescription;
                            menu.FInUse = true;
                            if (result.parent != maMain)

                            {
                                menu.MainMenu = "";
                                menu.ParentMenu = result.parent;
                            }
                            else
                            {
                                menu.MainMenu = maMain;
                                menu.ParentMenu = "";
                            }
                            mainmn.FInUse = false;
                            db.Menus.Add(menu);
                        }
                        db.SaveChanges();
                    }
                }
                else
                {
                    maMain = result.id;
                    var mainmn = db.MainMenus.Where(t => t.FCode == maMain).FirstOrDefault();
                    if (mainmn != null)
                    {
                        var mn = db.Menus.Where(t => t.FCode == result.id).FirstOrDefault();
                        if (mn != null)
                        {
                            mainmn.FCode = mn.FCode;
                            mainmn.FName = mn.FName;
                            mainmn.FDescription = mn.FDescription;
                            mainmn.FInUse = true;
                            mn.FInUse = false;
                        }

                    }
                    else
                        mainmn.FInUse = true;
                    db.SaveChanges();
                }
            }
        }

        public class Obj_Menu
        {
            public string id { get; set; }
            public string parent { get; set; }
            public string text { get; set; }

        }
        [Route("GetPermission")]
        [ResponseType(typeof(Permission))]
        public IQueryable<Permission> GetPermissions()
        {
            return db.Permissions.Where(t => t.FInUse == true);
        }

        [HttpGet]
        [Route("CheckValidMenu")]
        //[ResponseType(typeof(Area))]
        public async Task<IHttpActionResult> CheckValid(string FCode)
        {
            //string sql = "SELECT * FROM " + tbName + " WHERE FCode='" + FCode + "'";
            //var dt = db.Database.SqlQuery<>(sql);
            var dt = db.Menus.Where(t => t.FCode == FCode).FirstOrDefault();
            if (dt != null)
                return Ok(dt);
            else return Ok("undefined");
        }
    }

}