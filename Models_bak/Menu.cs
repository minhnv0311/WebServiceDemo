namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Menu")]
    public partial class Menu
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

        public int? FLevel { get; set; }

        public bool? FInUse { get; set; }

        [StringLength(20)]
        public string FBranchCode { get; set; }

        [StringLength(50)]
        public string MainMenu { get; set; }

        [StringLength(50)]
        public string ParentMenu { get; set; }

        [StringLength(200)]
        public string ControllerName { get; set; }

        [StringLength(500)]
        public string TemplateUrl { get; set; }

        [StringLength(50)]
        public string Url { get; set; }

        [StringLength(50)]
        public string Icon { get; set; }

        [StringLength(200)]
        public string Permission { get; set; }

        [StringLength(50)]
        public string FUserUpdate { get; set; }
    }
}
