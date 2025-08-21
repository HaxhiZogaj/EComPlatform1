using EComPlatform.Models;
using EComPlatform.Services;
using EComPlatform.Services.Interfaces;
using EComPlatform.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace EComPlatform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _categoryService.GetAllAsync();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            if (category == null) return NotFound();
            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CategoryViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var category = await _categoryService.AddAsync(model);
            return CreatedAtAction(nameof(GetById), new { id = category.CategoryId }, category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CategoryViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != model.CategoryId) return BadRequest("ID mismatch");

            var updated = await _categoryService.UpdateAsync(model);
            if (updated == null) return NotFound();

            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _categoryService.DeleteAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }
    }
}
