namespace EComPlatform.Repository.Interface
{
    // Interfaces/IAuthRepository.cs
    using System.Threading.Tasks;
    using global::EComPlatform.DTOs;

    namespace EComPlatform.Interfaces
    {
        public interface IAuthRepository
        {
            Task<AuthResponseDto> RegisterAsync(RegisterDto model);
            Task<AuthResponseDto> LoginAsync(LoginDto model);
            Task<bool> AssignRoleAsync(string email, string role);
        }
    }

}
