namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Donvi")]
    public partial class Donvi
    {
        public long Id { get; set; }

        [StringLength(50)]
        public string FCode { get; set; }

        public string FName { get; set; }

        [StringLength(50)]
        public string FType { get; set; }

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
        public string FParent { get; set; }

        [StringLength(20)]
        public string FUserUpdate { get; set; }

        public bool? IsDV { get; set; }

        [StringLength(50)]
        public string Provin { get; set; }

        [StringLength(50)]
        public string Disctrict { get; set; }

        [StringLength(50)]
        public string Ward { get; set; }

        public string Address { get; set; }

        public int? FLevel { get; set; }

        public string SearchKey { get; set; }

        public string FullAddress { get; set; }

        [StringLength(4000)]
        public string SitePath { get; set; }

        public bool? IsDefault { get; set; }
    }
}
