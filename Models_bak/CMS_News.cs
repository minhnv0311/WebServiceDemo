namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CMS_News
    {
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FCode { get; set; }

        [StringLength(2000)]
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
        public string FUserUpdate { get; set; }

        [StringLength(50)]
        public string FLanguage { get; set; }

        [StringLength(50)]
        public string Menu { get; set; }

        [StringLength(500)]
        public string Image { get; set; }

        public bool? IsShowSortContent { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [StringLength(4000)]
        public string SortContent { get; set; }

        public string Content { get; set; }

        public bool? IsHotNews { get; set; }

        public bool? IsTopNews { get; set; }

        public bool? IsImportantNews { get; set; }

        public bool? IsLiveNews { get; set; }

        [StringLength(200)]
        public string NguoiGui { get; set; }

        public string TraLoi { get; set; }
    }
}
