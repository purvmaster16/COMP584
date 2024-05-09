using ERP.User.Domain.Models;
using ERP.User.Domain.Models.ViewModels;

namespace ERP.User.Application.Repositories.Interfaces
{
    public interface IUserRoleManagementRepository
    {
        Task<List<UserRoleManagement>> GetUserRolesListAsync();
        Task<List<UserRoleManagementViewModel>> GetUserWithRoleNamesList();
        Task<List<string>> GetRoleIdsByUserIdAsync(string userId);
        Task UpdateUserRolesAsync(string userId, List<string> roleIds);
        Task AddAsync(string userId, List<string> roleId);
        Task RemoveAsync(string userId, string roleId);
        Task RemoveRolesListAsync(string userId);

    }
}       
