namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BoDanhGiaTinh")]
    public partial class BoDanhGiaTinh
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
        public string TongSoCBCCVC { get; set; }

        [StringLength(10)]
        public string TongSoMayTinh { get; set; }

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
