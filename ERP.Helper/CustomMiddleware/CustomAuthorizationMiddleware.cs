using ERP.Helper.Constants;
using ERP.Helper.CustomHandler;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ERP.Helper.CustomMiddleware
{
    public class CustomAuthorizationMiddleware
    {
        private readonly RequestDelegate _next;
        //private readonly IHttpClientFactory _clientFactory;

        public CustomAuthorizationMiddleware(RequestDelegate next)
        {
            _next = next;

        }

        public async Task Invoke(HttpContext context)
        {

            try
            {
                if (context.Request.Path.StartsWithSegments(new PathString("/user/auth/login"), StringComparison.OrdinalIgnoreCase))
                {
                    await _next(context);
                    return;
                }

                string authorizationHeader = context.Request.Headers["Authorization"];

                if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                {
                    var responseModel = JsonSerializer.Serialize(new ApiResponseModel<string>
                    {
                        IsSuccess = false,
                        Data = null,
                        StatusCode = HttpStatusCode.Unauthorized,
                        Message = "Unauthorized Access"                    
                    });

                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    await context.Response.WriteAsync(responseModel);
                    return;
                }

                var token = authorizationHeader.Substring("Bearer ".Length).Trim();

                // Validate the token and extract claims
                var principal = ValidateAndExtractPrincipalFromJwtToken(token, context);

                //var userIdClaim = principal.Claims.FirstOrDefault(claim => claim.Type == "userId")?.Value;
                //var UserRoles = EncryptionHelper.DecryptString(principal.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Role)?.Value);
                //var UserModuleAccess = EncryptionHelper.DecryptString(principal.Claims.FirstOrDefault(claim => claim.Type == "scope")?.Value);

                //if (!await IsAuthorized(userIdClaim, System.Text.Json.JsonSerializer.Deserialize<List<string>>(UserRoles), System.Text.Json.JsonSerializer.Deserialize<List<string>>(UserModuleAccess)))
                //{
                //    context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                //    await context.Response.WriteAsync("{\"message\": \"You do not have permission to access this resource.\"}", Encoding.UTF8);
                //    return;
                //}

                await _next(context);
            }
            catch (SecurityTokenException ex)
            {
                var responseModel = JsonSerializer.Serialize(new ApiResponseModel<string>
                {
                    IsSuccess = false,
                    Data = null,
                    StatusCode = HttpStatusCode.Unauthorized,
                    Message = "Unauthorized Access"
                });

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                await context.Response.WriteAsync(responseModel);
            }


        }

        //private async Task<bool> IsAuthorized(string userIdClaim, List<string> UserRoles, List<string> UserModuleAccess)
        //{

        //    var requestUrl = "http://localhost:5219/api/user/getuserrolesandmodulepermission/7fb146f7-34f9-45e5-991c-6fa36e4069dc";

        //    // Create an HttpClient
        //    var client = _clientFactory.CreateClient();

        //    try
        //    {
        //        // Make the HTTP request
        //        var response = await client.GetAsync(requestUrl);

        //        if (response.IsSuccessStatusCode)
        //        {
        //            bool IsAuthenticated = false; bool IsAuthorized = false;
        //            var json = await response.Content.ReadAsStringAsync();
        //            var userData = System.Text.Json.JsonSerializer.Deserialize<CommonModels.UserClaimDetails>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        //            IsAuthenticated = UserRoles.Any(item => userData.UserRoles.Contains(item));
        //            IsAuthorized = UserModuleAccess.Any(item => userData.ModuleAccess.Contains(item));
        //            if (IsAuthenticated && IsAuthorized) { return true; } else { return false; }
        //        }

        //    }
        //    catch (HttpRequestException ex)
        //    {
        //        return false;
        //    }

        //    return false;
        //}

        private ClaimsPrincipal ValidateAndExtractPrincipalFromJwtToken(string token, HttpContext context)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtExtensions.SecurityKey)),

                ValidateIssuer = true,
                ValidIssuer = "http://localhost:5295",

                ValidateAudience = true,
                ValidAudience = "http://localhost:5295",

                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
            };


            var principal = tokenHandler.ValidateToken(token, validationParameters, out var securityToken);

            // Ensure we have a JWT token (not another type of token)
            if (!(securityToken is JwtSecurityToken jwtSecurityToken) || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Unauthorized Access");
            }

            return principal; // This will contain the user's identity and claims if the token is valid


        }
    }

}
