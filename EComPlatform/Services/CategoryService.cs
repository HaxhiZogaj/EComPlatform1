using EComPlatform.Models;
using EComPlatform.Repository.Interface;
using EComPlatform.Services.Interfaces;
using EComPlatform.ViewModels;

namespace EComPlatform.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepo;

        public CategoryService(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _categoryRepo.GetAllAsync();
        }

        public async Task<Category> GetByIdAsync(int id)
        {
            return await _categoryRepo.GetByIdAsync(id);
        }

        public async Task<Category> AddAsync(CategoryViewModel model)
        {
            var category = new Category
            {
                CategoryName = model.CategoryName,
                Description = model.Description,
                CreatedAt = DateTime.UtcNow,
                IsDeleted = false
            };

            await _categoryRepo.AddAsync(category);
            return category;
        }

        public async Task<Category> UpdateAsync(CategoryViewModel model)
        {
            var category = await _categoryRepo.GetByIdAsync(model.CategoryId);
            if (category == null) return null;

            category.CategoryName = model.CategoryName;
            category.Description = model.Description;

            await _categoryRepo.UpdateAsync(category);
            return category;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _categoryRepo.GetByIdAsync(id);
            if (category == null) return false;

            category.IsDeleted = true;
            await _categoryRepo.UpdateAsync(category);
            return true;
        }
    }
}
