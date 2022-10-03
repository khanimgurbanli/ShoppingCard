
using IntegratedTemplateMVCProject.Cart;

namespace ECommerceProjEntities.ViewModels.ShoppingCartViewModel
{
    public class ShoppingCartVM
    {
        public ShoppingCard ShoppingCart { get; set; }//ShoppingCart-da setstring (sessia ucun olan) xeta verirdi,,xeyli vaxtimi aldi helle ede bilmedim, mecbur viewmodeli bu layerde yazdim EntityLayerde olmali idi
        public double ShoppingCartTotal { get; set; }
    }
}
