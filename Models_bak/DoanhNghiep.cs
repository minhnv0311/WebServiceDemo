namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DoanhNghiep")]
    public partial class DoanhNghiep
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FCode { get; set; }

        [StringLength(200)]
        public string FName { get; set; }

        [StringLength(500)]
        public string FDescription { get; set; }

        public DateTime? FCreateTime { get; set; }

        public DateTime? FUpdateTime { get; set; }

        [StringLength(20)]
        public string FUserCreate { get; set; }

        [StringLength(20)]
        public string FUserApprove { get; set; }

        public DateTime? FApproveTime { get; set; }

        [StringLength(20)]
        public string FStatus { get; set; }

        public int? FIndex { get; set; }

        public bool? FInUse { get; set; }

        [StringLength(20)]
        public string FBranchCode { get; set; }

        [StringLength(50)]
        public string FLanguage { get; set; }

        public string SearchKey { get; set; }

        public string TenCongTy_VI { get; set; }

        public string TenCongTy_EN { get; set; }

        public string TenVietTat { get; set; }

        public string TenThuongHieu { get; set; }

        public int? SoLuongLaoDong { get; set; }

        [StringLength(100)]
        public string SoLuongLDBaoHiem { get; set; }

        [StringLength(50)]
        public string NamThanhLap { get; set; }

        public string LoaiHinhDN { get; set; }

        [StringLength(100)]
        public string VonDauTu { get; set; }

        [StringLength(100)]
        public string VonNhaNuoc { get; set; }

        [StringLength(100)]
        public string VonTuNhan { get; set; }

        public string ChuanChatLuong { get; set; }

        public string CongCuQuanLy { get; set; }

        public string Logo { get; set; }

        [StringLength(500)]
        public string DoanhThu { get; set; }

        [StringLength(50)]
        public string PhanTramXuatKhau { get; set; }

        [StringLength(50)]
        public string NamDoanhThu { get; set; }

        public string DiaChi_VI { get; set; }

        public string DiaChi_EN { get; set; }

        public string DiaChiCSSX_VI { get; set; }

        public string DiaChiCSSX_EN { get; set; }

        [StringLength(50)]
        public string SoDienThoai { get; set; }

        public string Email { get; set; }

        [StringLength(200)]
        public string Fax { get; set; }

        [StringLength(400)]
        public string Website { get; set; }

        [StringLength(50)]
        public string Huyen { get; set; }

        [StringLength(256)]
        public string TenDangNhap { get; set; }

        public string LyDo { get; set; }

        public string LVSXChinh { get; set; }

        public string PhanLoaiGiaCong { get; set; }

        [StringLength(50)]
        public string FUserUpdate { get; set; }

        [StringLength(50)]
        public string TongTaiSan { get; set; }

        [StringLength(50)]
        public string TaiSanDaiHan { get; set; }

        [StringLength(50)]
        public string TaiSanNganHan { get; set; }

        [StringLength(50)]
        public string LoiNhuanTruocThue { get; set; }

        [StringLength(50)]
        public string LoiNhuanSauThue { get; set; }

        [StringLength(500)]
        public string LuongBinhQuanLD { get; set; }

        [StringLength(500)]
        public string SoLuongLDDN { get; set; }

        public string LinhVucSXC { get; set; }

        public string NguoiDaiDienName { get; set; }

        public string NguoiDaiDienCV { get; set; }

        [StringLength(500)]
        public string NguoiDaiDienSDT { get; set; }
    }
}
