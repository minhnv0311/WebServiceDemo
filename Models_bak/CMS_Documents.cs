namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class CMS_Documents
    {
        public long Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FCode { get; set; }

        [StringLength(2000)]
        public string FName { get; set; }

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

        [StringLength(20)]
        public string FLanguage { get; set; }

        public string Content { get; set; }

        public DateTime? IssuedDate { get; set; }

        public DateTime? EffectiveDate { get; set; }

        [StringLength(4000)]
        public string DocumentType { get; set; }

        [StringLength(4000)]
        public string LinhVuc { get; set; }

        [StringLength(200)]
        public string DraftBy { get; set; }

        [StringLength(200)]
        public string SignBy { get; set; }

        [StringLength(200)]
        public string PromulgatedBy { get; set; }

        [StringLength(200)]
        public string Promulgated { get; set; }

        [StringLength(200)]
        public string FieldType { get; set; }

        public string DocumentFile { get; set; }

        public string FileAttachment { get; set; }

        public string Tick { get; set; }

        public string Read { get; set; }
    }
}
