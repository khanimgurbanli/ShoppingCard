using ECommerceProjBusiness.IRepositories;
using ECommerceProjBusiness.Repositories;
using ECommerceProjBusiness.Services;
using ECommerceProjData.Context;
using IntegratedTemplateMVCProject.Utility.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using System.Configuration;
namespace ECommerceProjEntities.DependenceInjections
{
    public static class StaticInjecDependence
    {
        public static void DependenceInject(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IImagesRepository, ImageRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IFileUpload, FileSystemFileUploader>();
        }
    }
}
