//using EComPlatform.DTOs;
//using EComPlatform.Models;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using System.Security.Claims;

//[ApiController]
//[Route("api/[controller]")]
//public class ClaimsController : ControllerBase
//{
//    private readonly UserManager<AppUser> _userManager;

//    public ClaimsController(UserManager<AppUser> userManager)
//    {
//        _userManager = userManager;
//    }

//    [HttpGet("{email}")]
//    public async Task<IActionResult> GetUserClaims(string email)
//    {
//        var user = await _userManager.FindByEmailAsync(email);
//        if (user == null) return NotFound("User not found");

//        var claims = await _userManager.GetClaimsAsync(user);
//        return Ok(claims);
//    }

//    [HttpPost("{email}")]
//    public async Task<IActionResult> AddClaimToUser(string email, [FromBody] ClaimDto claimDto)
//    {
//        var user = await _userManager.FindByEmailAsync(email);
//        if (user == null) return NotFound("User not found");

//        var result = await _userManager.AddClaimAsync(user, new Claim(claimDto.Type, claimDto.Value));
//        return result.Succeeded ? Ok("Claim added") : BadRequest(result.Errors);
//    }

//    [HttpDelete("{email}")]
//    public async Task<IActionResult> RemoveClaimFromUser(string email, [FromBody] ClaimDto claimDto)
//    {
//        var user = await _userManager.FindByEmailAsync(email);
//        if (user == null) return NotFound("User not found");

//        var result = await _userManager.RemoveClaimAsync(user, new Claim(claimDto.Type, claimDto.Value));
//        return result.Succeeded ? Ok("Claim removed") : BadRequest(result.Errors);
//    }
//}

using EComPlatform.DTOs;
using EComPlatform.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class ClaimsController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;

    public ClaimsController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

   [HttpGet("{userId}")]
    public async Task<IActionResult> GetUserClaims(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound("User not found");

        var claims = await _userManager.GetClaimsAsync(user);
        return Ok(claims);
    }



    [HttpPost("{userId}")]
    public async Task<IActionResult> AddClaimToUser(string userId, [FromBody] ClaimDto claimDto)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound("User not found");

        var result = await _userManager.AddClaimAsync(user, new Claim(claimDto.Type, claimDto.Value));
        return result.Succeeded ? Ok("Claim added") : BadRequest(result.Errors);
    }

    [HttpDelete("{userId}")]
    public async Task<IActionResult> RemoveClaimFromUser(string userId, [FromBody] ClaimDto claimDto)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound("User not found");

        var result = await _userManager.RemoveClaimAsync(user, new Claim(claimDto.Type, claimDto.Value));
        return result.Succeeded ? Ok("Claim removed") : BadRequest(result.Errors);
    }
}


