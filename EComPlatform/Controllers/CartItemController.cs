using EComPlatform.Models;
using EComPlatform.Services.Interfaces;
using EComPlatform.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace EComPlatform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartItemController : ControllerBase
    {
        private readonly ICartItemService _cartService;

        public CartItemController(ICartItemService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _cartService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _cartService.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CartItemViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var item = await _cartService.AddAsync(model);
            return CreatedAtAction(nameof(GetById), new { id = item.CartItemId }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CartItemViewModel model)
        {
            if (!ModelState.IsValid || id != model.CartItemId) return BadRequest();
            var updated = await _cartService.UpdateAsync(model);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _cartService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
