//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApiCore.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class CMS_DocumentInfo
    {
        public long Id { get; set; }
        public string FCode { get; set; }
        public string FName { get; set; }
        public string FDescription { get; set; }
        public Nullable<System.DateTime> FCreateTime { get; set; }
        public Nullable<System.DateTime> FUpdateTime { get; set; }
        public string FUserCreate { get; set; }
        public string FUserApprove { get; set; }
        public Nullable<System.DateTime> FApproveTime { get; set; }
        public string FStatus { get; set; }
        public Nullable<int> FIndex { get; set; }
        public Nullable<int> FLevel { get; set; }
        public Nullable<bool> FInUse { get; set; }
        public string FBranchCode { get; set; }
        public string FUserUpdate { get; set; }
        public string FLanguage { get; set; }
        public string FileSize { get; set; }
        public string ContentType { get; set; }
        public string Path { get; set; }
        public string DocumentCode { get; set; }
    }
}
