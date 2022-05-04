namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("UserProfile")]
    public partial class UserProfile
    {
        public string Id { get; set; }

        [StringLength(50)]
        public string OrgCode { get; set; }

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

        [StringLength(50)]
        public string FBranchCode { get; set; }

        [StringLength(256)]
        public string Email { get; set; }

        [StringLength(256)]
        public string UserName { get; set; }

        [StringLength(50)]
        public string Mobile { get; set; }

        [StringLength(50)]
        public string Department { get; set; }

        [StringLength(200)]
        public string FullName { get; set; }

        [StringLength(300)]
        public string Address { get; set; }

        [StringLength(50)]
        public string Provin { get; set; }

        [StringLength(50)]
        public string District { get; set; }

        [StringLength(50)]
        public string Ward { get; set; }

        [Column(TypeName = "date")]
        public DateTime? Birthday { get; set; }

        [StringLength(10)]
        public string Gender { get; set; }

        [StringLength(50)]
        public string Position { get; set; }

        [StringLength(50)]
        public string FUserUpdate { get; set; }

        [StringLength(500)]
        public string Avatar { get; set; }

        [StringLength(150)]
        public string DonVi { get; set; }

        public string SearchKey { get; set; }
    }
}
