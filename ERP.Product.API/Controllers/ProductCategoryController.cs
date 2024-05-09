using ERP.Product.Application.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ERP.Product.API.Controllers
{
    [Route("api/product/[controller]")]
    [ApiController]
    public class ProductCategoryController : BaseController
    {
        private readonly IProductCategoryRepository _productCategoryRepository;
        public ProductCategoryController(IProductCategoryRepository productCategoryRepository)
        {
            _productCategoryRepository = productCategoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_productCategoryRepository.GetAll());
        }
    }
}
