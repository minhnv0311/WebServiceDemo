namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class LICH_SU_GIA
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string FCode { get; set; }

        [StringLength(4000)]
        public string FName { get; set; }

        public string FDescription { get; set; }

        public bool? FInUse { get; set; }

        [StringLength(100)]
        public string FUserCreate { get; set; }

        [StringLength(100)]
        public string FUserEdit { get; set; }

        [StringLength(100)]
        public string FUserUpdate { get; set; }

        [StringLength(100)]
        public string FUserDelete { get; set; }

        public bool? FIsDelete { get; set; }

        public bool? FIsEdit { get; set; }

        public bool? FIsUpdate { get; set; }

        public DateTime? FViewTime { get; set; }

        public DateTime? FEditTime { get; set; }

        public DateTime? FCreateTime { get; set; }

        public DateTime? FUpdateTime { get; set; }

        public DateTime? FDeleteTime { get; set; }

        [StringLength(100)]
        public string FLanguage { get; set; }

        public int? FIndex { get; set; }

        public int? FLevel { get; set; }

        public bool? IsUnit { get; set; }

        [StringLength(100)]
        public string FBranchCode { get; set; }

        [StringLength(50)]
        public string MaChungKhoan { get; set; }

        public DateTime? Date { get; set; }

        public long? t_ThoiGian { get; set; }

        public double? o_GiaMoCua { get; set; }

        public double? h_GiaCaoNhat { get; set; }

        public double? l_GiaThapNhat { get; set; }

        public double? c_c { get; set; }

        public double? v_Volumn { get; set; }

        [StringLength(100)]
        public string s_s { get; set; }
    }
}
