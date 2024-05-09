namespace ERP.User.Domain.Models.ViewModels
{
    public class UserAuthDisplayDTO
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public List<string> RoleIds { get; set; }
        public List<string> RoleNames { get; set; }
        public List<int> MenuIds { get; set; }
        public List<string> MenuNames { get; set; }
    }
}
