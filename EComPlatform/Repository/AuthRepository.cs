// Repositories/AuthRepository.cs
using EComPlatform.DTOs;
using EComPlatform.Helpers;
using EComPlatform.Models;
using EComPlatform.Repository.Interface.EComPlatform.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EComPlatform.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration _config;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthRepository(UserManager<AppUser> userManager,
                              RoleManager<IdentityRole> roleManager,
                              IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
            _roleManager = roleManager;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto model)
        {
            var user = new AppUser
            {
                UserName = model.Email,
                Email = model.Email,
                FullName = model.FullName
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return new AuthResponseDto
                {
                    IsSuccess = false,
                    Errors = result.Errors.Select(e => e.Description)
                };
            }

            await _userManager.AddToRoleAsync(user, "Customer");

            var token = await GenerateToken(user);
            return new AuthResponseDto { IsSuccess = true, Token = token };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return new AuthResponseDto { IsSuccess = false, Errors = new[] { "Invalid credentials." } };

            var token = await GenerateToken(user);
            return new AuthResponseDto { IsSuccess = true, Token = token };
        }

        public async Task<bool> AssignRoleAsync(string email, string role)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return false;
            if (!await _roleManager.RoleExistsAsync(role))
                await _roleManager.CreateAsync(new IdentityRole(role));

            await _userManager.AddToRoleAsync(user, role);
            return true;
        }

        private async Task<string> GenerateToken(AppUser user)
        {
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var userRoles = await _userManager.GetRolesAsync(user);
            authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));

            var token = JwtHelper.GenerateToken(
                 _config["JWT:Key"],
                 _config["JWT:Issuer"],
                 _config["JWT:Audience"],
                 Convert.ToDouble(_config["JWT:DurationInMinutes"]),
                 authClaims
              );


            return token;
        }
    }
}
