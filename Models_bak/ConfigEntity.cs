namespace WebApiCore.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Web;

    partial class WebApiDataEntities : DbContext
    {
        public override async Task<int> SaveChangesAsync()
        {
            AddBaseInfomation();
            return await base.SaveChangesAsync();
        }

        public override int SaveChanges()
        {
            AddBaseInfomation();
            return base.SaveChanges();
        }
        public void AddBaseInfomation()
        {
            WebApiDataEntities db = new WebApiDataEntities();
            var entities = ChangeTracker.Entries().Where(x => (x.State == EntityState.Added || x.State == EntityState.Modified || x.State == EntityState.Deleted));

            var currentUsername = !string.IsNullOrEmpty(System.Web.HttpContext.Current?.User?.Identity?.Name)
                ? System.Web.HttpContext.Current.User.Identity.Name
                : "Anonymous";

            foreach (var entity in entities)
            {
                if (entity.State != EntityState.Deleted)
                {
                    if (entity.State == EntityState.Added)
                    {
                        if (entity.CurrentValues.PropertyNames.Contains("FCreateTime"))
                            entity.Property("FCreateTime").CurrentValue = DateTime.Now;
                        if (entity.CurrentValues.PropertyNames.Contains("FUserCreate"))
                            entity.Property("FUserCreate").CurrentValue = currentUsername;
                        //entity.Property("FUserApprove").CurrentValue = currentUsername;
                        // entity.Property("FApproveTime").CurrentValue = DateTime.Now;HttpContext.Current.Request.Headers["x-language"]
                        if (entity.CurrentValues.PropertyNames.Contains("FInUse"))
                        entity.Property("FInUse").CurrentValue = true;
                        if (entity.CurrentValues.PropertyNames.Contains("FBranchCode"))
                            entity.Property("FBranchCode").CurrentValue = HttpContext.Current.Request.Headers["x-company"];
                        if (entity.CurrentValues.PropertyNames.Contains("FLanguage"))
                            entity.Property("FLanguage").CurrentValue = HttpContext.Current.Request.Headers["x-language"];
                    }
                    if (entity.CurrentValues.PropertyNames.Contains("FUserUpdate"))
                        entity.Property("FUserUpdate").CurrentValue = currentUsername;
                    if (entity.CurrentValues.PropertyNames.Contains("FUpdateTime"))
                        entity.Property("FUpdateTime").CurrentValue = DateTime.Now;
                    //((BaseEntity)entity.Entity).FUpdateTime = DateTime.Now;
                    //((BaseEntity)entity.Entity).UserModified = currentUsername;
                }

            }
        }
    }
}