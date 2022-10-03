using ECommerceProjBusiness.Repositories;
using ECommerceProjData.Context;
using ECommerceProjEntities;
using IntegratedTemplateMVCProject.Utility;
using IntegratedTemplateMVCProject.Utility.Services;
using Microsoft.AspNetCore.Mvc;

namespace IntegratedTemplateMVCProject.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductRepository _productRepository;
        private readonly AppDbContext db;
        private readonly IImagesRepository _imagesRepository;
       // private readonly FileSystemFileUploader _fileSystemFileUploader;

        public ProductController(IProductRepository productRepository,
                                 IImagesRepository imagesRepository,
                                 AppDbContext appDb)
        {
            this._productRepository = productRepository;
            this._imagesRepository = imagesRepository;
           // this._fileSystemFileUploader = fileSystemFileUploader;
            this.db = appDb;
        }

        public IActionResult Index()
        {
            var products = _productRepository.GetProducts();
            return View(products);
        }


        //public IActionResult CreatePic(int id)
        //{
        //    return View(id);
        //}

        //[HttpPost]
        //public IActionResult CreatePic(IFormFile[] file, int? id)
        //{
        //    if (id.HasValue)
        //    {
        //        Product product = _productRepository.GetById(id.Value);

        //        if (product == null) return NotFound();

        //        if (file.Length > 0)
        //        {
        //            foreach (var item in file)
        //            {
        //                var result = _fileSystemFileUploader.Upload(item);

        //                if (result.ResponseFileResult == ResponseFileResult.Success)
        //                {
        //                    Images img = new Images
        //                    {
        //                        Url = result.FileUrl,
        //                        ProductId = id.Value
        //                    };
        //                    _imagesRepository.Add(img);
        //                    _productRepository.Save();
        //                }
        //            }
        //        }
        //    }
        //    return View(id);
        //}

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create([Bind("Name,StartPrice,Price,Rate,ProductImages")] Product product)
        {
            if (!ModelState.IsValid) return View(product);

            _productRepository.Add(product);
            return RedirectToAction(nameof(Index));
        }


        [ValidateAntiForgeryToken]
        public IActionResult Edit() => View();

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, [Bind("Name,StartPrice,Price,Rate,ProductImages")] Product product)
        {
            if (id != product.Id) return NotFound();

            _productRepository.Update(product);
            return View();
        }

        public IActionResult Delete(int id)
        {
            _productRepository.Delete(id);
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Details(int id)
        {
            var result = _productRepository.GetById(id);

            if (result == null) return NotFound();
            return View(result);
        }
    }
}
