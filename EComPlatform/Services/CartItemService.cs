using EComPlatform.Models;
using EComPlatform.Repository.Interface;
using EComPlatform.Services.Interfaces;
using EComPlatform.ViewModels;

namespace EComPlatform.Services
{
    public class CartItemService : ICartItemService
    {
        private readonly ICartItemRepository _cartRepo;

        public CartItemService(ICartItemRepository cartRepo)
        {
            _cartRepo = cartRepo;
        }

        public async Task<IEnumerable<CartItem>> GetAllAsync() => await _cartRepo.GetAllAsync();

        public async Task<CartItem> GetByIdAsync(int id) => await _cartRepo.GetByIdAsync(id);

        public async Task<CartItem> AddAsync(CartItemViewModel model)
        {
            var cartItem = new CartItem
            {
                ProductId = model.ProductId,
                UserId = model.UserId,
                SessionId = model.SessionId,
                Quantity = model.Quantity,
                CreatedAt = DateTime.UtcNow
            };

            await _cartRepo.AddAsync(cartItem);
            return cartItem;
        }

        public async Task<CartItem> UpdateAsync(CartItemViewModel model)
        {
            var cartItem = await _cartRepo.GetByIdAsync(model.CartItemId);
            if (cartItem == null) return null;

            cartItem.Quantity = model.Quantity;
            cartItem.SessionId = model.SessionId;

            await _cartRepo.UpdateAsync(cartItem);
            return cartItem;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cartItem = await _cartRepo.GetByIdAsync(id);
            if (cartItem == null) return false;

            await _cartRepo.RemoveAsync(cartItem);
            return true;
        }
    }
}
