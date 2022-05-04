
namespace WebApiCore.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class WebApiDataEntities : DbContext
    {
        public WebApiDataEntities()
            : base("name=WebApiDataEntities")
        {
        }

        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<AutoID> AutoIDs { get; set; }
        public virtual DbSet<BoDanhGiaHuyen> BoDanhGiaHuyens { get; set; }
        public virtual DbSet<BoDanhGiaTinh> BoDanhGiaTinhs { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<ChucDanh> ChucDanhs { get; set; }
        public virtual DbSet<CMS_Ads> CMS_Ads { get; set; }
        public virtual DbSet<CMS_Banner> CMS_Banner { get; set; }
        public virtual DbSet<CMS_Categories> CMS_Categories { get; set; }
        public virtual DbSet<CMS_DocumentInfo> CMS_DocumentInfo { get; set; }
        public virtual DbSet<CMS_Documents> CMS_Documents { get; set; }
        public virtual DbSet<CMS_Gallery> CMS_Gallery { get; set; }
        public virtual DbSet<CMS_GroupLinks> CMS_GroupLinks { get; set; }
        public virtual DbSet<CMS_Library> CMS_Library { get; set; }
        public virtual DbSet<CMS_Links> CMS_Links { get; set; }
        public virtual DbSet<CMS_Meta> CMS_Meta { get; set; }
        public virtual DbSet<CMS_News> CMS_News { get; set; }
        public virtual DbSet<CMS_News_Files> CMS_News_Files { get; set; }
        public virtual DbSet<CMS_PageTitle> CMS_PageTitle { get; set; }
        public virtual DbSet<CMS_Videos> CMS_Videos { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<DMChuanChatLuong> DMChuanChatLuongs { get; set; }
        public virtual DbSet<DMCongCu_QL_ChatLuong> DMCongCu_QL_ChatLuong { get; set; }
        public virtual DbSet<DMDonViTinh> DMDonViTinhs { get; set; }
        public virtual DbSet<DMLinhVucDN> DMLinhVucDNs { get; set; }
        public virtual DbSet<DMLoaiHinh_DN> DMLoaiHinh_DN { get; set; }
        public virtual DbSet<DMLoaiHinhSanXuat> DMLoaiHinhSanXuats { get; set; }
        public virtual DbSet<DMNganhNghe> DMNganhNghes { get; set; }
        public virtual DbSet<DMNgonNgu> DMNgonNgus { get; set; }
        public virtual DbSet<DMPhanLoaiGiaCong> DMPhanLoaiGiaCongs { get; set; }
        public virtual DbSet<DMQuocGia> DMQuocGias { get; set; }
        public virtual DbSet<DMTrangThai> DMTrangThais { get; set; }
        public virtual DbSet<DOANH_NGHIEP> DOANH_NGHIEP { get; set; }
        public virtual DbSet<DoanhNghiep> DoanhNghieps { get; set; }
        public virtual DbSet<DoanhNghiep_KhachHang> DoanhNghiep_KhachHang { get; set; }
        public virtual DbSet<DoanhNghiep_LienHe> DoanhNghiep_LienHe { get; set; }
        public virtual DbSet<DoanhNghiep_LinhVuc> DoanhNghiep_LinhVuc { get; set; }
        public virtual DbSet<DoanhNghiep_NguyenLieu> DoanhNghiep_NguyenLieu { get; set; }
        public virtual DbSet<DoanhNghiep_NhapKhau> DoanhNghiep_NhapKhau { get; set; }
        public virtual DbSet<DoanhNghiep_NhaXuong> DoanhNghiep_NhaXuong { get; set; }
        public virtual DbSet<DoanhNghiep_SanPham> DoanhNghiep_SanPham { get; set; }
        public virtual DbSet<DoanhNghiep_ThietBi> DoanhNghiep_ThietBi { get; set; }
        public virtual DbSet<DoanhNghiep_XuatKhau> DoanhNghiep_XuatKhau { get; set; }
        public virtual DbSet<DoanhNghiep_XuatNhapKhau> DoanhNghiep_XuatNhapKhau { get; set; }
        public virtual DbSet<Donvi> Donvis { get; set; }
        public virtual DbSet<DTYeuCauTheoDoi> DTYeuCauTheoDois { get; set; }
        public virtual DbSet<DTYeuCauTruyVan> DTYeuCauTruyVans { get; set; }
        public virtual DbSet<GioiTinh> GioiTinhs { get; set; }
        public virtual DbSet<Group_Role> Group_Role { get; set; }
        public virtual DbSet<Group_User> Group_User { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<LICH_SU_GIA> LICH_SU_GIA { get; set; }
        public virtual DbSet<LichSuDuyet> LichSuDuyets { get; set; }
        public virtual DbSet<LinhVuc> LinhVucs { get; set; }
        public virtual DbSet<LOAI_HINH_DN> LOAI_HINH_DN { get; set; }
        public virtual DbSet<LoaiGiayTo> LoaiGiayToes { get; set; }
        public virtual DbSet<MainMenu> MainMenus { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<NhaDauTu> NhaDauTus { get; set; }
        public virtual DbSet<Organization> Organizations { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }
        public virtual DbSet<Position> Positions { get; set; }
        public virtual DbSet<QL_FileDinhKem> QL_FileDinhKem { get; set; }
        public virtual DbSet<ROLE_ASSIGNMENT> ROLE_ASSIGNMENT { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<TypeCate> TypeCates { get; set; }
        public virtual DbSet<UserProfile> UserProfiles { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
