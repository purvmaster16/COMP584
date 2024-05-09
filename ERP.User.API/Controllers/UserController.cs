using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using ERP.Helper.Constants;
using Users = ERP.User.Domain.Models.User;
using ERP.User.Domain.Models.ViewModels;
using ERP.User.Domain.Exceptions;
using ERP.Helper.CustomHandler;
using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Models.StoreProcedureModels;

namespace ERP.User.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly UserManager<Users> _userManager;
        private readonly IUserRepository _userRepository;

        public UserController(UserManager<Users> userManager,IUserRepository userRepository)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _userRepository = userRepository;
        }


        [HttpGet("GetUsersList")]
        public async Task<IActionResult> GetUsersList()
        {
            try
            {
                List<Users> users = await _userManager.Users.ToListAsync();
                IEnumerable<UserDTO> userDTOs = users.Select(u => new UserDTO
                {
                    Id = u.Id,
                    UserName = u.UserName,
                    Email = u.Email,
                    PhoneNumber = u.PhoneNumber,
                    FirstName = u.FirstName,
                    LastName = u.LastName,  
                    Company = u.Company,
                    Address = u.Address,
                    ProfilePicture = u.ProfilePicture,
                    IsDeleted = u.IsDeleted
                }); 

                if (users.Count == 0)
                {
                    return BadRequest(ApiResponseModel<IEnumerable<UserDTO>>.GenerateAPIResponse(false, null, HttpStatusCode.BadRequest, "There are no users defined yet."));
                }

                return Ok(ApiResponseModel<IEnumerable<UserDTO>>.GenerateAPIResponse(true, userDTOs, HttpStatusCode.OK, null));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            try
            {
                if (string.IsNullOrEmpty(id))
                    return BadRequest("User ID cannot be null or empty.");

                Users user = await _userManager.FindByIdAsync(id);

                if (user == null)
                {
                    return NotFound(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.NotFound, $"User with ID {id} not found."));
                }
                UserDTO userDTO = new UserDTO
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    FirstName = user.FirstName,
                    LastName = user.LastName,  
                    Company = user.Company,
                    Address = user.Address,
                    ProfilePicture = user.ProfilePicture,
                    IsDeleted = user.IsDeleted
                };
                return Ok(ApiResponseModel<UserDTO>.GenerateAPIResponse(true, userDTO, HttpStatusCode.OK, null));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] UserManageDTO model)
        {
            try
            {
                if (model == null)
                    return BadRequest(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.NotFound, "User data is Null."));

                Users user = new Users
                {
                    UserName = model.UserName,
                    PasswordHash = model.PasswordHash,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Company = model.Company,
                    Address = model.Address,
                    ProfilePicture = model.ProfilePicture
                };
               
                if (!string.IsNullOrEmpty(user.PasswordHash))
                {
                    model.PasswordHash = EncryptionHelper.DecryptString(model.PasswordHash);

                 var passwordHasher = new PasswordHasher<IdentityUser>();
                   var hashedPassword = passwordHasher.HashPassword(user, model.PasswordHash);
                    user.PasswordHash = hashedPassword;
                }


                user.Id =Guid.NewGuid().ToString();
                model.Id = user.Id; 
                
             
                var result = await _userManager.CreateAsync(user);

                if (!result.Succeeded)
                    return BadRequest(ApiResponseModel<object>.GenerateAPIResponse(false, result.Errors, HttpStatusCode.NotFound,"Please Verify the Fields"));

                return Ok(ApiResponseModel<UserManageDTO>.GenerateAPIResponse(true, model, HttpStatusCode.Created, "User created successfully."));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }

        [HttpDelete("DeleteUser/{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            try
            {
                if (string.IsNullOrEmpty(userId))
                    return BadRequest("User ID is required.");

                Users user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                    return NotFound(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.NotFound, $"User with ID {userId} not found."));


                var result = await _userManager.DeleteAsync(user);
                if (!result.Succeeded)
                    return BadRequest(result.Errors);


                return Ok(ApiResponseModel<object>.GenerateAPIResponse(true, null, HttpStatusCode.OK, "User deleted successfully."));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserManageDTO model)
        {
            try
            {
                if (string.IsNullOrEmpty(model.Id))
                    return BadRequest(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.NotFound, $"User with ID {model.Id} not found."));


                Users user = await _userManager.FindByIdAsync(model.Id);
                if (user == null)
                    return NotFound(ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.NotFound, $"User with ID {model.Id} not found."));

                user.PasswordHash = model.PasswordHash;
                if (!string.IsNullOrEmpty(user.PasswordHash))
                {
                    var passwordHasher = new PasswordHasher<IdentityUser>();
                    var hashedPassword = passwordHasher.HashPassword(user, user.PasswordHash);
                    user.PasswordHash = hashedPassword;
                }

                user.UserName = model.UserName;
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Email = model.Email;
                user.Address = model.Address;
                user.Company = model.Company;
                user.PhoneNumber = model.PhoneNumber;
                user.ProfilePicture = model.ProfilePicture;
                user.UpdatedAt = DateTime.Now;

                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                return Ok(ApiResponseModel<UserManageDTO>.GenerateAPIResponse(true, model, HttpStatusCode.OK, "User updated successfully."));
            }
            catch (Exception ex)
            {
                throw new GeneralException("Message: " + ex.Message +
                                           "InnerException: " + ex.InnerException +
                                           "StackTrace: " + ex.StackTrace +
                                           "Source: " + ex.Source);
            }
        }

        [HttpPost("GetUsersList")]
        public async Task<IActionResult> GetUsersList(PaginationVM paginationVM)
        {
            try
            {
                string whereClause = this.WhereClause(paginationVM.Filter);
                var users = _userRepository.FetchUsers(paginationVM.PageNumber, paginationVM.PageSize, paginationVM.SortBy, whereClause);

                if (users.Count == 0)
                {
                    Serilog.Log.Warning("No Users defined yet.");
                    return BadRequest(ApiResponseModel<List<Sproc_GetUserList>>.GenerateAPIResponse(false, null, HttpStatusCode.BadRequest, "There are no users defined yet."));
                }

                return Ok(ApiResponseModel<List<Sproc_GetUserList>>.GenerateAPIResponse(true, users, HttpStatusCode.OK, "Get User List SuccessFully "));
            }
            catch (Exception ex)
            {
                Serilog.Log.Error(ex, "An error occurred while getting users.");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
