using ERP.Helper.Constants;
using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Exceptions;
using ERP.User.Domain.Models;
using ERP.User.Domain.Models.ViewModels;
using ERP.User.Infrastructure;
using ERP.User.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace ERP.User.API.Controllers
{
    [Route("api/user/[controller]")]
    [ApiController]
    public class UseRoleManagementController : Controller
    {

        private readonly IUserRoleManagementRepository _userRoleRepository;

        public UseRoleManagementController(IUserRoleManagementRepository userRoleRepository)
        {
            _userRoleRepository = userRoleRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUserWithRolesList()
        {
            try
            {
                var userRoles = await _userRoleRepository.GetUserWithRoleNamesList();
                return Ok(ApiResponseModel<List<UserRoleManagementViewModel>>.GenerateAPIResponse(true, userRoles, HttpStatusCode.OK, null));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }



        [HttpGet("all")]
        public async Task<ActionResult<List<UserRoleManagement>>> GetAllUserRoles()
        {
            try
            {
                var userRoles = await _userRoleRepository.GetUserRolesListAsync();
                return Ok(ApiResponseModel<List<UserRoleManagement>>.GenerateAPIResponse(true, userRoles, HttpStatusCode.OK, null));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetRoleIdsByUserId(string userId)
        {
            try
            {
                var roleIds = await _userRoleRepository.GetRoleIdsByUserIdAsync(userId);
                if (roleIds == null || roleIds.Count == 0)
                {
                    return NotFound(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.NotFound, $"User with ID {userId} not found."));
                }
                return Ok(ApiResponseModel<List<string>>.GenerateAPIResponse(true, roleIds, HttpStatusCode.OK, null));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddUserToRoles(string userId, List<string> roleIds)
        {
            try
            {
                await _userRoleRepository.AddAsync(userId, roleIds);
                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, null, HttpStatusCode.Created, "User added to roles successfully."));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }

        [HttpPut("{userId}/roles")]
        public async Task<IActionResult> UpdateUserRoles(string userId, [FromBody] List<string> roleIds)
        {
            try
            {
                await _userRoleRepository.UpdateUserRolesAsync(userId, roleIds);
                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, null, HttpStatusCode.Created, "User added to roles successfully."));
            
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveUserFromRole(string userId, string roleId)
        {
            try
            {
                await _userRoleRepository.RemoveAsync(userId, roleId);
                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, null, HttpStatusCode.OK, "User removed from role successfully."));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> RemoveUserFromRole(string userId)
        {
            try
            {
                await _userRoleRepository.RemoveRolesListAsync(userId);
                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, null, HttpStatusCode.OK, "User removed from role successfully."));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }
    }
}
