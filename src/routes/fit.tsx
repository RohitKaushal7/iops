import { FrameCorners } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImagePreview } from "@/components/image-preview";
import { ImageUploader } from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useImageProcessor } from "@/lib/use-image-processor";

export const Route = createFileRoute("/fit")({
  component: FitComponent,
});

function FitComponent() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [quality, setQuality] = useState(80);

  const { processedImage, isProcessing, error, processImage } =
    useImageProcessor();

  const handleImageSelect = (file: File | string | null) => {
    setSelectedImage(file);
  };

  const handleProcess = async () => {
    if (!selectedImage) return;

    const params: Record<string, string | number> = {
      width,
      height,
      quality,
    };

    await processImage({
      endpoint: "/fit",
      params,
      image: selectedImage,
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <FrameCorners size={32} weight="duotone" />
        <div>
          <h1 className="font-bold text-3xl">Fit Image</h1>
          <p className="text-muted-foreground">
            Resize image to fit within bounds without cropping
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ImageUploader
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
          />

          <Card>
            <CardHeader>
              <CardTitle>Fit Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Max Width (px)</Label>
                  <Input
                    id="width"
                    min={1}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    type="number"
                    value={width}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Max Height (px)</Label>
                  <Input
                    id="height"
                    min={1}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    type="number"
                    value={height}
                  />
                </div>
              </div>
              <p className="text-muted-foreground text-xs">
                Image will fit within these maximum dimensions while maintaining
                aspect ratio
              </p>

              <div className="space-y-2">
                <Label htmlFor="quality">Quality (1-100)</Label>
                <Input
                  id="quality"
                  max={100}
                  min={1}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  type="number"
                  value={quality}
                />
              </div>

              <Button
                className="w-full"
                disabled={!selectedImage || isProcessing}
                onClick={handleProcess}
              >
                {isProcessing ? "Processing..." : "Fit Image"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <ImagePreview
            error={error}
            isProcessing={isProcessing}
            processedImage={processedImage}
          />
        </div>
      </div>
    </div>
  );
}
