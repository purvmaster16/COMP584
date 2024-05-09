using ERP.User.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ERP.User.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<Domain.Models.User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }
        public DbSet<MenuMaster> MenuMasters { get; set; }  
        public DbSet<ModulePermission> ModulePermissions { get; set; }
        public DbSet<RoleMenuMap> RoleMenuMap { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DataSet ExecuteStoredProcedure(string storedProcedureName, SqlParameter[] parameters)
        {
            using (var connection = new SqlConnection(this.Database.GetConnectionString()))
            {

                using (var command = new SqlCommand(storedProcedureName, connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddRange(parameters);

                    using (var adapter = new SqlDataAdapter(command))
                    {
                        var dataSet = new DataSet();
                        adapter.Fill(dataSet);
                        return dataSet;
                    }
                }
            }
        }
    }
}
