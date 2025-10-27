import { ArrowsLeftRight } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImagePreview } from "@/components/image-preview";
import { ImageUploader } from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useImageProcessor } from "@/lib/use-image-processor";

export const Route = createFileRoute("/convert")({
  component: ConvertComponent,
});

function ConvertComponent() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );
  const [outputType, setOutputType] = useState("jpeg");
  const [quality, setQuality] = useState(80);
  const [compression, setCompression] = useState(6);

  const { processedImage, isProcessing, error, processImage } =
    useImageProcessor();

  const handleImageSelect = (file: File | string | null) => {
    setSelectedImage(file);
  };

  const handleProcess = async () => {
    if (!selectedImage) return;

    const params: Record<string, string | number> = {
      type: outputType,
    };

    if (outputType === "jpeg") {
      params.quality = quality;
    } else if (outputType === "png") {
      params.compression = compression;
    }

    await processImage({
      endpoint: "/convert",
      params,
      image: selectedImage,
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <ArrowsLeftRight size={32} weight="duotone" />
        <div>
          <h1 className="font-bold text-3xl">Convert Image Format</h1>
          <p className="text-muted-foreground">
            Convert image between JPEG, PNG, and WEBP formats
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
              <CardTitle>Convert Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Output Format</Label>
                <Select onValueChange={setOutputType} value={outputType}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="webp">WEBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {outputType === "jpeg" && (
                <div className="space-y-2">
                  <Label htmlFor="quality">JPEG Quality (1-100)</Label>
                  <Input
                    id="quality"
                    max={100}
                    min={1}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    type="number"
                    value={quality}
                  />
                </div>
              )}

              {outputType === "png" && (
                <div className="space-y-2">
                  <Label htmlFor="compression">PNG Compression (0-9)</Label>
                  <Input
                    id="compression"
                    max={9}
                    min={0}
                    onChange={(e) => setCompression(Number(e.target.value))}
                    type="number"
                    value={compression}
                  />
                  <p className="text-muted-foreground text-xs">
                    Higher values = smaller file size (slower)
                  </p>
                </div>
              )}

              <Button
                className="w-full"
                disabled={!selectedImage || isProcessing}
                onClick={handleProcess}
              >
                {isProcessing ? "Processing..." : "Convert Image"}
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
