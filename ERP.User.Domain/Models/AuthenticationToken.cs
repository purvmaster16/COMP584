
namespace ERP.User.Domain.Models;

public record AuthenticationToken(string Token, int ExpiresIn,string userId = null,string FirstName = null ,string LastName = null);

