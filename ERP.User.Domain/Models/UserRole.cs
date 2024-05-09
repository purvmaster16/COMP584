using System.ComponentModel.DataAnnotations;

namespace ERP.User.Domain.Models
{
    public class UserRole   
    {
        [Required]
        public string RoleID { get; set; }
        [Required]
        public string RoleName { get; set; }   
    }
}
