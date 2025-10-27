import { UploadSimple } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ImageUploaderProps = {
  onImageSelect: (file: File | string) => void;
  selectedImage: File | string | null;
};

export function ImageUploader({
  onImageSelect,
  selectedImage,
}: ImageUploaderProps) {
  const [urlInput, setUrlInput] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput) {
      onImageSelect(urlInput);
      setPreview(urlInput);
    }
  };

  const clearImage = () => {
    onImageSelect(null as unknown as File);
    setPreview(null);
    setUrlInput("");
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="url">From URL</TabsTrigger>
          </TabsList>

          <TabsContent className="space-y-4" value="upload">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Select Image</Label>
              <div className="flex gap-2">
                <Input
                  accept="image/*"
                  className="flex-1"
                  id="file-upload"
                  onChange={handleFileChange}
                  type="file"
                />
                {selectedImage && (
                  <Button
                    onClick={clearImage}
                    type="button"
                    variant="destructive"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent className="space-y-4" value="url">
            <div className="space-y-2">
              <Label htmlFor="url-input">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="url-input"
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                  value={urlInput}
                />
                <Button onClick={handleUrlSubmit} type="button">
                  Load
                </Button>
              </div>
            </div>
            {preview && (
              <Button onClick={clearImage} type="button" variant="destructive">
                Clear
              </Button>
            )}
          </TabsContent>
        </Tabs>

        {preview && (
          <div className="mt-4">
            <p className="mb-2 font-medium text-sm">Preview:</p>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              <img
                alt="Preview"
                className="h-full w-full object-contain"
                src={preview}
              />
            </div>
          </div>
        )}

        {!preview && (
          <div className="mt-4 flex items-center justify-center rounded-lg border-2 border-dashed p-12">
            <div className="text-center">
              <UploadSimple
                className="mx-auto mb-4 text-muted-foreground"
                size={48}
              />
              <p className="text-muted-foreground text-sm">
                Upload an image or provide a URL to get started
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
