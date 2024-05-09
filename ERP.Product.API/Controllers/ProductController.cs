using ERP.Product.Application.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERP.Product.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseController
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_productRepository.GetAll());
        }

        [HttpGet("{productID}")]
        public IActionResult Get(int productID)
        {
            var product = _productRepository.Get(productID);

            if (product is null)
                return NotFound();

            return Ok(product);
        }

        [HttpDelete("{productID}")]
        public IActionResult Delete(int productID)
        {
            var deletedProduct = _productRepository.Delete(productID);

            if (deletedProduct == 0)
                return NotFound();

            return NoContent();
        }
    }
}
