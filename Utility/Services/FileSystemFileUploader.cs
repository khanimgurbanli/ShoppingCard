namespace IntegratedTemplateMVCProject.Utility.Services
{
    public class FileSystemFileUploader : IFileUpload
    {
        private readonly string _filePath;

        // different location
        public FileSystemFileUploader(string filePath) => _filePath = filePath;

        // default location
        public FileSystemFileUploader() => this._filePath = "images";

        public FileUploadResult Upload(IFormFile formFile)
        {
           FileUploadResult fileUploadResult = new FileUploadResult();
            fileUploadResult.ResponseFileResult = ResponseFileResult.Error;
            fileUploadResult.Message = "An unexpected error occurred while loading the file";

            if (formFile.Length>0)
            {
                var fileName = $"{Guid.NewGuid()}{System.IO.Path.GetExtension(formFile.FileName)}";
                fileUploadResult.OriginalName=formFile.FileName;
                var phsycalPath=Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/{_filePath}",fileName);


                if (File.Exists(phsycalPath)) fileUploadResult.Message = "The requested document is available";
                else
                {
                    fileUploadResult.FileUrl = $"/{_filePath}/{fileName}";
                    fileUploadResult.Base64 = null;
                    try
                    {
                        using var stream = new FileStream(phsycalPath, FileMode.Create);
                        formFile.CopyTo(stream);
                        fileUploadResult.Message = "Save succesfully image file";
                    }
                    catch (Exception)
                    {
                        fileUploadResult.Message = "An unexpected error occurred while saving the file image";
                        fileUploadResult.ResponseFileResult = ResponseFileResult.Error;
                    }
                }
            }
            return fileUploadResult;
        }
    }
}
