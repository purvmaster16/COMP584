using ERP.Helper.Constants;
using ERP.Helper.CustomHandler;
using ERP.User.Domain.Models;
using Users = ERP.User.Domain.Models.User;
using Microsoft.AspNetCore.Http.HttpResults;
using ERP.User.Domain.Models.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Net;
using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Exceptions;

namespace ERP.User.API.Controllers
{
    [Route("api/user/[controller]")]
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly UserManager<Domain.Models.User> _userManager;
        private readonly SignInManager<Domain.Models.User> _signInManager;
        private readonly JwtTokenService _jwtTokenService;
        private readonly IAuthRepository _authRepository;

        public AuthController(JwtTokenService jwtTokenService, UserManager<Domain.Models.User> userManagers, SignInManager<Domain.Models.User> signInManager,
            IAuthRepository authRepository)
        {
            _jwtTokenService = jwtTokenService;
            _userManager = userManagers;
            _signInManager = signInManager;
            _authRepository = authRepository;   
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel LogInModel)
        {
            if (LogInModel.Username == null || LogInModel.Password == null)
            {
                return BadRequest("Username or Password Empty !!");
            }

            var user = await _userManager.FindByNameAsync(LogInModel.Username);

            if (user != null)
            {
                var decryptedPass = EncryptionHelper.DecryptString(LogInModel.Password);

                var result = await _signInManager.CheckPasswordSignInAsync(user, decryptedPass, lockoutOnFailure: false);
                if (!result.Succeeded)
                    return Unauthorized();
            }

            var token = await _jwtTokenService.GenerateAuthToken(user);

            if (token != null)
            {
                return Ok(ApiResponseModel<AuthenticationToken>.GenerateAPIResponse(true, token, HttpStatusCode.OK, "Token Generated SuccessFully "));
            }
            return BadRequest(ApiResponseModel<string>.GenerateAPIResponse(true,null, HttpStatusCode.InternalServerError, "Token not generated ."));
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(RegistrationDTO model)
        {
            try
            {
                if (model == null)
                    return BadRequest(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.NotFound, "User data is Null."));
                Users user = new Users
                {
                    UserName = model.UserName,
                    PasswordHash = model.Password,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName
                };

                if (!string.IsNullOrEmpty(user.PasswordHash))
                {
                    var passwordHasher = new PasswordHasher<IdentityUser>();
                    var hashedPassword = passwordHasher.HashPassword(user, user.PasswordHash);
                    user.PasswordHash = hashedPassword;
                }

                user.Id = Guid.NewGuid().ToString();

                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded)
                    return BadRequest(ApiResponseModel<object>.GenerateAPIResponse(false, result.Errors, HttpStatusCode.NotFound, "Please Verify the Fields"));

                return Ok(ApiResponseModel<RegistrationDTO>.GenerateAPIResponse(true, model, HttpStatusCode.Created, "User created successfully."));

            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetUserRolesAndMenus(string userID)
        {
            try
            {
                var result = await _authRepository.GetDetailsByUserId(userID);
                return Ok(ApiResponseModel<UserAuthDisplayDTO>.GenerateAPIResponse(true, result, HttpStatusCode.OK, "Get User List details SuccessFully "));
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
