namespace EComPlatform.ViewModels
{
    public class ProductImageViewModel
    {

        public int ProductImageId { get; set; }

        public int ProductId { get; set; }

        public string ImageUrl { get; set; }

        public bool? IsMain { get; set; }
    }
}
