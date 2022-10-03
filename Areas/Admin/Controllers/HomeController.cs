using Microsoft.AspNetCore.Mvc;

namespace IntegratedTemplateMVCProject.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        [Area("admin")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
