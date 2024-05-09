using ERP.User.Domain.Models;
using ERP.User.Domain.Models.ViewModels;

namespace ERP.User.Application.Repositories.Interfaces
{
    public interface IModulePermissionRepository
    {
        Task<List<ModulePermissionViewModel>> GetModulePermissionsList();
        Task<List<RoleMenuViewModel>> GetRoleMenusList();
        Task<List<ModulePermissionViewModel>> GetModulePermission(string menuMasterId);
        Task CreateRolePermission(string roleId, List<int> menuMasterId);
        Task UpdateRolePermission (string roleId, List<int> menuMasterId);
        Task DeleteRolePermission(string roleId, int menuMasterId);
        Task DeleteRolePermissionsList(string  roleId);
        Task SaveRolePermission();
        Task ManageRoleMenuMap(List<RoleMenuMapVM> roleMenuMapVM);
        Task<List<RoleMenuMapVM>> FetchRoleMenuMap(string roleId);


    }
}
