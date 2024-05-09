using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Models;
using ERP.User.Domain.Models.ViewModels;
using ERP.User.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERP.User.Infrastructure
{
    public class UserRoleManagementRepository : IUserRoleManagementRepository
    {

        private readonly UserManager<Domain.Models.User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserRoleManagementRepository(UserManager<Domain.Models.User> userManager,RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<List<UserRoleManagement>> GetUserRolesListAsync()
        {
            var userRoles = new List<UserRoleManagement>();
            foreach (var user in await _userManager.Users.ToListAsync())
            {
                var roles = await _userManager.GetRolesAsync(user);

                foreach (var roleName in roles)
                {
                    var role = await _roleManager.FindByNameAsync(roleName);
                    if (role == null)
                    {
                        throw new InvalidOperationException($"Role '{roleName}' not found.");
                    }

                    var userRoleId = Guid.NewGuid();

                    var userRoleManagement = new UserRoleManagement
                    {
                        UserRoleId = userRoleId,
                        UserId = user.Id,
                        RoleId = role.Id 
                    };

                    userRoles.Add(userRoleManagement);
                }
            }
            return userRoles;
        }


        public async Task<List<string>> GetRoleIdsByUserIdAsync(string userId)
        {
            // Retrieve the user
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            // Get all roles associated with the user
            var roleIds = new List<string>();
            foreach (var role in await _userManager.GetRolesAsync(user))
            {
                var roleId = (await _roleManager.FindByNameAsync(role))?.Name;
                if (!string.IsNullOrEmpty(roleId))
                {
                    roleIds.Add(roleId);
                }
            }

            return roleIds;
        }



        public async Task AddAsync(string userId, List<string> roleId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            // Add user to each role
            foreach (var Id in roleId)
            {
                var role = await _roleManager.FindByIdAsync(Id);
                if (role == null)
                {
                    throw new InvalidOperationException($"Role with ID {Id} not found.");
                }

                // Check if the user is already in the role
                var isInRole = await _userManager.IsInRoleAsync(user, role.Name);
                if (!isInRole)
                {
                    var result = await _userManager.AddToRoleAsync(user, role.Name);
                    if (!result.Succeeded)
                    {
                        throw new InvalidOperationException($"Failed to add user to role '{role.Name}'. Errors: {string.Join(", ", result.Errors)}");
                    }
                }
            }
        }

        public async Task UpdateUserRolesAsync(string userId, List<string> roleIds)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            // Remove existing roles
            var currentRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, currentRoles);

            // Add new roles
            foreach (var roleId in roleIds)
            {
                var role = await _roleManager.FindByIdAsync(roleId);
                if (role == null)
                {
                    throw new InvalidOperationException($"Role with ID {roleId} not found.");
                }

                await _userManager.AddToRoleAsync(user, role.Name);
            }
        }


        public async Task RemoveAsync(string userId, string roleId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            var role = await _roleManager.FindByIdAsync(roleId);
            if (role == null)
            {
                throw new InvalidOperationException("Role not found.");
            }

            // Remove user from role
            var result = await _userManager.RemoveFromRoleAsync(user, role.Name);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException($"Failed to remove user from role. Errors: {string.Join(", ", result.Errors)}");
            }
        }

        public async Task RemoveRolesListAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User not found.");
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            foreach (var role in userRoles)
            {
                var result = await _userManager.RemoveFromRoleAsync(user, role);

                if (!result.Succeeded)
                {
                    throw new InvalidOperationException($"Failed to remove user from role. Errors: {string.Join(", ", result.Errors)}");
                }
            }


        }

        public async Task<List<UserRoleManagementViewModel>> GetUserWithRoleNamesList()
        {
            var userRoleList = new List<UserRoleManagementViewModel>();

            foreach(var user in await _userManager.Users.ToListAsync())
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var userRoleVM = new UserRoleManagementViewModel
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    RoleNames = userRoles.ToList(),
                };
                userRoleList.Add(userRoleVM);
            }

            return userRoleList;
        }
    }
}
