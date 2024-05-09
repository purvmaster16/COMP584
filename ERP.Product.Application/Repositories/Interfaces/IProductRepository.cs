namespace ERP.Product.Application.Repositories.Interfaces
{
    public interface IProductRepository
    {
        List<Domain.Models.Product> GetAll();
        Domain.Models.Product? Get(int productID);
        int Delete(int productID);
    }
}
