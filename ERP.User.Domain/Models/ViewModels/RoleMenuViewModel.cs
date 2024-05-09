using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.User.Domain.Models.ViewModels
{
    public class RoleMenuViewModel
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public int MenuCount { get; set; }
        public List<string> MenuNames { get; set; }
    }
}
