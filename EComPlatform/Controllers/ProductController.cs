using EComPlatform.DTOs;
using EComPlatform.Models;
using EComPlatform.Repository.Interface;
using EComPlatform.Services.Interfaces;
using EComPlatform.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace EComPlatform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _productService.GetByIdAsync(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ProductViewModel model)
        {
            var product = await _productService.AddAsync(model);
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductViewModel model)
        {
            model.ProductId = id;
            var product = await _productService.UpdateAsync(model);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _productService.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }
    }


}
