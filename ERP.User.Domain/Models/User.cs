using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.User.Domain.Models
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Company { get; set; }

        //public string RoleID { get; set; }
        //[ForeignKey("RoleID")]
        //public UserRole UserRole { get; set; }

        //public int DepartmentID { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public string? Address { get; set; }
        public string? ProfilePicture { get; set; }
        public bool IsDeleted { get; set; } = false;

        //public string? CreatedBy { get; set; }
        //[ForeignKey("CreatedBy")]
        //public User? CreatedByUser { get; set; }

        //public string? UpdatedBy { get; set; }
        //[ForeignKey("UpdatedBy")]
        //public User? UpdatedByUser { get; set; }

    }
}
