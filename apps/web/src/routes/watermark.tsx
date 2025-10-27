import { TextT } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImagePreview } from "@/components/image-preview";
import { ImageUploader } from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useImageProcessor } from "@/lib/use-image-processor";

export const Route = createFileRoute("/watermark")({
  component: WatermarkComponent,
});

function WatermarkComponent() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );
  const [text, setText] = useState("Copyright © 2025");
  const [font, setFont] = useState("sans bold 48");
  const [opacity, setOpacity] = useState(0.5);
  const [color, setColor] = useState("255,255,255");
  const [quality, setQuality] = useState(80);

  const { processedImage, isProcessing, error, processImage } =
    useImageProcessor();

  const handleImageSelect = (file: File | string | null) => {
    setSelectedImage(file);
  };

  const handleProcess = async () => {
    if (!selectedImage) return;

    const params: Record<string, string | number> = {
      text,
      font,
      opacity,
      color,
      quality,
    };

    await processImage({
      endpoint: "/watermark",
      params,
      image: selectedImage,
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <TextT size={32} weight="duotone" />
        <div>
          <h1 className="font-bold text-3xl">Text Watermark</h1>
          <p className="text-muted-foreground">Add text watermark to image</p>
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
                <Label htmlFor="text">Watermark Text</Label>
                <Textarea
                  id="text"
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter watermark text"
                  rows={2}
                  value={text}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="font">Font</Label>
                <Input
                  id="font"
                  onChange={(e) => setFont(e.target.value)}
                  placeholder="e.g., sans bold 48"
                  value={font}
                />
                <p className="text-muted-foreground text-xs">
                  Format: font-family style size (e.g., sans bold 48)
                </p>
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
                <Label htmlFor="color">Text Color (RGB)</Label>
                <Input
                  id="color"
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="255,255,255"
                  value={color}
                />
                <p className="text-muted-foreground text-xs">
                  Format: R,G,B (e.g., 255,255,255 for white)
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
                disabled={!selectedImage || isProcessing || !text}
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
