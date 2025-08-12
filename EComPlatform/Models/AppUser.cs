using Microsoft.AspNetCore.Identity;

namespace EComPlatform.Models
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }


    }
}
