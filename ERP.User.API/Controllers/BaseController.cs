using ERP.User.Domain.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ERP.User.API.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {

        protected string WhereClause(List<Filter> filters)
        {
            string whereClause = " 1 = 1 ";
            if (filters != null && filters.Count > 0)
            {
                foreach (var filterDet in filters)
                {
                    string whereCondition = "";
                    if (string.IsNullOrEmpty(filterDet.FilterValue))
                        return string.Empty;

                    switch (filterDet.FilterType)
                    {
                        case FilterType.Contain:
                            whereCondition = string.Format(" {0} LIKE '%{1}%'", filterDet.FieldName, filterDet.FilterValue.TrimStart());
                            break;
                        case FilterType.Equal:
                            whereCondition = string.Format(" {0} = '{1}'", filterDet.FieldName, filterDet.FilterValue);
                            break;
                        default:
                            break;
                    }
                    whereClause = string.IsNullOrEmpty(whereClause) ? whereCondition : string.Concat(whereClause, " and ", whereCondition);
                }

            }

            return whereClause;
        }
    }
}
