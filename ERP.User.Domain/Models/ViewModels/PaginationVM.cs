using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.User.Domain.Models.ViewModels
{
    public class PaginationVM
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string? SortBy { get; set; }
        public int? id { get; set; }
        public List<Filter> Filter { get; set; }
    }

    public class Filter
    {
        public string FieldName { get; set; }
        public string FilterValue { get; set; }
        public FilterType FilterType { get; set; }
    }

    public enum FilterType
    {
        Contain = 1,
        Equal
    }
}
