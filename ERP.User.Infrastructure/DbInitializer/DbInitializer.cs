using ERP.User.Domain.Models;
using ERP.User.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.User.Infrastructure.DbInitializer
{
    public class DbInitialization
    {
        protected readonly ApplicationDbContext _context;
        private readonly UserManager<Domain.Models.User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public DbInitialization(ApplicationDbContext context, UserManager<Domain.Models.User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        #region StoreProcedure

        private void Sproc_GetUserList()
        {
            var dropScript = "IF (OBJECT_ID('Sproc_GetUserList', 'P') IS NOT NULL)   " +
                " DROP PROCEDURE Sproc_GetUserList;";
            _context.Database.ExecuteSqlRaw(dropScript);

            var createScript = @"CREATE PROC [dbo].[Sproc_GetUserList]
            (       
                @PageIndex INT = 0,
                @PageSize INT = 10,
	            @SortBy varchar(50),
	            @WhereClause nvarchar(max) = ' 1=1 '
            )
            AS
            BEGIN
	            DECLARE @SQL VARCHAR(MAX); 
	            DECLARE @TotalCountSQL VARCHAR(MAX); 
	            DECLARE @Sorting VARCHAR(50) = ' a.id asc'; 
	            DECLARE @offset INT;
	            SET @offset = @PageIndex  * @PageSize    
    
	            IF((@SortBy is not null or @SortBy != ''))
	            BEGIN
		            SET @Sorting =  CONCAT('a.', @SortBy);
	            END

                IF((@WhereClause is null or @WhereClause = ''))
	            BEGIN
		            SET @WhereClause = ' 1=1 ';
	            END

	            set @SQL = 'SELECT  id, FirstName, LastName, Email, UserName, PhoneNumber, Address, Company, ProfilePicture,  IsDeleted from AspNetUsers ';
								
	            set @TotalCountSQL = CONCAT('select count(1) TotalCount  FROM (',@SQL,') as a   where ', @WhereClause);

	            EXEC(@TotalCountSQL);

	            set @SQL = CONCAT('select *  FROM (',@SQL,') as a where ', @WhereClause , '  ORDER BY ', @Sorting, ' OFFSET ', @offset ,'  ROWS FETCH NEXT ' , @PageSize, ' ROWS ONLY' );
	            
                EXEC(@SQL);
            
                END;
                  ";

            _context.Database.ExecuteSqlRaw(createScript);
        }

        private void Sproc_GetRoleList()
        {
            var dropScript = "IF (OBJECT_ID('Sproc_GetRolesList', 'P') IS NOT NULL)   " +
                " DROP PROCEDURE Sproc_GetRolesList;";
            _context.Database.ExecuteSqlRaw(dropScript);

            var createScript = @"CREATE PROC   [dbo].[Sproc_GetRolesList] 
                                    @PageIndex INT = 0,    
                                    @PageSize INT = 10,
	                                @SortBy varchar(50),
                                    @WhereClause nvarchar(max)
                                AS
                                BEGIN
	                                DECLARE @SQL VARCHAR(MAX); 
                                    DECLARE @TotalCountSQL VARCHAR(MAX); 
	                                DECLARE @Sorting VARCHAR(50) = ' id asc'; 
	                                DECLARE @offset INT;

	                                SET @offset = @PageIndex  * @PageSize    
    
	                                IF((@SortBy is not null or @SortBy != ''))
	                                BEGIN
		                                SET @Sorting =  @SortBy;
	                                END
                    
                                    IF((@WhereClause is null or @WhereClause = ''))
	                                BEGIN
		                                SET @WhereClause = ' 1=1 ';
	                                END
                    
                                    set @SQL = 'SELECT * from AspNetRoles';

                                    set @TotalCountSQL = CONCAT('select count(1) TotalCount  FROM (',@SQL,') as a   where ', @WhereClause);

                                    EXEC(@TotalCountSQL);

	                                set @SQL = CONCAT('select *  FROM (',@SQL,') as a where ', @WhereClause , '  ORDER BY ', @Sorting, ' OFFSET ', @offset ,'  ROWS FETCH NEXT ' , @PageSize, ' ROWS ONLY' );
	                
                                    EXEC(@SQL);
                                END;  
                                ";
            _context.Database.ExecuteSqlRaw(createScript);
        }

        #endregion

        public async Task IntitializeAsync(IServiceProvider serviceProvider)
        {
            Sproc_GetUserList();
            Sproc_GetRoleList();

            #region Default Roles
            var roleExist = await _roleManager.RoleExistsAsync("Admin");
            IdentityRole role = new IdentityRole();
            if (!roleExist)
            {
                role = new IdentityRole
                {
                    Name = "Admin"
                };
                await _roleManager.CreateAsync(role);
            }
            roleExist = await _roleManager.RoleExistsAsync("User");
            if (!roleExist)
            {
                role = new IdentityRole
                {
                    Name = "User"
                };
                await _roleManager.CreateAsync(role);
            }
            #endregion

            #region Default User

            string userName = "Erp_admin";
            string email = "erp@yahoo.com";
            string password = "Erp@1234";

            var userResult = _userManager.FindByNameAsync(userName.Trim()).Result;
            var EmailResult = _userManager.FindByEmailAsync(email).Result;
            if (userResult == null)
            {
                var user = new Domain.Models.User { FirstName = "Admin", LastName = "A", UserName = userName.Trim(), Email = email.Trim() };
                user.EmailConfirmed = true;
                user.IsDeleted = false;
                var createPowerUser = await _userManager.CreateAsync(user, password);
                if (createPowerUser.Succeeded)
                {
                    _userManager.AddToRoleAsync(user, "Admin").GetAwaiter().GetResult();
                }
            }
            #endregion

            #region Assigne role to user
            var userRes = _userManager.FindByNameAsync("Erp_admin").Result;
            var roleid = _roleManager.FindByNameAsync("Admin").Result;

            if (userRes != null && roleid != null)
            {
                _userManager.AddToRoleAsync(userRes, "Admin").GetAwaiter().GetResult();

            }

            #endregion
        }


    }
}
