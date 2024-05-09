using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ERP.User.Domain.Models
{
    public class ModulePermission
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Roles")]
        public string RoleId { get; set; }
        public IdentityRole Roles { get; set; }

        [ForeignKey("MenuMaster")]
        public int MenuMasterId { get; set; }
        public MenuMaster MenuMaster { get; set; }

    }
}
