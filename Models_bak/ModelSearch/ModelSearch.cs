using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiCore.Models
{
    public class DoanhNghiepModel 
    {
        public int Id { get; set; }
        public string FCode { get; set; }
        public string FName { get; set; }
        public string FDescription { get; set; }
        public Nullable<System.DateTime> FCreateTime { get; set; }
        public Nullable<System.DateTime> FUpdateTime { get; set; }
        public string FUserCreate { get; set; }
        public string FUserApprove { get; set; }
        public Nullable<System.DateTime> FApproveTime { get; set; }
        public string FStatus { get; set; }
        public Nullable<int> FIndex { get; set; }
        public Nullable<bool> FInUse { get; set; }
        public string FBranchCode { get; set; }
        public string FLanguage { get; set; }
        public string SearchKey { get; set; }
        public string TenCongTy_VI { get; set; }
        public string TenCongTy_EN { get; set; }
        public string TenVietTat { get; set; }
        public string TenThuongHieu { get; set; }
        public Nullable<int> SoLuongLaoDong { get; set; }
        public string SoLuongLDBaoHiem { get; set; }
        public string NamThanhLap { get; set; }
        public string LoaiHinhDN { get; set; }
        public string VonDauTu { get; set; }
        public string VonNhaNuoc { get; set; }
        public string VonTuNhan { get; set; }
        public string ChuanChatLuong { get; set; }
        public string CongCuQuanLy { get; set; }
        public string Logo { get; set; }
        public string DoanhThu { get; set; }
        public string PhanTramXuatKhau { get; set; }
        public string NamDoanhThu { get; set; }
        public string DiaChi_VI { get; set; }
        public string DiaChi_EN { get; set; }
        public string SoDienThoai { get; set; }
        public string Email { get; set; }
        public string Fax { get; set; }
        public string Website { get; set; }
        public string Huyen { get; set; }
        public string TenDangNhap { get; set; }
        public string LyDo { get; set; }
        public string PhanLoaiGiaCong { get; set; }
        //public string TenPhanLoaiGiaCong { get; set; }
        public string TenLoaiHinhDN { get; set; }
        public string TenChuanChatLuong { get; set; }
        public string TenCongCuQuanLy { get; set; }
    }
    public class DoanhNghiep_SanPhamModel
    {
        public int Id { get; set; }
        public string FCode { get; set; }
        public string FName { get; set; }
        public string FDescription { get; set; }
        public Nullable<System.DateTime> FCreateTime { get; set; }
        public Nullable<System.DateTime> FUpdateTime { get; set; }
        public string FUserCreate { get; set; }
        public string FUserApprove { get; set; }
        public Nullable<System.DateTime> FApproveTime { get; set; }
        public string FStatus { get; set; }
        public string TenTrangThai { get; set; }
        public Nullable<int> FIndex { get; set; }
        public Nullable<bool> FInUse { get; set; }
        public string FBranchCode { get; set; }
        public string FLanguage { get; set; }
        public string SearchKey { get; set; }
        public string MaDoanhNghiep { get; set; }
        public string TenDoanhNghiep { get; set; }
        public string TenSanPham_VI { get; set; }
        public string TenSanPham_EN { get; set; }
        public string CongNghe_VI { get; set; }
        public string CongNghe_EN { get; set; }
        public string UngDung_VI { get; set; }
        public string UngDung_EN { get; set; }
        public string AnhDaiDien { get; set; }
        public string NangSuat { get; set; }
        public string SoLuongDH { get; set; }
        public string DoChinhXac { get; set; }
        public string DonViTinh { get; set; }
        public string TieuChuan { get; set; }
        public string SanLuong { get; set; }
        public string NangLuc { get; set; }
        public string DaDuyet { get; set; }
        public string LyDo { get; set; }
        public string TyTrongNoiDia { get; set; }
        public string TyTrongXuatKhau { get; set; }
        public string NganhCung { get; set; }
    }
    public class DoanhNghiep_KhachHangModel
    {
        public int Id { get; set; }
        public string FCode { get; set; }
        public string FName { get; set; }
        public string FDescription { get; set; }
        public Nullable<System.DateTime> FCreateTime { get; set; }
        public Nullable<System.DateTime> FUpdateTime { get; set; }
        public string FUserCreate { get; set; }
        public string FUserApprove { get; set; }
        public Nullable<System.DateTime> FApproveTime { get; set; }
        public string FStatus { get; set; }
        public string TenTrangThai { get; set; }
        public Nullable<int> FIndex { get; set; }
        public Nullable<bool> FInUse { get; set; }
        public string FBranchCode { get; set; }
        public string FLanguage { get; set; }
        public string SearchKey { get; set; }
        public string MaDoanhNghiep { get; set; }
        public string TenDoanhNghiep { get; set; }
        public string TenKH_VI { get; set; }
        public string TenKH_EN { get; set; }
        public string SanPham_VI { get; set; }
        public string SanPham_EN { get; set; }
        public string DoanhThu { get; set; }
        public string DaDuyet { get; set; }
        public string LyDo { get; set; }
    }
    public class DoanhNghiep_XuatKhauModel
    {
        public int Id { get; set; }
        public string FCode { get; set; }
        public string FName { get; set; }
        public string FDescription { get; set; }
        public Nullable<System.DateTime> FCreateTime { get; set; }
        public Nullable<System.DateTime> FUpdateTime { get; set; }
        public string FUserCreate { get; set; }
        public string FUserApprove { get; set; }
        public Nullable<System.DateTime> FApproveTime { get; set; }
        public string FStatus { get; set; }
        public string TenTrangThai { get; set; }
        public Nullable<int> FIndex { get; set; }
        public Nullable<bool> FInUse { get; set; }
        public string FBranchCode { get; set; }
        public string FLanguage { get; set; }
        public string SearchKey { get; set; }
        public string MaDoanhNghiep { get; set; }
        public string TenDoanhNghiep { get; set; }
        public string ThiTruong_VI { get; set; }
        public string ThiTruong_EN { get; set; }
        public string SanPham_VI { get; set; }
        public string SanPham_EN { get; set; }
        public string CangXuat_VI { get; set; }
        public string CangXuat_EN { get; set; }
        public string DoanhThu { get; set; }
        public string DaDuyet { get; set; }
        public string LyDo { get; set; }
    }
    public class DoanhNghiep_NhapKhauModel
    {
        public long Id { get; set; }
        public string FCode { get; set; }
        public string FName { get; set; }
        public string FDescription { get; set; }
        public Nullable<System.DateTime> FCreateTime { get; set; }
        public Nullable<System.DateTime> FUpdateTime { get; set; }
        public string FUserCreate { get; set; }
        public string FUserApprove { get; set; }
        public Nullable<System.DateTime> FApproveTime { get; set; }
        public string FStatus { get; set; }
        public string TenTrangThai { get; set; }
        public Nullable<int> FIndex { get; set; }
        public Nullable<bool> FInUse { get; set; }
        public string FBranchCode { get; set; }
        public string FLanguage { get; set; }
        public string SearchKey { get; set; }
        public string MaDoanhNghiep { get; set; }
        public string TenDoanhNghiep { get; set; }
        public string NuocNhap_VI { get; set; }
        public string NuocNhap_EN { get; set; }
        public string SanPham_VI { get; set; }
        public string SanPham_EN { get; set; }
        public string CangNhap_VI { get; set; }
        public string CangNhap_EN { get; set; }
        public string DoanhThu { get; set; }
        public string DaDuyet { get; set; }
        public string LyDo { get; set; }
    }
    public class DoanhNghiep_NhaXuongModel
    {
        public int Id { get; set; }
        public string FCode { get; set; }
        public string FName { get; set; }
        public string FDescription { get; set; }
        public Nullable<System.DateTime> FCreateTime { get; set; }
        public Nullable<System.DateTime> FUpdateTime { get; set; }
        public string FUserCreate { get; set; }
        public string FUserApprove { get; set; }
        public Nullable<System.DateTime> FApproveTime { get; set; }
        public string FStatus { get; set; }
        public string TenTrangThai { get; set; }
        public Nullable<int> FIndex { get; set; }
        public Nullable<bool> FInUse { get; set; }
        public string FBranchCode { get; set; }
        public string FLanguage { get; set; }
        public string SearchKey { get; set; }
        public string MaDoanhNghiep { get; set; }
        public string TenDoanhNghiep { get; set; }
        public string TenNhaXuong_VI { get; set; }
        public string TenNhaXuong_EN { get; set; }
        public string DiaChi_VI { get; set; }
        public string DiaChi_EN { get; set; }
        public string SoDienThoai { get; set; }
        public string SoFax { get; set; }
        public string DienTich { get; set; }
        public string DaDuyet { get; set; }
        public string LyDo { get; set; }
    }
    public class DoanhNghiep_ThietBiModel
    {
        public int Id { get; set; }
        public string FCode { get; set; }
        public string FName { get; set; }
        public string FDescription { get; set; }
        public Nullable<System.DateTime> FCreateTime { get; set; }
        public Nullable<System.DateTime> FUpdateTime { get; set; }
        public string FUserCreate { get; set; }
        public string FUserApprove { get; set; }
        public Nullable<System.DateTime> FApproveTime { get; set; }
        public string FStatus { get; set; }
        public string TenTrangThai { get; set; }
        public Nullable<int> FIndex { get; set; }
        public Nullable<bool> FInUse { get; set; }
        public string FBranchCode { get; set; }
        public string FLanguage { get; set; }
        public string SearchKey { get; set; }
        public string MaDoanhNghiep { get; set; }
        public string TenDoanhNghiep { get; set; }
        public string TenThietBi_VI { get; set; }
        public string TenThietBi_EN { get; set; }
        public string ThongSo_VI { get; set; }
        public string ThongSo_EN { get; set; }
        public Nullable<int> SoLuong { get; set; }
        public string NamSX { get; set; }
        public string NuocSX_VI { get; set; }
        public string NuocSX_EN { get; set; }
        public string HangSX_VI { get; set; }
        public string HangSX_EN { get; set; }
        public string DaDuyet { get; set; }
        public string LyDo { get; set; }
    }
    public class DoanhNghiep_LienHeModel
    {
        public int Id { get; set; }
        public string FCode { get; set; }
        public string FName { get; set; }
        public string FDescription { get; set; }
        public Nullable<System.DateTime> FCreateTime { get; set; }
        public Nullable<System.DateTime> FUpdateTime { get; set; }
        public string FUserCreate { get; set; }
        public string FUserApprove { get; set; }
        public Nullable<System.DateTime> FApproveTime { get; set; }
        public string FStatus { get; set; }
        public string TenTrangThai { get; set; }
        public Nullable<int> FIndex { get; set; }
        public Nullable<bool> FInUse { get; set; }
        public string FBranchCode { get; set; }
        public string FLanguage { get; set; }
        public string SearchKey { get; set; }
        public string MaDoanhNghiep { get; set; }
        public string TenDoanhNghiep { get; set; }
        public string NguoiLienHe { get; set; }
        public string Email { get; set; }
        public string SoDienThoai { get; set; }
        public string ChucVu_VI { get; set; }
        public string ChucVu_EN { get; set; }
        public string DaDuyet { get; set; }
        public string LyDo { get; set; }
    }

    public class DoanhNghiepFilterModel : FilterModel
    {
        public string FCode { get; set; }
        public string TrangThai { get; set; }
        public string LHDN { get; set; }
        public string CCL { get; set; }
        public string CCQL { get; set; }
    }
    public class PLGCFilterModel : FilterModel
    {
        public string LinhVuc { get; set; }
    }
    public class TTDNFilterModel : FilterModel
    {
        public string FCode { get; set; }
        public string MaDN { get; set; }//Tên đăng nhập của doanh nghiệp
    }
    
}