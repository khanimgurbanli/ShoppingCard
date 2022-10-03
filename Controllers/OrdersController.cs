using ECommerceProjBusiness.IRepositories;
using ECommerceProjBusiness.Repositories;
using ECommerceProjEntities.ViewModels.ShoppingCartViewModel;
using IntegratedTemplateMVCProject.Cart;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IntegratedTemplateMVCProject.Controllers
{
    public class OrdersController : Controller
    {
        private readonly ShoppingCard _shoppingCart;
        private readonly IOrderRepository _ordersRepository;
        private readonly IProductRepository _productRepository;

        public OrdersController(IOrderRepository moviesService, IProductRepository productRepository, ShoppingCard shoppingCart, IOrderRepository ordersRepository)
        {
            _shoppingCart = shoppingCart;
            _ordersRepository = ordersRepository;
            _productRepository = productRepository;
        }

        public async Task<IActionResult> Index()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var orders = await _ordersRepository.GetOrdersByUserIdAndRoleAsync(userId);

            return View(orders);
        }

        public IActionResult ShoppingCard()
        {
            var items = _shoppingCart.GetShoppingCartItems();
            _shoppingCart.ShoppingCartItems = items;

            var response = new ShoppingCartVM()
            {
                ShoppingCart = _shoppingCart,
                ShoppingCartTotal = _shoppingCart.GetShoppingCartTotal()
            };

            return View(response);
        }

        public async Task<IActionResult> AddItemToShoppingCart(int id)
        {
            var item = _productRepository.GetById(id);

            if (item != null)
            {
                _shoppingCart.AddItemToCart(item);
            }
            return RedirectToAction(nameof(ShoppingCard));
        }

        public IActionResult RemoveItemFromShoppingCart(int id)
        {
            var item = _productRepository.GetById(id);

            if (item != null)
            {
                _shoppingCart.RemoveItemFromCart(item);
            }
            return RedirectToAction(nameof(ShoppingCard));
        }

        public async Task<IActionResult> CompleteOrder()
        {
            var items = _shoppingCart.GetShoppingCartItems();
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            string userEmailAddress = User.FindFirstValue(ClaimTypes.Email);

            await _ordersRepository.StoreOrderAsync(items, userId, userEmailAddress);
            await _shoppingCart.ClearShoppingCartAsync();

            return View("OrderCompleted");
        }
    }
}
