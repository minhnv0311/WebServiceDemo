namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class QL_FileDinhKem
    {
        public long Id { get; set; }

        public string DBName { get; set; }

        public string KeyFCode { get; set; }

        public string FileName { get; set; }

        public int? FileSize { get; set; }

        public string FilePath { get; set; }

        public bool? Main { get; set; }

        public bool? IsNew { get; set; }
    }
}
