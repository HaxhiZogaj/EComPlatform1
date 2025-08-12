using EComPlatform.Models;
using EComPlatform.Repository.Interface;

namespace EComPlatform.Repository
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private readonly EComPlatformContext _context;

        public CategoryRepository(EComPlatformContext context) : base(context)
        {
            _context = context;
        }
    }

}
