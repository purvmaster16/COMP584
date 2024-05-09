using ERP.User.Domain.Models;
using ERP.User.Domain.Models.StoreProcedureModels;

namespace ERP.User.Application.Repositories.Interfaces
{
    public interface IUserRepository
    {
        List<Domain.Models.User> GetAll();
        Domain.Models.User? Get(int id);
        Domain.Models.User Insert(Domain.Models.User user);
        List<Sproc_GetUserList> FetchUsers(int page, int pageSize, string sortBy, string whereClasue);
    }
}
