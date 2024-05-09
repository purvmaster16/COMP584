using ERP.User.Domain.Models;

namespace ERP.User.Application.Repositories.Interfaces
{
    public interface IMenuMasterRepository
    {
        Task<List<MenuMaster>> GetModulesList();

    }
}
