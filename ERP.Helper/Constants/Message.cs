using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Helper.Constants
{
    public static class Constants
    {
        public static class Message
        {

            public const string BadRequest = "Bad Request";
            public const string PageNotFound = "Page Not Found";
            public const string UnAuthorized = "Authentication failed. Please contact the administrator.";
            public const string SomethingWentWrong = "Something Went Wrong please contact the administrator";

            public const string SuccessFullyLogin = "Logged in successfully.";
            public const string LoginFailed = "Invalid login credentials.";
            public const string InActiveUser = "Your account is inactive. Please contact your administrator.";
            public const string ResetPassword = "Your password has been reset.";
            public const string InValidEmail = "Please enter valid email address!";
            public const string EmailSendSuccessfully = "{0} mail send successfully";

            public const string CreateSuccess = "{0} added successfully!";
            public const string UpdateSuccess = "{0} updated successfully!";
            public const string DeleteSuccess= "{0} deleted successfully!";
            public const string NotFound = "{0} detail not found!";

            public const string AlreadyExists = "{0} already exists.Please use a different {0}";
            public const string NotExists = "{0} not exists.";
            public const string NotCreate = "{0} creation failed! Please check {0} details and try again.";
            public const string NotUpdate = "{0} updation failed! Please check {0} details and try again.";
            public const string NotDelete = "{0} deletion failed! Please check {0} details and try again.";

            public const string GlobalExceptionError = "Something went wrong. Please contact to administrator.";

            public const string FileUploadedSucessfully = "File uploaded successfully";
            public const string FileUploadFailed = "File uploadation failed.";
            public const string FileNameAlreadyExists = "{0} Same Filename has already been uploaded for this {1}. Not Allow to upload file with same name.";
            public const string ProjectRequiredVNProjectManager = "Project must required at least one VN Project Manager in internal team.";

            public const string ProjectRequiredOnlyOneVNProjectManager = "More than one VN Project Managers are not allowed in internal team.";
            public const string AttachmentsPreventFieldUpdating = "{0} not allowed to update due to attachments are found for it.";

            public const string ChildRecordsAreExist = "Reference is available in another tables for {0} as existing can not be deleted.";
        }
            public static class DisplayFormatString
            {
                public const string Date = "{0:yyyy-MM-dd}";
            }
            public static class FormatString
            {
                public const string Date = "MM/dd/yyyy";
            }
       
            #region Modules
            public const string User = "User";
            public const string UserName = "User name";
            public const string Email = "Email";

            public const string Project = "Project";
            public const string ProjectName = "Project Name";


            public const string Status = "Status";
            public const string StatusCode = "Status Code";

            public const string Log = "Log";

            public const string MenuMaster = "Menu Master";

        

        #endregion

        #region Exception Code
        public static class ExceptionCode
        {
            public const string DuplicateUserName = "DuplicateUserName";
            public const string DuplicateProjectName = "DuplicateProjectName";
            public const string DuplicateStatusCode = "DuplicateStatusCode";
        }
        #endregion

        #region URL
       
        #endregion

        #region Path
       
        #endregion

       

        public static class Extension
        {
            public const string PNG = ".png";
            public const string JPG = ".jpg";
            public const string MP4 = ".mp4";
            public const string PDF = ".pdf";
            public const string ICO = ".ico";
            public const string RAR = ".rar";
            public const string RTF = ".rtf";
            public const string TXT = ".txt";
            public const string SRT = ".srt";
            public const string Excel = ".xlxs";
            public const string HTML = ".html";
        }

       
    }
}
