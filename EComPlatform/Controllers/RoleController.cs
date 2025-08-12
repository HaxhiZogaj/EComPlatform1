using EComPlatform.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class RolesController : ControllerBase
{
    private readonly RoleManager<IdentityRole> _roleManager;

    public RolesController(RoleManager<IdentityRole> roleManager)
    {
        _roleManager = roleManager;
    }

    [HttpGet]
    public IActionResult GetRoles()
    {
        var roles = _roleManager.Roles.ToList();
        return Ok(roles);
    }

    [HttpPost]
    public async Task<IActionResult> CreateRole([FromBody] string roleName)
    {
        if (string.IsNullOrWhiteSpace(roleName))
            return BadRequest("Role name is required");

        if (await _roleManager.RoleExistsAsync(roleName))
            return BadRequest("Role already exists");

        var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
        return result.Succeeded ? Ok("Role created") : BadRequest(result.Errors);
    }

    //[HttpPost]
    //public async Task<IActionResult> CreateRole([FromBody] RoleDto roleDto)
    //{
    //    if (string.IsNullOrWhiteSpace(roleDto?.Name))
    //        return BadRequest("Role name is required");

    //    if (await _roleManager.RoleExistsAsync(roleDto.Name))
    //        return BadRequest("Role already exists");

    //    var result = await _roleManager.CreateAsync(new IdentityRole(roleDto.Name));
    //    return result.Succeeded ? Ok("Role created") : BadRequest(result.Errors);
    //}

    [HttpDelete("{roleName}")]
    public async Task<IActionResult> DeleteRole(string roleName)
    {
        var role = await _roleManager.FindByNameAsync(roleName);
        if (role == null) return NotFound("Role not found");

        var result = await _roleManager.DeleteAsync(role);
        return result.Succeeded ? Ok("Role deleted") : BadRequest(result.Errors);
    }
}
