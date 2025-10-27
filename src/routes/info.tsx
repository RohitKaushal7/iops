import { Info as InfoIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImageUploader } from "@/components/image-uploader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/app.store";

export const Route = createFileRoute("/info")({
  component: InfoComponent,
});

type ImageInfo = {
  width: number;
  height: number;
  type: string;
  space: string;
  hasAlpha: boolean;
  hasProfile: boolean;
  channels: number;
  orientation: number;
};

function InfoComponent() {
  const apiBaseUrl = useAppStore((state) => state.apiBaseUrl);
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File | string | null) => {
    setSelectedImage(file);
    setImageInfo(null);
    setError(null);
  };

  const handleGetInfo = async () => {
    if (!selectedImage) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageInfo(null);

    try {
      let url = `${apiBaseUrl}/info`;

      if (typeof selectedImage === "string") {
        const queryParams = new URLSearchParams({ url: selectedImage });
        url = `${url}?${queryParams.toString()}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to get image info: ${response.statusText}`);
        }

        const data = await response.json();
        setImageInfo(data);
      } else {
        const formData = new FormData();
        formData.append("file", selectedImage);

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to get image info: ${response.statusText}`);
        }

        const data = await response.json();
        setImageInfo(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <InfoIcon size={32} weight="duotone" />
        <div>
          <h1 className="font-bold text-3xl">Image Information</h1>
          <p className="text-muted-foreground">
            Get detailed metadata and information about your image
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
              <CardTitle>Get Image Info</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                disabled={!selectedImage || isLoading}
                onClick={handleGetInfo}
              >
                {isLoading ? "Getting Info..." : "Get Image Information"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Image Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <p className="text-muted-foreground text-sm">Loading...</p>
                </div>
              )}

              {error && !isLoading && (
                <div className="rounded-lg border-2 border-destructive/50 bg-destructive/10 p-4">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              {imageInfo && !isLoading && !error && (
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="font-medium text-sm">Dimensions</span>
                      <span className="text-muted-foreground text-sm">
                        {imageInfo.width} × {imageInfo.height} px
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="font-medium text-sm">Format</span>
                      <Badge variant="secondary">
                        {imageInfo.type.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="font-medium text-sm">Color Space</span>
                      <span className="text-muted-foreground text-sm">
                        {imageInfo.space}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="font-medium text-sm">Channels</span>
                      <span className="text-muted-foreground text-sm">
                        {imageInfo.channels}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="font-medium text-sm">Alpha Channel</span>
                      <Badge
                        variant={imageInfo.hasAlpha ? "default" : "secondary"}
                      >
                        {imageInfo.hasAlpha ? "Yes" : "No"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="font-medium text-sm">ICC Profile</span>
                      <Badge
                        variant={imageInfo.hasProfile ? "default" : "secondary"}
                      >
                        {imageInfo.hasProfile ? "Yes" : "No"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <span className="font-medium text-sm">Orientation</span>
                      <span className="text-muted-foreground text-sm">
                        {imageInfo.orientation}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <p className="mb-2 font-medium text-muted-foreground text-xs uppercase">
                      Raw JSON
                    </p>
                    <pre className="overflow-x-auto text-xs">
                      {JSON.stringify(imageInfo, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {!(imageInfo || isLoading || error) && (
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed py-12">
                  <p className="text-muted-foreground text-sm">
                    Upload an image to see its metadata
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
