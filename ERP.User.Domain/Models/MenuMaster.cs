using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.User.Domain.Models
{
    public  class MenuMaster
    {
        [Key]
        public int MenuMasterId { get; set; }
        public string ParentId { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsDisplay { get; set; }
        public bool IsParent { get; set; }
        public string Route { get; set; }
    }
}
