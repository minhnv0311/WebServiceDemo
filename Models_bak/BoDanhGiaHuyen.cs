namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BoDanhGiaHuyen")]
    public partial class BoDanhGiaHuyen
    {
        public long Id { get; set; }

        [StringLength(100)]
        public string SoQD { get; set; }

        [StringLength(50)]
        public string NgayQd { get; set; }

        public long? DonViId { get; set; }

        [StringLength(10)]
        public string TongSoDVTrucThuoc { get; set; }

        [StringLength(10)]
        public string TongSoUBNDXa { get; set; }

        [StringLength(10)]
        public string TongSoCBCCVCHuyen { get; set; }

        [StringLength(10)]
        public string TongSoCBCCVCXa { get; set; }

        [StringLength(10)]
        public string TongSoMayTinhHuyen { get; set; }

        [StringLength(10)]
        public string TongSoMayTinhXa { get; set; }

        public int? TongDiem { get; set; }

        public string JsonDiem { get; set; }

        public DateTime? FCreateTime { get; set; }

        public DateTime? FUpdateTime { get; set; }

        [StringLength(20)]
        public string FUserCreate { get; set; }

        [StringLength(20)]
        public string FBranchCode { get; set; }

        [StringLength(20)]
        public string FUserUpdate { get; set; }

        public string SearchKey { get; set; }
    }
}
