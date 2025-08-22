using EComPlatform.Models;
using EComPlatform.ViewModels;

namespace EComPlatform.Services.Interfaces
{
    public interface ICartItemService
    {
        Task<IEnumerable<CartItem>> GetAllAsync();
        Task<CartItem> GetByIdAsync(int id);
        Task<CartItem> AddAsync(CartItemViewModel model);
        Task<CartItem> UpdateAsync(CartItemViewModel model);
        Task<bool> DeleteAsync(int id);
    }
}
