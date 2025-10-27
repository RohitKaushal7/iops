import { Images } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImagePreview } from "@/components/image-preview";
import { ImageUploader } from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useImageProcessor } from "@/lib/use-image-processor";

export const Route = createFileRoute("/watermarkimage")({
  component: WatermarkImageComponent,
});

function WatermarkImageComponent() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );
  const [watermarkUrl, setWatermarkUrl] = useState("");
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [opacity, setOpacity] = useState(0.5);
  const [quality, setQuality] = useState(80);

  const { processedImage, isProcessing, error, processImage } =
    useImageProcessor();

  const handleImageSelect = (file: File | string | null) => {
    setSelectedImage(file);
  };

  const handleProcess = async () => {
    if (!(selectedImage && watermarkUrl)) return;

    const params: Record<string, string | number> = {
      image: watermarkUrl,
      top,
      left,
      opacity,
      quality,
    };

    await processImage({
      endpoint: "/watermarkimage",
      params,
      image: selectedImage,
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <Images size={32} weight="duotone" />
        <div>
          <h1 className="font-bold text-3xl">Image Watermark</h1>
          <p className="text-muted-foreground">
            Add image watermark to your image
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
              <CardTitle>Watermark Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="watermark-url">Watermark Image URL</Label>
                <Input
                  id="watermark-url"
                  onChange={(e) => setWatermarkUrl(e.target.value)}
                  placeholder="https://example.com/watermark.png"
                  type="url"
                  value={watermarkUrl}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="top">Top Position (px)</Label>
                  <Input
                    id="top"
                    min={0}
                    onChange={(e) => setTop(Number(e.target.value))}
                    type="number"
                    value={top}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="left">Left Position (px)</Label>
                  <Input
                    id="left"
                    min={0}
                    onChange={(e) => setLeft(Number(e.target.value))}
                    type="number"
                    value={left}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="opacity">Opacity: {opacity}</Label>
                <Slider
                  id="opacity"
                  max={1}
                  min={0}
                  onValueChange={(value) => setOpacity(value[0])}
                  step={0.1}
                  value={[opacity]}
                />
              </div>

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
                disabled={!(selectedImage && watermarkUrl) || isProcessing}
                onClick={handleProcess}
              >
                {isProcessing ? "Processing..." : "Add Watermark"}
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
