using EComPlatform.DTOs;
using EComPlatform.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;

    public UsersController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = _userManager.Users.ToList();
        return Ok(users);
    }

    [HttpPost("roles")]
    public async Task<IActionResult> AssignRoleToUser([FromQuery] string email, [FromBody] string roleName)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null) return NotFound("User not found");

        var result = await _userManager.AddToRoleAsync(user, roleName);
        return result.Succeeded ? Ok("Role assigned") : BadRequest(result.Errors);
    }



    [HttpDelete("roles/{roleName}")]
    public async Task<IActionResult> RemoveRoleFromUser([FromQuery] string email, string roleName)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null) return NotFound("User not found");

        var result = await _userManager.RemoveFromRoleAsync(user, roleName);
        return result.Succeeded ? Ok("Role removed") : BadRequest(result.Errors);
    }


    [HttpGet("roles")]
    public async Task<IActionResult> GetUserRoles([FromQuery] string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null) return NotFound("User not found");

        var roles = await _userManager.GetRolesAsync(user);
        return Ok(roles);
    }

}


