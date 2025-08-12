using EComPlatform.Models;
using EComPlatform.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace EComPlatform.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly EComPlatformContext _context;

        public ProductRepository(EComPlatformContext context) : base(context)
        {
            _context = context;
        }


    }

}
