using EComPlatform.Models;
using EComPlatform.ViewModels;

namespace EComPlatform.Services.Interfaces
{
    public interface CategoryService
    {
        Task<IEnumerable<Category>> GetAllAsync();
        Task<Category> GetByIdAsync(int id);
        Task<Category> AddAsync(CategoryViewModel model);
        Task<Category> UpdateAsync(CategoryViewModel model);
        Task<bool> DeleteAsync(int id);
    }
}
