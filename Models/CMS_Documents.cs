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
    
    public partial class CMS_Documents
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
        public string FLanguage { get; set; }
        public string Content { get; set; }
        public Nullable<System.DateTime> IssuedDate { get; set; }
        public Nullable<System.DateTime> EffectiveDate { get; set; }
        public string DocumentType { get; set; }
        public string LinhVuc { get; set; }
        public string DraftBy { get; set; }
        public string SignBy { get; set; }
        public string PromulgatedBy { get; set; }
        public string Promulgated { get; set; }
        public string FieldType { get; set; }
        public string DocumentFile { get; set; }
        public string FileAttachment { get; set; }
        public string Tick { get; set; }
        public string Read { get; set; }
    }
}
