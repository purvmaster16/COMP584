using ERP.Product.Application.Repositories.Interfaces;

namespace ERP.Product.Infrastructure
{
    public class ProductRepository : List<Domain.Models.Product>, IProductRepository
    {
        private readonly static List<Domain.Models.Product> _products = Populate();

        private static List<Domain.Models.Product> Populate()
        {
            var result = new List<Domain.Models.Product>()
            {
                new Domain.Models.Product
                {
                    ProductID = 1,
                    ProductName = "T-Shirt",
                    ProductDescription = "Cotton T-Shirt in various colors",
                    ProductPrice = 10.99
                },
                new Domain.Models.Product
                {
                    ProductID = 2,
                    ProductName = "Laptop",
                    ProductDescription = "High-performance laptop with 16GB RAM",
                    ProductPrice = 54000
                },
                new Domain.Models.Product
                {
                    ProductID = 3,
                    ProductName = "Coffee Mug",
                    ProductDescription = "Ceramic mug with funny inscription",
                    ProductPrice = 20.5
                }
            };

            return result;
        }

        public List<Domain.Models.Product> GetAll()
        {
            return _products;
        }

        public Domain.Models.Product? Get(int productID)
        {
            return _products.FirstOrDefault(x => x.ProductID == productID);
        }

        public int Delete(int productID)
        {
            var removed = _products.SingleOrDefault(x => x.ProductID == productID);

            if (removed != null)
                _products.Remove(removed);

            return removed?.ProductID ?? 0;
        }
    }
}
