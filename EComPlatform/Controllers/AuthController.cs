using EComPlatform.DTOs;
using EComPlatform.Models;
using EComPlatform.Repository.Interface.EComPlatform.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthRepository _authRepo;
    public AuthController(IAuthRepository authRepo)
    {
        _authRepo = authRepo;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var result = await _authRepo.RegisterAsync(dto);
        return result.IsSuccess ? Ok(result) : BadRequest(result);
    }

    //[HttpPost("login")]
    //public async Task<IActionResult> Login(LoginDto dto)
    //{
    //    var result = await _authRepo.LoginAsync(dto);
    //    return result.IsSuccess ? Ok(result) : Unauthorized(result);
    //}

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await _authRepo.LoginAsync(dto);
        if (!result.IsSuccess)
        {
            return BadRequest(new
            {
                Errors = result.Errors
            });
        }
        return Ok(result);
    }



}
