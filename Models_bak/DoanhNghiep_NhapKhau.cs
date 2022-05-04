namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class DoanhNghiep_NhapKhau
    {
        public long Id { get; set; }

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

        [StringLength(400)]
        public string NuocNhap_VI { get; set; }

        [StringLength(400)]
        public string NuocNhap_EN { get; set; }

        [StringLength(400)]
        public string SanPham_VI { get; set; }

        [StringLength(400)]
        public string SanPham_EN { get; set; }

        [StringLength(400)]
        public string CangNhap_VI { get; set; }

        [StringLength(400)]
        public string CangNhap_EN { get; set; }

        [StringLength(50)]
        public string DoanhThu { get; set; }

        [StringLength(50)]
        public string DaDuyet { get; set; }

        [StringLength(400)]
        public string LyDo { get; set; }
    }
}
