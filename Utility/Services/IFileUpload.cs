namespace IntegratedTemplateMVCProject.Utility.Services
{
    public interface IFileUpload
    {
        public FileUploadResult Upload(IFormFile formFile);
    }
}
