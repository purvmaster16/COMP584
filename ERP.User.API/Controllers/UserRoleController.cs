using ERP.Helper.Constants;
using ERP.User.Domain.Exceptions;
using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Models;
using ERP.User.Domain.Models.StoreProcedureModels;
using ERP.User.Domain.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Data;
using System.Net;

namespace ERP.User.API.Controllers
{
    [Route("api/user/[controller]")]
    [ApiController]
    public class UserRoleController : BaseController
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IRoleRepository _roleRepository;
        public UserRoleController(RoleManager<IdentityRole> roleManager,IRoleRepository roleRepository)
        {
            _roleManager = roleManager;
            _roleRepository = roleRepository;
        }

        #region Display All Roles
        [HttpGet]
        public async Task<IActionResult> GetAllRoles()
        {
            try
            {
                List<IdentityRole> roles = await _roleManager.Roles.ToListAsync();
                IEnumerable<UserRole> userRoles = roles.Select(role => new UserRole { RoleID = role.Id, RoleName = role.Name }); 

                if (roles.Count == 0)
                {
                    return BadRequest(ApiResponseModel<IEnumerable<UserRole>>.GenerateAPIResponse(false, null, HttpStatusCode.BadRequest, "There are no Roles defined yet."));
                }

                return Ok(ApiResponseModel<IEnumerable<UserRole>>.GenerateAPIResponse(true, userRoles, HttpStatusCode.OK, null));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message + 
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }

        #endregion

        #region Display Role
        [HttpGet("{RoleID}")]
        public async Task<IActionResult> GetRole(string RoleID)
        {
            try
            {
                if (string.IsNullOrEmpty(RoleID))
                {
                    return BadRequest("Role ID cannot be null or empty.");
                }

                var role = await _roleManager.FindByIdAsync(RoleID);
                if (role == null)
                {
                    return NotFound($"Role with Role ID {RoleID} cannot be found");
                }
                UserRole roleForDisplay = new UserRole
                {
                    RoleID = role.Id,
                    RoleName = role.Name
                };
                return Ok(ApiResponseModel<UserRole>.GenerateAPIResponse(true, roleForDisplay, HttpStatusCode.OK, null));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }
        #endregion

        #region Add Role
        [HttpPost]
        public async Task<IActionResult> CreateRole(UserRoleDTO userRole)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    bool roleExists = await _roleManager.RoleExistsAsync(userRole.RoleName);
                    if (roleExists)
                    {
                        return BadRequest($"Role {userRole.RoleName} already exists.");
                    }
                    else
                    {
                        IdentityRole identityRole = new IdentityRole
                        {
                            Name = userRole.RoleName,
                            ConcurrencyStamp = Guid.NewGuid().ToString()
                        };

                        IdentityResult result = await _roleManager.CreateAsync(identityRole);

                        if (result.Succeeded)
                        {
                            return Created($"/api/roles/{identityRole.Id}", ApiResponseModel<IdentityRole>.GenerateAPIResponse(true, identityRole, HttpStatusCode.Created, "Role created successfully."));
                        }
                    }

                }
                return BadRequest("Role name can't fetched.");
            }
            catch(Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }
        #endregion

        #region Update Role
        [HttpPut]
        public async Task<IActionResult> EditRole(UserRole userRole)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var role = await _roleManager.FindByIdAsync(userRole.RoleID);
                if (role == null)
                {
                    return NotFound($"Role with Id = {userRole.RoleID} cannot be found");
                }

                role.Name = userRole.RoleName;

                var result = await _roleManager.UpdateAsync(role);
                if (result.Succeeded)
                {
                    return Ok(ApiResponseModel<IdentityRole>.GenerateAPIResponse(true, role, HttpStatusCode.OK, "User updated successfully."));
                }
                return BadRequest(result.Errors.Select(e => e.Description));
            }
            catch(Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }
        #endregion

        #region Delete Role
        [HttpDelete("{RoleID}")]
        public async Task<IActionResult> DeleteRole(string RoleID)
        {
            try
            {
                if (string.IsNullOrEmpty(RoleID))
                {
                    return BadRequest("Role ID cannot be null or empty.");
                }

                var role = await _roleManager.FindByIdAsync(RoleID);
                if (role == null)
                {
                    return NotFound($"Role with Role ID {RoleID} cannot be found");
                }

                var result = await _roleManager.DeleteAsync(role);
                if (result.Succeeded)
                {
                    return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, null, HttpStatusCode.OK, "Role deleted successfully."));
                }

                return BadRequest("Role can't be deleted, Some error occurred.");
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }

        }
        #endregion

        [HttpPost("[action]")]
        public async Task<IActionResult> GetRoleList(PaginationVM paginationVM)
        {
            try
            {
                string whereClause = this.WhereClause(paginationVM.Filter);
                var list = _roleRepository.FetchRoles(paginationVM.PageNumber, paginationVM.PageSize, paginationVM.SortBy, whereClause);
                if (list.Count == 0)
                {
                    Log.Warning("No Roles defined yet.");
                    return BadRequest(ApiResponseModel<List<Sproc_GetRolesList>>.GenerateAPIResponse(false, null, HttpStatusCode.BadRequest, "There are no Roles defined yet."));
                }

                return Ok(ApiResponseModel<List<Sproc_GetRolesList>>.GenerateAPIResponse(true, list, HttpStatusCode.OK, "Get Role List SuccessFully "));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
