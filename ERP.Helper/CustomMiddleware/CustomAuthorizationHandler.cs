using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Helper.CustomMiddleware
{
    public class CustomAuthorizationHandler : DelegatingHandler
    { 
        // Assuming a method to extract user identity (e.g., user ID from JWT token)
        private string ExtractUserIdentity(HttpRequestMessage request)
        {
            // Implementation depends on how you're handling authentication tokens
            return "SomeUserId";
        }
        
        // Simulate fetching user's roles from the database
        private async Task<List<int>> FetchUserRolesFromDatabase(string userId)
        {
            // Here, you'd actually fetch from your database. Simulating for demonstration.
            var userRolesJson = "[1,2,3]"; // This would be fetched from the database
            var roleIds = JsonConvert.DeserializeObject<List<int>>(userRolesJson);
            return roleIds ?? new List<int>();
        }

        // Check if the user is authorized based on your custom logic
        private bool IsAuthorized(List<int> userRoleIds)
        {
            // Define your authorization logic here. For simplicity, assume authorized if any role exists.
            return userRoleIds.Any();
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            // Check if the request is for the login endpoint
            if (request.RequestUri.PathAndQuery.StartsWith("/login", StringComparison.OrdinalIgnoreCase))
            {
                // If it's a login request, just call the base handler without applying any logic
                return await base.SendAsync(request, cancellationToken);
            }
            var userIdentity = ExtractUserIdentity(request);

            var userRoleIds = await FetchUserRolesFromDatabase(userIdentity);

            if (!IsAuthorized(userRoleIds))
            {
                var responseMessage = new HttpResponseMessage(HttpStatusCode.Forbidden)
                {
                    Content = new StringContent("{\"message\": \"You do not have permission to access this resource.\"}",
                                        Encoding.UTF8,
                                        "application/json")
                };

                return responseMessage;
            }

            // If authorized, continue the pipeline.
            return await base.SendAsync(request, cancellationToken);
        }

    }
}
