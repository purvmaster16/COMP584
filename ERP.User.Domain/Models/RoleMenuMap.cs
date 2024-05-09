using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.User.Domain.Models
{
    public class RoleMenuMap
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Roles")]
        public string RoleId { get; set; }
        public IdentityRole Roles { get; set; }
        public int MenuMasterId { get; set; }
        [ForeignKey("MenuMasterId")]
        public virtual MenuMaster MenuMasters { get; set; }
        public bool AllowView { get; set; }
        public bool AllowInsert { get; set; }
        public bool AllowEdit { get; set; }
        public bool AllowDelete { get; set; }
    }
}
