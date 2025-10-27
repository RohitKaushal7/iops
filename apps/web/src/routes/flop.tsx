import { ArrowsHorizontal } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AspectRatioParam,
  BackgroundParam,
  ColorspaceParam,
  CompressionParam,
  EmbedParam,
  ExtendParam,
  ForceParam,
  HeightParam,
  InterlaceParam,
  MinAmplParam,
  NoProfileParam,
  NoRotationParam,
  PaletteParam,
  QualityParam,
  SigmaParam,
  StripMetaParam,
  TypeParam,
  WidthParam,
} from "@/components/form/params";
import { ImagePreview } from "@/components/image-preview";
import { ImageUploader } from "@/components/image-uploader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useImageProcessor } from "@/lib/use-image-processor";

export const Route = createFileRoute("/flop")({
  component: FlopComponent,
});

function FlopComponent() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );

  // Basic params
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [quality, setQuality] = useState(80);
  const [compression, setCompression] = useState(6);
  const [type, setType] = useState("jpeg");

  // Transform params
  const [force, setForce] = useState(false);
  const [embed, setEmbed] = useState(false);
  const [aspectratio, setAspectratio] = useState("");

  // Advanced params
  const [extend, setExtend] = useState("mirror");
  const [background, setBackground] = useState("");
  const [colorspace, setColorspace] = useState("srgb");
  const [sigma, setSigma] = useState(0);
  const [minampl, setMinampl] = useState(0.5);

  // Metadata params
  const [norotation, setNorotation] = useState(false);
  const [noprofile, setNoprofile] = useState(false);
  const [stripmeta, setStripmeta] = useState(false);
  const [interlace, setInterlace] = useState(false);
  const [palette, setPalette] = useState(false);

  const { processedImage, isProcessing, error, processImage } =
    useImageProcessor();

  const handleImageSelect = (file: File | string | null) => {
    setSelectedImage(file);
  };

  const handleProcess = async () => {
    if (!selectedImage) return;

    const params: Record<string, string | number | boolean> = {};

    // Optional params
    if (width > 0) params.width = width;
    if (height > 0) params.height = height;
    if (type === "jpeg") params.quality = quality;
    if (type === "png") {
      params.compression = compression;
      if (palette) params.palette = palette;
    }
    if (type) params.type = type;
    if (force) params.force = force;
    if (embed) params.embed = embed;
    if (extend !== "mirror") params.extend = extend;
    if (background) params.background = background;
    if (colorspace !== "srgb") params.colorspace = colorspace;
    if (sigma > 0) {
      params.sigma = sigma;
      params.minampl = minampl;
    }
    if (norotation) params.norotation = norotation;
    if (noprofile) params.noprofile = noprofile;
    if (stripmeta) params.stripmeta = stripmeta;
    if (interlace) params.interlace = interlace;
    if (aspectratio) params.aspectratio = aspectratio;

    await processImage({
      endpoint: "/flop",
      params,
      image: selectedImage,
    });
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <ArrowsHorizontal size={32} weight="duotone" />
        <div>
          <h1 className="font-bold text-3xl">Flop Image</h1>
          <p className="text-muted-foreground">Flop image horizontally</p>
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
              <CardTitle>Flop Parameters</CardTitle>
              <CardDescription>
                All parameters supported by the /flop endpoint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs className="w-full" defaultValue="basic">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="transform">Transform</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent className="space-y-4" value="basic">
                  <div className="grid grid-cols-2 gap-4">
                    <WidthParam
                      label="Width (px) - Optional"
                      onChange={setWidth}
                      value={width}
                    />
                    <HeightParam
                      label="Height (px) - Optional"
                      onChange={setHeight}
                      value={height}
                    />
                  </div>

                  <TypeParam onChange={setType} value={type} />

                  {type === "jpeg" && (
                    <QualityParam onChange={setQuality} value={quality} />
                  )}

                  {type === "png" && (
                    <>
                      <CompressionParam
                        onChange={setCompression}
                        value={compression}
                      />
                      <PaletteParam onChange={setPalette} value={palette} />
                    </>
                  )}

                  <Separator />

                  <div className="space-y-3">
                    <ForceParam onChange={setForce} value={force} />
                    <EmbedParam onChange={setEmbed} value={embed} />
                  </div>
                </TabsContent>

                <TabsContent className="space-y-4" value="transform">
                  <AspectRatioParam
                    onChange={setAspectratio}
                    value={aspectratio}
                  />

                  <Separator />

                  <ExtendParam onChange={setExtend} value={extend} />

                  {extend === "background" && (
                    <BackgroundParam
                      onChange={setBackground}
                      value={background}
                    />
                  )}
                </TabsContent>

                <TabsContent className="space-y-4" value="advanced">
                  <ColorspaceParam
                    onChange={setColorspace}
                    value={colorspace}
                  />

                  <Separator />

                  <div className="space-y-2">
                    <p className="font-medium text-sm">Blur Settings</p>
                    <SigmaParam onChange={setSigma} value={sigma} />
                    {sigma > 0 && (
                      <MinAmplParam onChange={setMinampl} value={minampl} />
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <p className="font-medium text-sm">Metadata Options</p>
                    <NoRotationParam
                      onChange={setNorotation}
                      value={norotation}
                    />
                    <NoProfileParam onChange={setNoprofile} value={noprofile} />
                    <StripMetaParam onChange={setStripmeta} value={stripmeta} />
                    <InterlaceParam onChange={setInterlace} value={interlace} />
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                className="mt-6 w-full"
                disabled={!selectedImage || isProcessing}
                onClick={handleProcess}
              >
                {isProcessing ? "Processing..." : "Flop Image"}
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
