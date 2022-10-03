namespace IntegratedTemplateMVCProject.Utility
{
    public class FileUploadResult
    {
        public string FileUrl { get; set; } = null!;
        public string OriginalName { get; set; } = null!;
        public string Base64 { get; set; } = null!;
        public ResponseFileResult ResponseFileResult { get; set; }
        public string Message { get; set; } = null!;
    }
}
