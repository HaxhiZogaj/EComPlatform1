using EComPlatform.Models;
using EComPlatform.Repository.Interface;
using EComPlatform.Services.Interfaces;
using EComPlatform.ViewModels;

namespace EComPlatform.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepo;

        public ProductService(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _productRepo.GetAllAsync();
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            return await _productRepo.GetByIdAsync(id);
        }

        public async Task<Product> AddAsync(ProductViewModel model)
        {
            var product = new Product
            {
                Name = model.Name,
                Price = model.Price,
                Description = model.Description,
                Stock = model.Stock,
                ImageUrl = model.ImageUrl,
                CategoryId = model.CategoryId,
                CreatedAt = DateTime.UtcNow
            };

            await _productRepo.AddAsync(product);
            return product;
        }

        public async Task<Product> UpdateAsync(ProductViewModel model)
        {
            var product = await _productRepo.GetByIdAsync(model.ProductId);
            if (product == null) return null;

            product.Name = model.Name;
            product.Price = model.Price;
            product.Description = model.Description;
            product.Stock = model.Stock;
            product.ImageUrl = model.ImageUrl;
            product.CategoryId = model.CategoryId;
            product.UpdatedAt = DateTime.UtcNow;

            await _productRepo.UpdateAsync(product);
            return product;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null) return false;

            product.IsDeleted = true;
            await _productRepo.RemoveAsync(product);
            return true;
        }
    }
}
