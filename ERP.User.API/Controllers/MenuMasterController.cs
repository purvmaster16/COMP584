using ERP.Helper.Constants;
using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Exceptions;
using ERP.User.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ERP.User.API.Controllers
{
    [Route("api/user/[controller]")]
    [ApiController]
    public class MenuMasterController : BaseController
    {
        private readonly IMenuMasterRepository _menuMasterRepository;
        public MenuMasterController(IMenuMasterRepository menuMasterRepository)
        {
            _menuMasterRepository = menuMasterRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetModules()
        {
            try
            {
                List<MenuMaster> modules = await _menuMasterRepository.GetModulesList();

                if (!modules.Any())
                {
                    return BadRequest(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.NotFound, "There are no modules in the project."));
                }

                return Ok(ApiResponseModel<List<MenuMaster>>.GenerateAPIResponse(true, modules, HttpStatusCode.OK, null));
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
