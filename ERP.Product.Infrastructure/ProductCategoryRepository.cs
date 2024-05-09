using ERP.Product.Application.Repositories.Interfaces;
using ERP.Product.Domain.Models;

namespace ERP.Product.Infrastructure
{
    public class ProductCategoryRepository : List<ProductCategory>, IProductCategoryRepository
    {
        private readonly static List<ProductCategory> _productCategories = Populate();

        private static List<ProductCategory> Populate()
        {
            var result = new List<ProductCategory>()
            {
                new ProductCategory
                {
                    CategoryID = 1,
                    CategoryName = "Electronics"
                },
                new ProductCategory
                {
                    CategoryID = 2,
                    CategoryName = "Clothing and footwear"
                },
                new ProductCategory
                {
                    CategoryID = 3,
                    CategoryName = "Toys & Games"
                }
            };

            return result;
        }

        public List<ProductCategory> GetAll()
        {
            return _productCategories;
        }

    }
}
