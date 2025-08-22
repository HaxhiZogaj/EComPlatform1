using EComPlatform.Models;
using EComPlatform.Repository.Interface;

namespace EComPlatform.Repository
{

    public class CartItemRepository : Repository<CartItem>, ICartItemRepository
    {
        private readonly EComPlatformContext _context;

        public CartItemRepository(EComPlatformContext context) : base(context)
        {
            _context = context;
        }
    }

}
