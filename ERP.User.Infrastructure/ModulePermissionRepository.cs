using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Models;
using ERP.User.Domain.Models.ViewModels;
using ERP.User.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;

namespace ERP.User.Infrastructure
{
    public class ModulePermissionRepository : IModulePermissionRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        public ModulePermissionRepository(ApplicationDbContext context, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _roleManager = roleManager;

        }

        #region Create Role Permission
        public async Task CreateRolePermission(string roleId, List<int> menuMasterId)
        {
            var role = await _roleManager.FindByIdAsync(roleId);
            if (role == null)
            {
                throw new InvalidOperationException("Role Not Found.");
            }

            foreach (int id in menuMasterId)
            {
                MenuMaster? existingMenu = await _context.MenuMasters.SingleOrDefaultAsync(m => m.MenuMasterId == id);
                if (existingMenu != null)
                {
                    ModulePermission newMenu = new ModulePermission();
                    newMenu.RoleId = roleId;
                    newMenu.MenuMasterId = id;
                    await _context.AddAsync(newMenu);
                }

            }

        }
        #endregion

        #region Delete Role Permission
        public async Task DeleteRolePermission(string roleId, int menuMasterId)
        {
            var role = await _roleManager.FindByIdAsync(roleId);
            if (role == null)
            {
                throw new InvalidOperationException("Role Not Found.");
            }

            var permissionToDelete = await _context.ModulePermissions
                .SingleOrDefaultAsync(p => p.RoleId == roleId && p.MenuMasterId == menuMasterId);

            if (permissionToDelete != null)
            {
                _context.ModulePermissions.Remove(permissionToDelete);
            }
        }
        #endregion

        public async Task DeleteRolePermissionsList(string roleId)
        {
            var role = await _roleManager.FindByIdAsync(roleId);
            if (role == null)
            {
                throw new InvalidOperationException("Role Not Found.");
            }

            var menuList = await _context.ModulePermissions.Where(r => r.Roles.Id.Equals(roleId)).ToListAsync();

            if (menuList.Count > 0)
            {
                foreach (var menu in menuList)
                {
                    var result = await _context.ModulePermissions.FirstOrDefaultAsync(p => p.Id == menu.Id);

                    if (result != null)
                    {
                        _context.ModulePermissions.Remove(result);
                    }
                }
            }
        }

        #region Get All Menu Permissions
        public async Task<List<ModulePermissionViewModel>> GetModulePermissionsList()
        {
            var modulePermissions = await (from mp in _context.ModulePermissions
                                           join mm in _context.MenuMasters on mp.MenuMasterId equals mm.MenuMasterId
                                           join ar in _roleManager.Roles on mp.RoleId equals ar.Id
                                           select new ModulePermissionViewModel
                                           {
                                               RoleId = ar.Id,
                                               RoleName = ar.Name,
                                               ModuleName = mm.Name,
                                               ModuleId = mm.MenuMasterId
                                           }).ToListAsync();

            return modulePermissions;
        }
        #endregion

        #region Get All Role Menus
        public async Task<List<RoleMenuViewModel>> GetRoleMenusList()
        {
            var roleMenuList = new List<RoleMenuViewModel>();

            foreach (var role in await _roleManager.Roles.ToListAsync())
            {
                var rolePermissions = await _context.ModulePermissions
                    .Where(mp => mp.RoleId == role.Id)
                    .Include(mp => mp.MenuMaster)
                    .ToListAsync();

                var roleMenuVM = new RoleMenuViewModel
                {
                    RoleId = role.Id,
                    RoleName = role.Name,
                    MenuCount = rolePermissions.Count,
                    MenuNames = rolePermissions.Select(p => p.MenuMaster?.Name).ToList(),
                };

                roleMenuList.Add(roleMenuVM);
            }

            return roleMenuList;
        }
        #endregion

        #region Get Rolewise Menu Permission
        public async Task<List<ModulePermissionViewModel>> GetModulePermission(string menuMasterId)
        {
            var modulePermissions = await (from mp in _context.ModulePermissions
                                           join mm in _context.MenuMasters on mp.MenuMasterId equals mm.MenuMasterId
                                           join ar in _roleManager.Roles on mp.RoleId equals ar.Id
                                           where mp.RoleId == menuMasterId
                                           select new ModulePermissionViewModel
                                           {
                                               RoleId = ar.Id,
                                               RoleName = ar.Name,
                                               ModuleName = mm.Name,
                                               ModuleId = mm.MenuMasterId
                                           }).ToListAsync();
            return modulePermissions;
        }
        #endregion

        #region Save Role Permission
        public async Task SaveRolePermission()
        {
            await _context.SaveChangesAsync();
        }
        #endregion

        #region Update Role Permission
        public async Task UpdateRolePermission(string roleId, List<int> menuMasterId)
        {
            var role = await _roleManager.FindByIdAsync(roleId);
            if (role == null)
            {
                throw new InvalidOperationException("Role Not Found");
            }
            var existingPermission = await _context.ModulePermissions.Where(p => p.RoleId == roleId).ToListAsync();

            var permissionsToRemove = existingPermission.Where(p => !menuMasterId.Contains(p.MenuMasterId)).ToList();
            _context.RemoveRange(permissionsToRemove);

            var existingMenuMasterIds = existingPermission.Select(p => p.MenuMasterId).ToList();
            var newPermissionsToAdd = menuMasterId
                .Where(id => !existingMenuMasterIds.Contains(id))
                .Select(id => new ModulePermission
                {
                    RoleId = roleId,
                    MenuMasterId = id
                })
                .ToList();
            await _context.ModulePermissions.AddRangeAsync(newPermissionsToAdd);

        }
        #endregion

        public async Task ManageRoleMenuMap(List<RoleMenuMapVM> roleMenuMapVM)
        {
            List<RoleMenuMap> roleMenuMap = new List<RoleMenuMap>();
            foreach (var item in roleMenuMapVM)
            {
                RoleMenuMap roleMenu = new RoleMenuMap();
                roleMenu.MenuMasterId = item.MenuMasterId;
                roleMenu.RoleId = item.RoleId;
                roleMenu.AllowView = item.AllowView;
                roleMenu.AllowInsert = item.AllowInsert;
                roleMenu.AllowEdit = item.AllowEdit;
                roleMenu.AllowDelete = item.AllowDelete;

                roleMenuMap.Add(roleMenu);
            }
            var existRoleMenuData = await _context.RoleMenuMap.Where(p => p.RoleId == roleMenuMapVM[0].RoleId).ToListAsync();
            if (await _context.RoleMenuMap.AnyAsync(x => x.RoleId == roleMenuMapVM[0].RoleId))
            {
                _context.RoleMenuMap.RemoveRange(existRoleMenuData);
            }
            try
            {
                await _context.RoleMenuMap.AddRangeAsync(roleMenuMap);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                await _context.RoleMenuMap.AddRangeAsync(existRoleMenuData);
                await _context.SaveChangesAsync();

            }
        }

        public async Task<List<RoleMenuMapVM>> FetchRoleMenuMap(string roleId)
        {

            var roleMenuMapList = await (from mm in _context.MenuMasters
                                         join nr in _roleManager.Roles on roleId equals nr.Id into nrGroup
                                         from nr in nrGroup.DefaultIfEmpty()
                                         join rmm in _context.RoleMenuMap on new { RoleId = nr.Id, mm.MenuMasterId } equals new { rmm.RoleId, rmm.MenuMasterId } into rmmGroup
                                         from rmm in rmmGroup.DefaultIfEmpty()
                                         select new RoleMenuMapVM
                                         {
                                             
                                             Id = rmm != null ? rmm.Id : 0,
                                             RoleId = nr.Id,
                                             MenuMasterId = mm.MenuMasterId,
                                             MenuName = mm.Name,
                                             AllowView = rmm != null && rmm.AllowView,
                                             AllowInsert = rmm != null && rmm.AllowInsert,
                                             AllowEdit = rmm != null && rmm.AllowEdit,
                                             AllowDelete = rmm != null && rmm.AllowDelete
                                         }).ToListAsync();
            return roleMenuMapList;

        }


    }
}
