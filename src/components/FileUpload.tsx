import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, FileText, Image } from 'lucide-react';

interface FileUploadProps {
  onFilesChange: (urls: string[]) => void;
  bucket: 'project-files' | 'tutorial-files';
  maxFiles?: number;
  acceptedTypes?: string[];
  existingFiles?: string[];
}

const FileUpload = ({ 
  onFilesChange, 
  bucket, 
  maxFiles = 5, 
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'],
  existingFiles = []
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(existingFiles);
  const { toast } = useToast();

  const uploadFile = async (file: File) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (uploadedFiles.length + files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        if (!acceptedTypes.includes(file.type)) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not an accepted file type`,
            variant: "destructive",
          });
          continue;
        }

        if (file.size > 50 * 1024 * 1024) { // 50MB limit
          toast({
            title: "File too large",
            description: `${file.name} is larger than 50MB`,
            variant: "destructive",
          });
          continue;
        }

        const url = await uploadFile(file);
        newUrls.push(url);
      }

      const updatedFiles = [...uploadedFiles, ...newUrls];
      setUploadedFiles(updatedFiles);
      onFilesChange(updatedFiles);

      toast({
        title: "Files uploaded",
        description: `${newUrls.length} file(s) uploaded successfully`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const removeFile = async (urlToRemove: string) => {
    try {
      // Extract file path from URL for deletion
      const url = new URL(urlToRemove);
      const path = url.pathname.split(`/storage/v1/object/public/${bucket}/`)[1];
      
      if (path) {
        await supabase.storage.from(bucket).remove([path]);
      }

      const updatedFiles = uploadedFiles.filter(url => url !== urlToRemove);
      setUploadedFiles(updatedFiles);
      onFilesChange(updatedFiles);

      toast({
        title: "File removed",
        description: "File deleted successfully",
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  const getFileIcon = (url: string) => {
    if (url.includes('.pdf')) {
      return <FileText className="w-4 h-4" />;
    }
    return <Image className="w-4 h-4" />;
  };

  const getFileName = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1] || 'Unknown file';
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="file-upload">Upload Files (Images & PDFs)</Label>
        <div className="mt-2">
          <Input
            id="file-upload"
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleFileUpload}
            disabled={uploading || uploadedFiles.length >= maxFiles}
            className="cursor-pointer"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Max {maxFiles} files, 50MB each. Supported: Images (JPEG, PNG, GIF, WebP) and PDFs
          </p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <Label>Uploaded Files</Label>
          <div className="space-y-2">
            {uploadedFiles.map((url, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center space-x-2">
                  {getFileIcon(url)}
                  <span className="text-sm truncate">{getFileName(url)}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(url)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploading && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Upload className="w-4 h-4 animate-spin" />
          <span>Uploading files...</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;