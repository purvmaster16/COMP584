using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.User.Domain.Models.ViewModels
{
    public class UserRoleManagementViewModel
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public List<string> RoleNames { get; set; }
    }
}
