using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApiCore.Models;

namespace WebApiCore.Commons
{
    public class Constants
    {
        #region const StatusSend
        public const string NoSend = "0";
        public const string Send = "1";
        public const string Back = "2";
        #endregion

        #region chức danh
        public const string TruongDoanTT = "TDTT";
        public const string PhoTruongDoanTT = "PDTT";
        public const string ThanhVien = "TTV";
        #endregion

        #region Giai đoạn
        // Tạo kế hoạch
        public const string TKH = "TKH";
        // Tiến hành TT
        public const string THTT = "THTT";
        #endregion

        #region Đối tượng văn bản
        public const string OBJ = "OBJ";
        public const string USER = "USER";
        public const string PUBLIC = "PUBLIC";
        #endregion
        #region Đối tượng dự án
        // Công ty
        public const string COM = "COM";
        // Cơ quan nhà nước 
        public const string ORG = "ORG";
        // Dự án 
        public const string PRO = "PRO";
        //Cá nhân
        public const string CN = "CN";
        #endregion

        #region Trạng thái tài khoản (Quan)
        public const string ThemMoi = "THEMMOI";
        public const string Duyet = "DUYET";
        public const string HuyDuyet = "HUY";        
        public const string ChoDuyet = "CHODUYET";
        public const string TuChoi = "TUCHOI";
        #endregion
        #region Trạng thái yêu cầu truy vấn (Quan)
        //Khong duoc sua yeu cau truy van
        public const string KhoaDong = "KHOADONG";
        //Duoc sua yeu cau truy van
        public const string KhoaMo = "KHOAMO";
        #endregion
        #region Nhóm nhà đầu tư, doanh nghiệp
        public const string NhaDauTu = "NDT";
        public const string DoanhNghiep = "DOANHNGHIEP";
        #endregion

        #region nhóm supper admin
        public const string SUPPERADMIN = "SUPPERADMIN";
        #endregion
        #region vai trò supper admin
        public const string SUPPER = "SUPER";
        #endregion

        #region vai trò duyệt kế hoạch
        public const string DUYETKH = "DUYET";
        #endregion

        #region Trạng thái thông báo
        public const string SoanThongBao = "ST";
        public const string Gui = "SEND";
        #endregion
        #region trạng thái doanh nghiệp
        public const string DUYET = "DUYET";
        public const string HUY = "HUY";
        public const string TUCHOI = "TUCHOI";
        #endregion


        #region Ma Danh muc

        public const string INTRO = "INTRO";
        public const string PRIZE = "PRIZE";
        public const string RACEKIT = "RACEKIT";
        public const string CALENDAR = "CALENDAR";
        public const string ITEM = "ITEM";
        public const string MOVE = "MOVE";
        public const string HOME = "HOME";

        public const string REGULATION = "REGULATION";
        public const string POLICY = "POLICY";
        public const string DETAIL_RACE = "DETAIL_RACE";

        public const string PROGRAMME_EXPODAY = "PROGRAMME_EXPODAY";
        public const string INTRO_RACKIT = "INTRO_RACKIT";
        public const string START_50K = "START_50K";
        public const string START_25K = "START_25K";
        public const string START_15K = "START_15K";

        public const string CLOSINGCEREMONY_AWARDSCEREMONY = "CLOSINGCEREMONY_AWARDSCEREMONY";
        public const string WELCOME_CULTURAL_EVENTS = "WELCOME_CULTURAL_EVENTS";
        public const string INTRODUCING_THESTALLS = "INTRODUCING_THESTALLS";

        public const string INFORMATION_ACCOMMODATION_TO_START = "INFORMATION_ACCOMMODATION_TO_START";
        public const string MOVE_TO_MCC = "MOVE_TO_MCC";
        public const string QUESTION_ANSWER_MCC = "QUESTION_ANSWER_MCC";

        #endregion
    }
}