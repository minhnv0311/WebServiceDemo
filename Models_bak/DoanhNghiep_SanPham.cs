namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class DoanhNghiep_SanPham
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

        [StringLength(50)]
        public string MaDoanhNghiep { get; set; }

        [StringLength(500)]
        public string MaSanPham { get; set; }

        [StringLength(400)]
        public string TenSanPham_VI { get; set; }

        [StringLength(400)]
        public string TenSanPham_EN { get; set; }

        [StringLength(400)]
        public string CongNghe_VI { get; set; }

        [StringLength(400)]
        public string CongNghe_EN { get; set; }

        [StringLength(400)]
        public string UngDung_VI { get; set; }

        [StringLength(400)]
        public string UngDung_EN { get; set; }

        [StringLength(400)]
        public string AnhDaiDien { get; set; }

        [StringLength(400)]
        public string NangSuat { get; set; }

        [StringLength(400)]
        public string SoLuongDH { get; set; }

        [StringLength(400)]
        public string DoChinhXac { get; set; }

        [StringLength(50)]
        public string DonViTinh { get; set; }

        [StringLength(50)]
        public string TieuChuan { get; set; }

        [StringLength(400)]
        public string SanLuong { get; set; }

        [StringLength(400)]
        public string NangLuc { get; set; }

        [StringLength(50)]
        public string DaDuyet { get; set; }

        [StringLength(400)]
        public string LyDo { get; set; }

        [StringLength(100)]
        public string TyTrongNoiDia { get; set; }

        [StringLength(100)]
        public string TyTrongXuatKhau { get; set; }

        [StringLength(500)]
        public string NganhCung { get; set; }

        [StringLength(500)]
        public string Type { get; set; }
    }
}
