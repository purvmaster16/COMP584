﻿namespace ERP.User.Domain.Models.ViewModels
{
    public class UserManageDTO
    {
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? PhoneNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Company { get; set; }
        public string? Address { get; set; }
        public string? ProfilePicture { get; set; }
    }
}
