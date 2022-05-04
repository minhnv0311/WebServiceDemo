using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using WebApiCore.Models;

namespace WebApiCore.Commons
{
    public class PropertyCopier<TParent, TChild> where TParent : class
                                          where TChild : class
    {
        public static void Copy(TParent parent, TChild child)
        {
            var parentProperties = parent.GetType().GetProperties();
            var childProperties = child.GetType().GetProperties();

            foreach (var parentProperty in parentProperties)
            {
                foreach (var childProperty in childProperties)
                {
                    if (parentProperty.Name == childProperty.Name && parentProperty.PropertyType == childProperty.PropertyType)
                    {
                        childProperty.SetValue(child, parentProperty.GetValue(parent));
                        break;
                    }
                }
            }
        }
    }
    public class Common
    { 
        public static string GetCurrentCoCode(WebApiDataEntities db, string user)
        {
            var oUser = (from u in db.UserProfiles where u.UserName == user select u).FirstOrDefault();
            return oUser.Department;
        }
        public static string GetCurrentCompanyName(WebApiDataEntities db, string user)
        {
            var oUser = (from u in db.UserProfiles where u.UserName == user select u).FirstOrDefault();
            ///var oCom = (from com in db.Companies where com.FCode == oUser.FBranchCode select com).FirstOrDefault();
           // return oCom.FCode;
            return oUser.DonVi;
        }

        public static Company GetCurrentCompany(WebApiDataEntities db, string user)
        {
            var oUser = (from u in db.UserProfiles where u.UserName == user select u).FirstOrDefault();
            var oCom = (from com in db.Companies where com.FCode == oUser.FBranchCode select com).FirstOrDefault();
            return oCom;
        }
        public static string ReplaceUnicode(object input)
        {
            string strInput = "";
            if (input != null)
            {
                strInput = input.ToString();
                string[] VietNamChar = new string[] { "aAeEoOuUiIdDyY", "áàạảãâấầậẩẫăắằặẳẵ", "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ", "éèẹẻẽêếềệểễ", "ÉÈẸẺẼÊẾỀỆỂỄ", "óòọỏõôốồộổỗơớờợởỡ", "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ", "úùụủũưứừựửữ", "ÚÙỤỦŨƯỨỪỰỬỮ", "íìịỉĩ", "ÍÌỊỈĨ", "đ", "Đ", "ýỳỵỷỹ", "ÝỲỴỶỸ" };
                for (int i = 1; i <= VietNamChar.Length - 1; i++)
                {
                    for (int j = 0; j <= VietNamChar[i].Length - 1; j++)
                    {
                        strInput = strInput.Replace(VietNamChar[i][j], VietNamChar[0][i - 1]);
                    }
                }
            }

            return strInput;
        }
        //public static string GetNameKH(WebApiDataEntities db, string ThoiGianThucHien)
        //{
        //    string strName = "";
        //    if (!string.IsNullOrEmpty(ThoiGianThucHien))
        //    {
        //        ThoiGianThucHien = ThoiGianThucHien.Replace("[\"", "").Replace("\"]", "").Replace("\",\"", "#"); ;
        //        string[] arrListStr = ThoiGianThucHien.Split('#');
        //        int i = 0;
        //        foreach (string s in arrListStr)
        //        {
        //            i++;
        //            var dt = db.KeHoachDuKiens.Where(t => t.FCode == s).FirstOrDefault();
        //            if (dt != null)
        //            {
        //                strName = strName + dt.FName;
        //                if (arrListStr.Length > 1 && i < arrListStr.Length)
        //                {
        //                    strName = strName + " ; ";
        //                }
        //            }
        //        }
        //    }
        //    return strName;
        //}

        public static string GetStatusName(string status)
        {
            string Statusname = "";

            switch (status)
            {
                //case Constants.SoanThao:
                //    Statusname = "Soạn thảo";
                //    break;
                //case Constants.GuiDuyet:
                //    Statusname = "Gửi duyệt";
                //    break;
                //case Constants.KhongDuyet:
                //    Statusname = "Loại";
                //    break;
                //case Constants.Duyet:
                //    Statusname = "Duyệt";
                //    break;
                //case Constants.ThucHien:
                //    Statusname = "Đang thực hiện";
                //    break;
                //case Constants.KetThuc:
                //    Statusname = "Kết thúc";
                //    break;
                default:
                    break;
            }
            return Statusname;
        }

        public static string GetNameDonVi(WebApiDataEntities db, string ListMaDV)
        {
            string ListNameDV = "";
            if (!string.IsNullOrEmpty(ListMaDV))
            {
                ListMaDV = ListMaDV.Replace("[\"", "").Replace("\"]", "").Replace("\",\"", "#"); ;
                string[] arrListStr = ListMaDV.Split('#');
                int i = 0;
                foreach (string s in arrListStr)
                {
                    i++;
                    var org = db.Organizations.Where(t => t.FCode == s).FirstOrDefault();
                    if (org != null)
                    {
                        ListNameDV = ListNameDV + org.FName;
                        if (arrListStr.Length > 1 && i < arrListStr.Length)
                        {
                            ListNameDV = ListNameDV + " ; ";
                        }
                    }

                }
            }
            return ListNameDV;
        }
        //public static List<ListCoinsideInspection> Check_coincide(WebApiDataEntities db, string FInSpec, string FObjectInspect, int? Year)
        //{
        //    List<ListCoinsideInspection> ListCoinside = new List<ListCoinsideInspection>();
        //    int year = 0;
        //    try { year = int.Parse(Year.ToString()); } catch { }
        //    if (year > 0)
        //    {

        //        var ListInpection = (from ins in db.Inspections
        //                             join objIns in db.ObjectByInspections on ins.FCode equals objIns.F_Inspection
        //                             where ins.FInUse == true && objIns.FInUse == true
        //                             //&& ins.FCode != FInSpec 
        //                             //&& objIns.F_Inspection != FInSpec
        //                             //&& ins.F_Plan != null
        //                             && (
        //                                    (objIns.F_Obj_Inspection == FObjectInspect)
        //                                )
        //                             && ins.Year == year
        //                             select new { ins, CheckCT = objIns.CheckCT , Lv= objIns.LinhVuc }).ToList();

        //        foreach (var item in ListInpection)
        //        {
        //            ListCoinsideInspection Coinside = new ListCoinsideInspection();
        //            Coinside.CoinsideInspection = item.ins;
        //            Coinside.LinhVuc = item.Lv;
        //            Coinside.CheckCT = item.CheckCT != null ? item.CheckCT:false;
        //            var org = (from or in db.Organizations where or.FInUse == true && or.FCode == item.ins.FBranchCode select or).FirstOrDefault();
        //            Coinside.Organization = org;
        //            ListCoinside.Add(Coinside);
        //        }

        //        var ListInpectionBS = (from ins in db.InspectionBS
        //                             join objIns in db.ObjectByInspectionBS on ins.FCode equals objIns.F_Inspection
        //                             where ins.FInUse == true && objIns.FInUse == true
        //                             //&& ins.FCode != FInSpec 
        //                             //&& objIns.F_Inspection != FInSpec
        //                             //&& ins.F_Plan != null
        //                             && (
        //                                    (objIns.F_Obj_Inspection == FObjectInspect)
        //                                )
        //                             && ins.Year == year
        //                             select new { ins, CheckCT = objIns.CheckCT , Lv = objIns.LinhVuc }).ToList();

        //        foreach (var item in ListInpectionBS)
        //        {
        //            ListCoinsideInspection Coinside = new ListCoinsideInspection();
        //            Coinside.CoinsideInspectionBS = item.ins;
        //            Coinside.LinhVuc = item.Lv;
        //            Coinside.CheckCT = item.CheckCT != null ? item.CheckCT : false;
        //            var org = (from or in db.Organizations where or.FInUse == true && or.FCode == item.ins.FBranchCode select or).FirstOrDefault();
        //            Coinside.Organization = org;
        //            ListCoinside.Add(Coinside);
        //        }
        //    }
        //    return ListCoinside;
        //}

        //public static List<ListObjectByInspect> GetListAllObjectInspect(WebApiDataEntities db, string F_inspection, string year)
        //{
        //    List<ListObjectByInspect> listObj = new List<ListObjectByInspect>();
        //    int Year = 0;
        //    if (!string.IsNullOrEmpty(F_inspection) && !string.IsNullOrEmpty(year))
        //    {
               
        //        try { Year = int.Parse(year.Trim()); } catch { }
        //        var list_Obj = (from objInspec in db.ObjectByInspections
        //                        where objInspec.F_Inspection == F_inspection && objInspec.FInUse == true
        //                        select objInspec).ToList();
        //        foreach (var itemobj in list_Obj)
        //        {
        //            ListObjectByInspect objInSpec = new ListObjectByInspect();
        //            if (itemobj.Type == Commons.Constants.COM)
        //            {
        //                objInSpec.TypeName = "Doanh nghiệp, tổ chức";
        //            }
        //            else if (itemobj.Type == Commons.Constants.CN)
        //            {
        //                objInSpec.TypeName = "Cá nhân";
        //                objInSpec.TenDonVi = itemobj.DonVi;
        //            }
        //            else if (itemobj.Type == Commons.Constants.ORG)
        //            {
        //                objInSpec.TypeName = "Cơ quan nhà nước";
        //            }
        //            else if (itemobj.Type == Commons.Constants.PRO)
        //            {
        //                objInSpec.TypeName = "Dự án";
        //            }
        //            objInSpec.objectByInspect = itemobj;
        //            objInSpec.ListcoinsideInspection = Check_coincide(db, F_inspection, itemobj.F_Obj_Inspection, Year);
        //            listObj.Add(objInSpec);
        //        }

        //        var list_ObjBS = (from objInspec in db.ObjectByInspectionBS
        //                        where objInspec.F_Inspection == F_inspection && objInspec.FInUse == true
        //                        select objInspec).ToList();
        //        foreach (var itemobj in list_ObjBS)
        //        {
        //            ListObjectByInspect objInSpec = new ListObjectByInspect();
        //            if (itemobj.Type == Commons.Constants.COM)
        //            {
        //                objInSpec.TypeName = "Doanh nghiệp, tổ chức";
        //            }
        //            else if (itemobj.Type == Commons.Constants.CN)
        //            {
        //                objInSpec.TypeName = "Cá nhân";
        //                objInSpec.TenDonVi = itemobj.DonVi;
        //            }
        //            else if (itemobj.Type == Commons.Constants.ORG)
        //            {
        //                objInSpec.TypeName = "Cơ quan nhà nước";
        //            }
        //            else if (itemobj.Type == Commons.Constants.PRO)
        //            {
        //                objInSpec.TypeName = "Dự án";
        //            }
        //            objInSpec.objectByInspectBS = itemobj;
        //            objInSpec.ListcoinsideInspection = Check_coincide(db, F_inspection, itemobj.F_Obj_Inspection, Year);
        //            listObj.Add(objInSpec);
        //        }
        //    }
        //    return listObj;
        //}
        //public static List<ListObjectInspect> GetListObjectInspect(WebApiDataEntities db, string F_inspection, string year)
        //{
        //    List<ListObjectInspect> listObj = new List<ListObjectInspect>();
        //    int Year = 0;
        //    if (!string.IsNullOrEmpty(F_inspection) && !string.IsNullOrEmpty(year))
        //    {
        //        try { Year = int.Parse(year.Trim()); } catch { }
        //        var list_Obj = (from obj in db.ObjectInspects
        //                        join objInspec in db.ObjectByInspections on obj.FCode equals objInspec.F_Obj_Inspection
        //                        where objInspec.F_Inspection == F_inspection && objInspec.FInUse == true
        //                        select obj).ToList();
        //        foreach (var itemobj in list_Obj)
        //        {
        //            ListObjectInspect objInSpec = new ListObjectInspect();
        //            objInSpec.objectInspect = itemobj;
        //            objInSpec.ListcoinsideInspection = Check_coincide(db, F_inspection, itemobj.FCode, Year);
        //            listObj.Add(objInSpec);
        //        }
        //    }
        //    return listObj;
        //}
        //public static List<ListProjectInspect> GetListProjectInspect(WebApiDataEntities db, string F_inspection, string year)
        //{
        //    List<ListProjectInspect> listObj = new List<ListProjectInspect>();
        //    int Year = 0;
        //    if (!string.IsNullOrEmpty(F_inspection) && !string.IsNullOrEmpty(year))
        //    {
        //        try { Year = int.Parse(year.Trim()); } catch { }
        //        var list_Obj = (from obj in db.ProjectInspects
        //                        join objInspec in db.ObjectByInspections on obj.FCode equals objInspec.F_Obj_Inspection
        //                        where objInspec.F_Inspection == F_inspection && objInspec.FInUse == true
        //                        select obj).ToList();
        //        foreach (var itemobj in list_Obj)
        //        {
        //            ListProjectInspect objInSpec = new ListProjectInspect();
        //            objInSpec.projectInspect = itemobj;
        //            objInSpec.ListcoinsideInspection = Check_coincide(db, F_inspection, itemobj.FCode, Year);
        //            listObj.Add(objInSpec);
        //        }
        //    }
        //    return listObj;
        //}
        //public static List<ListOrgInspect> GetListOrgInspect(WebApiDataEntities db, string F_inspection, string year)
        //{
        //    List<ListOrgInspect> listObj = new List<ListOrgInspect>();
        //    int Year = 0;
        //    if (!string.IsNullOrEmpty(F_inspection) && !string.IsNullOrEmpty(year))
        //    {
        //        try { Year = int.Parse(year.Trim()); } catch { }
        //        var list_Obj = (from obj in db.Organizations
        //                        join objInspec in db.ObjectByInspections on obj.FCode equals objInspec.F_Obj_Inspection
        //                        where objInspec.F_Inspection == F_inspection && objInspec.FInUse == true
        //                        select obj).ToList();
        //        foreach (var itemobj in list_Obj)
        //        {
        //            ListOrgInspect objInSpec = new ListOrgInspect();
        //            objInSpec.orgInspect = itemobj;
        //            objInSpec.ListcoinsideInspection = Check_coincide(db, F_inspection, itemobj.FCode, Year);
        //            listObj.Add(objInSpec);
        //        }
        //    }
        //    return listObj;
        //}

        public class PaingPropety
        {
            public int pageStart { get; set; }
            public int pageEnd { get; set; }
            public int totalCount { get; set; }
            public int totalPage { get; set; }
        }

     

        // Hàm ghi lỗi try catch ra file
        public static void WriteLogToTextFile(string Error)
        {
            string directoryPath = HttpContext.Current.Server.MapPath("~/Log_Error");
            if (!Directory.Exists(directoryPath))
                Directory.CreateDirectory(directoryPath);
            string FileName = string.Format("log_{0}.txt", System.DateTime.Now.ToString("yyyyMMdd"));
            string path = Path.Combine(HttpContext.Current.Server.MapPath("~/Log_Error"), FileName); ;// AppDomain.CurrentDomain.BaseDirectory + string.Format("\\Log_Error\\log_{0}.txt", System.DateTime.Now.ToString("yyyyMMdd"));
            if (!File.Exists(path))
            {
                StreamWriter sw = File.CreateText(path);
                sw.Close();
            }
            if (File.Exists(path))
            {
                using (StreamWriter sw = File.AppendText(path))
                {
                    sw.WriteLine(DateTime.Now.ToString() + ": " + Error);
                    sw.Close();
                }
            }
        }

        public static string AutoId(WebApiDataEntities db, string Code)
        {
            try
            {
                Code = Code.ToUpper();
                AutoID AutoId = db.AutoIDs.Where(x => x.FCode == Code).SingleOrDefault();
                if (AutoId == null)
                {
                    AutoId = new AutoID();
                    AutoId.FCode = Code;
                    AutoId.Counter = 1;
                    db.AutoIDs.Add(AutoId);
                }
                AutoId.FName = Code;
                for (int i = 0; i < 6 - AutoId.Counter.ToString().Length; i++)
                    AutoId.FName += 0;

                AutoId.FName += AutoId.Counter.ToString();
                AutoId.Counter += 1;
                db.SaveChanges();
                return AutoId.FName;
            }
            catch
            {
                return "";
            }
        }

        public static bool CheckSupperAdmin(WebApiDataEntities db, string user)
        {
            var oUser = (from u in db.Group_User
                         join i in db.UserProfiles on u.UserName equals i.UserName
                         where u.CodeGroup == Constants.SUPPERADMIN && u.UserName == user && u.FInUse == true
                         select u
                         ).FirstOrDefault();
            if (oUser != null)
                return true;
            else return false;
        }
        //public static void LogInspection(WebApiDataEntities db, string action, string text, string f_inspection)
        //{

        //    LogInspection log = new LogInspection();
        //    log.FCode = f_inspection;
        //    log.FName = action;
        //    log.FDescription = text;
        //    db.LogInspections.Add(log);
        //    db.SaveChanges();
        //}

        //public static string GetLeaderByInspection(WebApiDataEntities db, string f_ins)
        //{
        //    var dt = (from us_inspc in db.UserByInspections
        //              join us in db.UserProfiles on us_inspc.F_UserProfile equals us.UserName
        //              where us_inspc.F_Inspection == f_ins && us_inspc.Leader == true
        //              select us).FirstOrDefault();
        //    return "- " + dt.FullName +": "+ GetOrgName(dt.Department) + " - "+ GetOrgName(dt.DonVi) + ".";
        //}
        //public static string GetOrgName(string fcode)
        //{
        //    string name = "";
        //    WebApiDataEntities db = new WebApiDataEntities();
        //    var dt = db.Organizations.Where(t => t.FCode == fcode).FirstOrDefault();
        //    if (dt != null) name = dt.FName;
        //    return name;
        //}
        //public static ArrayList GetPTDByInspection(WebApiDataEntities db, string f_ins)
        //{
        //    ArrayList list = new ArrayList();
        //    var text = "";
        //    var dt = (from us_inspc in db.UserByInspections
        //              join us in db.UserProfiles on us_inspc.F_UserProfile equals us.UserName
        //              where us_inspc.F_Inspection == f_ins && us_inspc.F_ChucDanh == Constants.PhoTruongDoanTT
        //              select us).ToList();
        //    int i = 1;
        //    foreach (var item in dt)
        //    {
        //        if (item != null)
        //        {
        //            var pb = db.Organizations.Where(t => t.FCode == item.Department).FirstOrDefault();
        //            var dv = db.Organizations.Where(t => t.FCode == item.DonVi).FirstOrDefault();
        //            text = i + ". " + item.FullName + ": " + pb.FName + " - " + dv.FName + ".";
        //            list.Add(text);
        //            i++;
        //        }

        //    }
        //    return list;
        //}
        //public static ArrayList GetMemberByInspection(WebApiDataEntities db, string f_ins)
        //{
        //    ArrayList list = new ArrayList();
        //    var text = "";
        //    var dt = (from us_inspc in db.UserByInspections
        //              join us in db.UserProfiles on us_inspc.F_UserProfile equals us.UserName
        //              where us_inspc.F_Inspection == f_ins && us_inspc.F_ChucDanh == Constants.ThanhVien
        //              select us).ToList();
        //    int i = 1;
        //    foreach (var item in dt)
        //    {
        //        if (item != null)
        //        {
        //            var pb = db.Organizations.Where(t => t.FCode == item.Department).FirstOrDefault();
        //            var dv = db.Organizations.Where(t => t.FCode == item.DonVi).FirstOrDefault();
        //            text = i + ". " + item.FullName + ": " + pb.FName + " - " + dv.FName + ".";
        //            list.Add(text);
        //            i++;
        //        }

        //    }
        //    return list;
        //}
        //public static string getObjectName(WebApiDataEntities db, string FCode, string f_ins)
        //{
        //    string name = "";
        //    var obj = db.ObjectByInspections.Where(t => t.F_Inspection == f_ins && t.F_Obj_Inspection == FCode).FirstOrDefault();
        //    if (obj != null)
        //        name = obj.FName;
        //    return name;
        //}

        //public static string GetOrgReceived(WebApiDataEntities db, string OrgReceived)
        //{
        //    string strName = "";
        //    if (!string.IsNullOrEmpty(OrgReceived))
        //    {
        //        OrgReceived = OrgReceived.Replace("[\"", "").Replace("\"]", "").Replace("\",\"", "#"); ;
        //        string[] arrListStr = OrgReceived.Split('#');
        //        int i = 0;
        //        foreach (string s in arrListStr)
        //        {
        //            i++;
        //            var dt = db.Organizations.Where(t => t.FCode == s).FirstOrDefault();
        //            if (dt != null)
        //            {
        //                strName = strName + dt.FName;
        //                if (arrListStr.Length > 1 && i < arrListStr.Length)
        //                {
        //                    strName = strName + "; ";
        //                }
        //            }
        //        }
        //    }
        //    return strName;
        //}
        //public static string GetUserReceived(WebApiDataEntities db, string OrgReceived)
        //{
        //    string strName = "";
        //    if (!string.IsNullOrEmpty(OrgReceived))
        //    {
        //        OrgReceived = OrgReceived.Replace("[\"", "").Replace("\"]", "").Replace("\",\"", "#"); ;
        //        string[] arrListStr = OrgReceived.Split('#');
        //        int i = 0;
        //        foreach (string s in arrListStr)
        //        {
        //            i++;
        //            var dt = db.UserProfiles.Where(t => t.UserName == s).FirstOrDefault();
        //            if (dt != null)
        //            {
        //                strName = strName + dt.FullName;
        //                if (arrListStr.Length > 1 && i < arrListStr.Length)
        //                {
        //                    strName = strName + "; ";
        //                }
        //            }
        //        }
        //    }
        //    return strName;
        //}
    }
}