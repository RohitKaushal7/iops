import { Radical } from "@phosphor-icons/react";
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

export const Route = createFileRoute("/blur")({
  component: BlurComponent,
});

function BlurComponent() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );
  const [sigma, setSigma] = useState(5);
  const [minampl, setMinampl] = useState(0.5);
  const [quality, setQuality] = useState(80);

  const { processedImage, isProcessing, error, processImage } =
    useImageProcessor();

  const handleImageSelect = (file: File | string | null) => {
    setSelectedImage(file);
  };

  const handleProcess = async () => {
    if (!selectedImage) return;

    const params: Record<string, string | number> = {
      sigma,
      minampl,
      quality,
    };

    await processImage({
      endpoint: "/blur",
      params,
      image: selectedImage,
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <Radical size={32} weight="duotone" />
        <div>
          <h1 className="font-bold text-3xl">Blur Image</h1>
          <p className="text-muted-foreground">Apply gaussian blur to image</p>
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
              <CardTitle>Blur Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sigma">Sigma: {sigma}</Label>
                <Slider
                  id="sigma"
                  max={50}
                  min={0.1}
                  onValueChange={(value) => setSigma(value[0])}
                  step={0.1}
                  value={[sigma]}
                />
                <p className="text-muted-foreground text-xs">
                  Size of the gaussian mask (higher = more blur)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minampl">Min Amplitude: {minampl}</Label>
                <Slider
                  id="minampl"
                  max={2}
                  min={0.1}
                  onValueChange={(value) => setMinampl(value[0])}
                  step={0.1}
                  value={[minampl]}
                />
                <p className="text-muted-foreground text-xs">
                  Minimum amplitude of the gaussian filter
                </p>
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
                disabled={!selectedImage || isProcessing}
                onClick={handleProcess}
              >
                {isProcessing ? "Processing..." : "Blur Image"}
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
