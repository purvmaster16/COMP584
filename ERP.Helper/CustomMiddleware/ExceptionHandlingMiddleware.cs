using ERP.Helper.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json;
using Serilog;
using System.Net;

namespace ERP.Helper.CustomMiddleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;  
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next.Invoke(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)   
        {
            context.Response.ContentType = "application/json";
            string? userName = context.User?.Identity?.Name;
            var routeData = context.GetRouteData();
            if (routeData != null)
            {
                string controllerName = routeData.Values["controller"].ToString();
                string actionName = routeData.Values["action"].ToString();

                Log.Error(exception, $"An error occurred in {controllerName} controller and {actionName} action for user {userName}");
            }
            else
            {
                Log.Error(exception, $"An error occurred for user {userName} (RouteData not available)");
            }

            var errorResponse = ApiResponseModel<object>.GenerateAPIResponse(false, null, HttpStatusCode.InternalServerError,null, exception);
            await context.Response.WriteAsync(JsonConvert.SerializeObject(errorResponse));
        }
    }
}
