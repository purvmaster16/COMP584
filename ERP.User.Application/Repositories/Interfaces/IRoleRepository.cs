using ERP.User.Domain.Models.StoreProcedureModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.User.Application.Repositories.Interfaces
{
    public interface IRoleRepository
    {
        List<Sproc_GetRolesList> FetchRoles(int page, int pageSize, string sortBy, string whereClasue);
    }
}
