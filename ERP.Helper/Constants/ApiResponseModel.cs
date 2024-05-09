using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Helper.Constants
{
    public class ApiResponseModel<T>
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }
        public string? ExceptionMessage { get; set; }
        public dynamic? ExceptionObject { get; set; }

        public static ApiResponseModel<T> GenerateAPIResponse(bool isSuccess, T? data, HttpStatusCode statusCode, string? message, Exception? exception = null)
        {
            ApiResponseModel<T> apiResponse = new()
            {
                Data = data,
                IsSuccess = isSuccess,
                StatusCode = statusCode,
                Message = message ?? string.Empty,
                ExceptionMessage = exception?.Message
            };
            return apiResponse;
        }
    }
}

