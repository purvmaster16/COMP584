using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Models.StoreProcedureModels;
using ERP.User.Infrastructure.Data;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ERP.User.Application.Repositories
{
    public class UserRepository : List<Domain.Models.User>, IUserRepository
    {
        private readonly static List<Domain.Models.User> _users = Populate();
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        private static List<Domain.Models.User> Populate()
        {
            return new List<Domain.Models.User>
            {
               
            };
        }

        public List<Domain.Models.User> GetAll()
        {
            return _users;
        }

        public Domain.Models.User Insert(Domain.Models.User user)
        {

            return user;
        }

        public Domain.Models.User? Get(int userID)
        {
            return null;
        }

        public List<Sproc_GetUserList> FetchUsers(int page, int pageSize, string sortBy, string whereClasue)
        {
            SqlParameter[] parameters = new SqlParameter[]
            {
                new SqlParameter("@PageIndex", page),
                new SqlParameter("@PageSize", pageSize),
                new SqlParameter("@SortBy", (object)sortBy ?? DBNull.Value),
                new SqlParameter("@WhereClause", (object)whereClasue ?? DBNull.Value)
            };
            DataSet dataSet = this._context.ExecuteStoredProcedure("Sproc_GetUserList", parameters);

            // Map the First result set to the Order entity
            int totalCount = dataSet.Tables[0].AsEnumerable().Select(a => a.Field<int>("TotalCount")).FirstOrDefault();

            // Map the Second result set to the Product entity
            List<Sproc_GetUserList> users = dataSet.Tables[1].AsEnumerable().Select(row => new Sproc_GetUserList
            {
                Id = row.Field<string>("Id"),
                Email = row.Field<string>("Email"),
                FirstName = row.Field<string>("FirstName"),
                LastName = row.Field<string>("LastName"),
                UserName = row.Field<string>("UserName"),
                Address = row.Field<string>("Address"),
                PhoneNumber = row.Field<string>("PhoneNumber"),
                Company = row.Field<string>("Company"),
                IsDeleted = row.Field<bool>("IsDeleted"),
                ProfilePicture = row.Field<string>("ProfilePicture")

            }).ToList();

            return users;
           
        }
    }
}
