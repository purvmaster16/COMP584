using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Models.StoreProcedureModels;
using ERP.User.Infrastructure.Data;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.User.Infrastructure
{
    public class RoleRepository:IRoleRepository
    {
        private readonly ApplicationDbContext _context;
        public RoleRepository(ApplicationDbContext context) 
        {
            _context = context;
        }

        public List<Sproc_GetRolesList> FetchRoles(int page, int pageSize, string sortBy, string whereClasue)
        {
            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@PageIndex", page),
                new SqlParameter("@PageSize", pageSize),
                new SqlParameter("@SortBy", (object)sortBy ?? DBNull.Value),
                new SqlParameter("@WhereClause", (object)whereClasue ?? DBNull.Value)
            };
            DataSet dataSet = this._context.ExecuteStoredProcedure("Sproc_GetRolesList", parameters);

            // Map the First result set to the Order entity
            int totalCount = dataSet.Tables[0].AsEnumerable().Select(a => a.Field<int>("TotalCount")).FirstOrDefault();

            // Map the Second result set to the Product entity
            List<Sproc_GetRolesList> roles = dataSet.Tables[1].AsEnumerable().Select(row => new Sproc_GetRolesList
            {
                Id = row.Field<string>("Id"),
                Name = row.Field<string>("Name")
            }).ToList();
            return roles;
        }
    }
}
