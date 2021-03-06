//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApiCore.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class WebApiDataEntities : DbContext
    {
        public WebApiDataEntities()
            : base("name=WebApiDataEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Area> Areas { get; set; }
        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<AutoID> AutoIDs { get; set; }
        public virtual DbSet<BANG_MA_CK> BANG_MA_CK { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<ChucDanh> ChucDanhs { get; set; }
        public virtual DbSet<CMS_Ads> CMS_Ads { get; set; }
        public virtual DbSet<CMS_Banner> CMS_Banner { get; set; }
        public virtual DbSet<CMS_DocumentInfo> CMS_DocumentInfo { get; set; }
        public virtual DbSet<CMS_Documents> CMS_Documents { get; set; }
        public virtual DbSet<CMS_Gallery> CMS_Gallery { get; set; }
        public virtual DbSet<CMS_Introduct> CMS_Introduct { get; set; }
        public virtual DbSet<CMS_Library> CMS_Library { get; set; }
        public virtual DbSet<CMS_Links> CMS_Links { get; set; }
        public virtual DbSet<CMS_Meta> CMS_Meta { get; set; }
        public virtual DbSet<CMS_PageTitle> CMS_PageTitle { get; set; }
        public virtual DbSet<CMS_Videos> CMS_Videos { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Donvi> Donvis { get; set; }
        public virtual DbSet<GioiTinh> GioiTinhs { get; set; }
        public virtual DbSet<Group_Role> Group_Role { get; set; }
        public virtual DbSet<Group_User> Group_User { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<LinhVuc> LinhVucs { get; set; }
        public virtual DbSet<MainMenu> MainMenus { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<Organization> Organizations { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }
        public virtual DbSet<Position> Positions { get; set; }
        public virtual DbSet<ROLE_ASSIGNMENT> ROLE_ASSIGNMENT { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<UserProfile> UserProfiles { get; set; }
        public virtual DbSet<DMNgonNgu> DMNgonNgus { get; set; }
        public virtual DbSet<TypeCate> TypeCates { get; set; }
        public virtual DbSet<CMS_Race> CMS_Race { get; set; }
        public virtual DbSet<CMS_Price> CMS_Price { get; set; }
        public virtual DbSet<CMS_DanhMucPhiDK> CMS_DanhMucPhiDK { get; set; }
        public virtual DbSet<CMS_PriceRace> CMS_PriceRace { get; set; }
        public virtual DbSet<CMS_Author> CMS_Author { get; set; }
        public virtual DbSet<CMS_RaceKit> CMS_RaceKit { get; set; }
        public virtual DbSet<CMS_Sponsors> CMS_Sponsors { get; set; }
        public virtual DbSet<CMS_GroupLinks> CMS_GroupLinks { get; set; }
        public virtual DbSet<CMS_Contact> CMS_Contact { get; set; }
        public virtual DbSet<CMS_PERSON_GROUP> CMS_PERSON_GROUP { get; set; }
        public virtual DbSet<CMS_RACKIT_RACE> CMS_RACKIT_RACE { get; set; }
        public virtual DbSet<CMS_PRICERACE_GROUP> CMS_PRICERACE_GROUP { get; set; }
        public virtual DbSet<CMS_FAQ> CMS_FAQ { get; set; }
        public virtual DbSet<DM_CoQuan> DM_CoQuan { get; set; }
        public virtual DbSet<DM_CoSoIn> DM_CoSoIn { get; set; }
        public virtual DbSet<QL_TaiLieu> QL_TaiLieu { get; set; }
        public virtual DbSet<Group_Tags> Group_Tags { get; set; }
        public virtual DbSet<CMS_News> CMS_News { get; set; }
        public virtual DbSet<TAG> TAGS { get; set; }
        public virtual DbSet<CMS_News_Files> CMS_News_Files { get; set; }
        public virtual DbSet<CMS_Categories> CMS_Categories { get; set; }
        public virtual DbSet<CMS_News_Comments> CMS_News_Comments { get; set; }
    
        public virtual ObjectResult<GetStorage_Result> GetStorage(string language)
        {
            var languageParameter = language != null ?
                new ObjectParameter("language", language) :
                new ObjectParameter("language", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetStorage_Result>("GetStorage", languageParameter);
        }
    
        public virtual ObjectResult<Get_Comments_Result> Get_Comments(string status, string searchKey, string language, Nullable<bool> isShow)
        {
            var statusParameter = status != null ?
                new ObjectParameter("Status", status) :
                new ObjectParameter("Status", typeof(string));
    
            var searchKeyParameter = searchKey != null ?
                new ObjectParameter("searchKey", searchKey) :
                new ObjectParameter("searchKey", typeof(string));
    
            var languageParameter = language != null ?
                new ObjectParameter("language", language) :
                new ObjectParameter("language", typeof(string));
    
            var isShowParameter = isShow.HasValue ?
                new ObjectParameter("IsShow", isShow) :
                new ObjectParameter("IsShow", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Get_Comments_Result>("Get_Comments", statusParameter, searchKeyParameter, languageParameter, isShowParameter);
        }
    }
}
