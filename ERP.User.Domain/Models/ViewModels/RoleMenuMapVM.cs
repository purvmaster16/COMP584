using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.User.Domain.Models.ViewModels
{
    public class RoleMenuMapVM
    {
        public int Id { get; set; } 
        public string RoleId { get; set; }   
        public int MenuMasterId { get; set; }
        public string? MenuName { get; set; }    
        public bool AllowView { get; set; }
        public bool AllowInsert { get; set; }
        public bool AllowEdit { get; set; }
        public bool AllowDelete { get; set; }
    }
}
