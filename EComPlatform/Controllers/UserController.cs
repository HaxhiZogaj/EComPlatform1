using Microsoft.AspNetCore.Mvc;

namespace EComPlatform.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
