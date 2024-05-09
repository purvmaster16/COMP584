using ERP.Helper.Constants;
using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Exceptions;
using ERP.User.Domain.Models;
using ERP.User.Domain.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net;

namespace ERP.User.API.Controllers
{
    [Route("api/user/[controller]")]
    [ApiController]
    public class ModulePermissionController : BaseController
    {
        private readonly IModulePermissionRepository _modulePermissionRepository;
        public ModulePermissionController(IModulePermissionRepository modulePermissionRepository)
        {
            _modulePermissionRepository = modulePermissionRepository;
        }

        #region Get All Role Module Permissions
        [HttpGet]
        public async Task<IActionResult> GetAllModulePermission()
        {
            try
            {
                var result = await _modulePermissionRepository.GetModulePermissionsList();
                if (result.Count == 0)
                {
                    return BadRequest(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.NotFound, "There are no roles defined yet."));
                }
                 return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, result, HttpStatusCode.OK, null));
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

        #region Get All Role with Menu List
        [HttpGet("GetAllRoleMenuPermission")]        
        public async Task<IActionResult> GetAllRoleMenuPermission()
        {
            try
            {
                var result = await _modulePermissionRepository.GetRoleMenusList();
                if (result.Count == 0)
                {
                    return BadRequest(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.NotFound, "There are no roles defined yet."));
                }
                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, result, HttpStatusCode.OK, null));
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

        #region Get Module Permission by Role Id
        [HttpGet("{roleId}")]
        public async Task<IActionResult> GetModulePermission(string roleId)
        {
            try
            {
                var result = await _modulePermissionRepository.GetModulePermission(roleId);
                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, result, HttpStatusCode.OK, null));
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

        #region Create Role Module Permission
        [HttpPost]
        public async Task<IActionResult> CreateRoleModulePermission([FromBody] RoleMenuManageDTO model)
        {
            try
            {
                if (model.RoleId == null)
                {
                    return BadRequest("RoleId is required.");
                }
                await _modulePermissionRepository.CreateRolePermission(model.RoleId, model.MenuMasterId);
                await _modulePermissionRepository.SaveRolePermission();

                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, null, HttpStatusCode.OK, "Module Permission Added successfully."));
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

        #region Update Role Module Permission
        [HttpPut]
        public async Task<IActionResult> UpdateRoleModulePermission([FromBody] RoleMenuManageDTO model)
        {
            try
            {
                if (model.RoleId == null)
                {
                    return BadRequest("There is no role selected.");
                }

                await _modulePermissionRepository.UpdateRolePermission(model.RoleId, model.MenuMasterId);  
                await _modulePermissionRepository.SaveRolePermission();
                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, null, HttpStatusCode.OK, "Module Permission Updated successfully."));
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

        #region Remove Role Module Permission
        [HttpDelete]
        public async Task<IActionResult> RemoveRoleModulePermission(string roleId, int menuMasterId)
        {
            try
            {
                if(menuMasterId == 0)
                {
                    return BadRequest("Please select module first.");
                }
                await _modulePermissionRepository.DeleteRolePermission(roleId,menuMasterId);
                await _modulePermissionRepository.SaveRolePermission();
                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, null, HttpStatusCode.OK, "Your Module permission is deleted."));
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

        #region Remove All Menu permission
        [HttpDelete("{roleId}")]

        public async Task<IActionResult> RemoveAllMenus(string roleId)
        {
            try
            {
                if (roleId == null)
                {
                    return BadRequest("Please select role first.");
                }
                await _modulePermissionRepository.DeleteRolePermissionsList(roleId);
                await _modulePermissionRepository.SaveRolePermission();
                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, null, HttpStatusCode.OK, "Your All Module permissions are deleted."));
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
        public async Task<IActionResult> ManageRoleMenuMap(List<RoleMenuMapVM> roleMenuMaps)
        {   
            try
            {
               await _modulePermissionRepository.ManageRoleMenuMap(roleMenuMaps);
               return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, null, HttpStatusCode.OK, "Role Menu Permission Update SuccessFully."));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.BadRequest, $"Failed to update module permission. Error: {ex.Message}"));
            }
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetRoleMenuMapList(string RoleId)
        {
            
            try
            {
                var list = await _modulePermissionRepository.FetchRoleMenuMap(RoleId);

                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true,list, HttpStatusCode.OK, null));

            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.BadRequest, $"Failed to retrieve module permissions. Error: {ex.Message}"));
            }
        }
    }
}
