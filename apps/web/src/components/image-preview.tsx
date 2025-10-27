import { DownloadSimple, Spinner } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ImagePreviewProps = {
  processedImage: string | null;
  isProcessing: boolean;
  error: string | null;
};

export function ImagePreview({
  processedImage,
  isProcessing,
  error,
}: ImagePreviewProps) {
  const handleDownload = () => {
    if (!processedImage) {
      return;
    }

    const link = document.createElement("a");
    link.href = processedImage;
    link.download = `processed-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Processed Image</CardTitle>
          {processedImage && (
            <Button onClick={handleDownload} size="sm">
              <DownloadSimple className="mr-2" size={16} />
              Download
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isProcessing && (
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12">
            <div className="text-center">
              <Spinner
                className="mx-auto mb-4 animate-spin text-primary"
                size={48}
              />
              <p className="text-muted-foreground text-sm">
                Processing image...
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg border-2 border-destructive/50 bg-destructive/10 p-4">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {processedImage && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <img
              alt="Processed"
              className="h-full w-full object-contain"
              height={600}
              src={processedImage}
              width={800}
            />
          </div>
        )}

        {!(processedImage || isProcessing || error) && (
          <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12">
            <p className="text-muted-foreground text-sm">
              Your processed image will appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
