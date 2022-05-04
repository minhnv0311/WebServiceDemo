namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DMNgonNgu")]
    public partial class DMNgonNgu
    {
        public int Id { get; set; }

        public string FCode { get; set; }

        [StringLength(20)]
        public string FLanguage { get; set; }

        public string FName { get; set; }

        public string FDescription { get; set; }

        public bool? FInUse { get; set; }

        public string FUserCreate { get; set; }

        public string FUserEdit { get; set; }

        public string FUserUpdate { get; set; }

        public string FUserDelete { get; set; }

        public bool? FIsDelete { get; set; }

        public bool? FIsEdit { get; set; }

        public bool? FIsUpdate { get; set; }

        public DateTime? FViewTime { get; set; }

        public DateTime? FEditTime { get; set; }

        public DateTime? FCreateTime { get; set; }

        public DateTime? FUpdateTime { get; set; }

        public DateTime? FDeleteTime { get; set; }

        public int? FIndex { get; set; }

        public int? FLevel { get; set; }

        public string FParent { get; set; }

        public string SearchKey { get; set; }

        public string FBranchCode { get; set; }
    }
}
