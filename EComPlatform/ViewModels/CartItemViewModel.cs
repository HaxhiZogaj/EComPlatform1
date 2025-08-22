namespace EComPlatform.ViewModels
{
    public class CartItemViewModel
    {
        public int CartItemId { get; set; }

        public int? UserId { get; set; }

        public string? SessionId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}
