using ERP.User.Domain.Models.ViewModels;

namespace ERP.User.Application.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        Task<UserAuthDisplayDTO> GetDetailsByUserId(string userId);
    }
}
