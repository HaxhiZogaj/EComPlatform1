// Services/Interfaces/IProductService.cs
using EComPlatform.DTOs;
using EComPlatform.Models;
using EComPlatform.ViewModels;

namespace EComPlatform.Services.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product> GetByIdAsync(int id);
        Task<Product> AddAsync(ProductViewModel model);
        Task<Product> UpdateAsync(ProductViewModel model);
        Task<bool> DeleteAsync(int id);
    }
}


