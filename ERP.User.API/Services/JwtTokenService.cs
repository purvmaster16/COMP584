
using ERP.User.Domain.Models;
using ERP.Helper.CustomHandler;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ERP.User.Application.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Users = ERP.User.Domain.Models.User;

namespace ERP.User.API;

public class JwtTokenService
{

    #region Property Inject 

    private readonly IUserRoleManagementRepository _userRoleRepository;
    public JwtTokenService(IModulePermissionRepository modulePermissionRepository, UserManager<Users> userManager, IUserRoleManagementRepository userRoleRepository)
    {        
        _userRoleRepository = userRoleRepository;
    }

    #endregion


    public async Task<AuthenticationToken>? GenerateAuthToken(Users users)
    {
        
            var roleIds = await _userRoleRepository.GetRoleIdsByUserIdAsync(users.Id);

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtExtensions.SecurityKey));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var expirationTimeStamp = DateTime.Now.AddMinutes(55);

            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Name, users.UserName),
            new Claim("role", roleIds.First())
        };

            var tokenOptions = new JwtSecurityToken(
                issuer: "http://localhost:5295",
                audience: "http://localhost:5295",
                claims: claims,
                expires: expirationTimeStamp,
                signingCredentials: signingCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return new AuthenticationToken(tokenString, (int)expirationTimeStamp.Subtract(DateTime.Now).TotalSeconds,users.Id,users.FirstName,users.LastName);
       
    }
}
