using ERP.Product.Domain.Models;

namespace ERP.Product.Application.Repositories.Interfaces
{
    public interface IProductCategoryRepository
    {
        List<ProductCategory> GetAll();

    }
}
