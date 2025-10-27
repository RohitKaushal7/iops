import { Selection } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import ReactCrop, { type Crop, convertToPixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  AreaHeightParam,
  AreaWidthParam,
  AspectRatioParam,
  BackgroundParam,
  ColorspaceParam,
  CompressionParam,
  EmbedParam,
  ExtendParam,
  FlipParam,
  FlopParam,
  ForceParam,
  HeightParam,
  InterlaceParam,
  LeftParam,
  MinAmplParam,
  NoProfileParam,
  NoRotationParam,
  PaletteParam,
  QualityParam,
  RotateParam,
  SigmaParam,
  StripMetaParam,
  TopParam,
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

export const Route = createFileRoute("/extract")({
  component: ExtractComponent,
});

function ExtractComponent() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [actualImageDimensions, setActualImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Extract params
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [areawidth, setAreawidth] = useState(500);
  const [areaheight, setAreaheight] = useState(400);

  // Basic params
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [quality, setQuality] = useState(80);
  const [compression, setCompression] = useState(6);
  const [type, setType] = useState("jpeg");

  // Transform params
  const [force, setForce] = useState(false);
  const [embed, setEmbed] = useState(false);
  const [rotate, setRotate] = useState(90);
  const [flip, setFlip] = useState(false);
  const [flop, setFlop] = useState(false);
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
    if (file instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (typeof file === "string") {
      setImagePreview(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleProcess = async () => {
    if (!selectedImage) return;

    const params: Record<string, string | number | boolean> = {
      top,
      left,
      areawidth,
      areaheight,
    };

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
    if (rotate !== 90) params.rotate = rotate;
    if (flip) params.flip = flip;
    if (flop) params.flop = flop;
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
      endpoint: "/extract",
      params,
      image: selectedImage,
    });
  };

  const applyCropDimensions = () => {
    if (crop && actualImageDimensions) {
      // Convert crop to pixel values based on actual image dimensions
      const pixelCrop = convertToPixelCrop(
        crop,
        actualImageDimensions.width,
        actualImageDimensions.height
      );

      // Ensure values don't exceed image dimensions
      setLeft(Math.min(Math.round(pixelCrop.x), actualImageDimensions.width));
      setTop(Math.min(Math.round(pixelCrop.y), actualImageDimensions.height));
      setAreawidth(
        Math.min(
          Math.round(pixelCrop.width),
          actualImageDimensions.width - Math.round(pixelCrop.x)
        )
      );
      setAreaheight(
        Math.min(
          Math.round(pixelCrop.height),
          actualImageDimensions.height - Math.round(pixelCrop.y)
        )
      );
    }
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (!imagePreview) return;

    const updateDimensions = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setActualImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      }
    };

    if (img.complete) {
      updateDimensions();
    } else {
      img.addEventListener("load", updateDimensions);
      return () => img.removeEventListener("load", updateDimensions);
    }
  }, [imagePreview]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <Selection size={32} weight="duotone" />
        <div>
          <h1 className="font-bold text-3xl">Extract Area</h1>
          <p className="text-muted-foreground">
            Extract specific area from image by coordinates
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ImageUploader
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
          />

          {imagePreview && (
            <Card>
              <CardHeader>
                <CardTitle>Visual Crop (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactCrop crop={crop} onChange={(_, c) => setCrop(c)}>
                  <img
                    alt="Crop preview"
                    className="max-w-full"
                    ref={imgRef}
                    src={imagePreview}
                  />
                </ReactCrop>
                {actualImageDimensions && (
                  <p className="mt-2 text-muted-foreground text-sm">
                    Actual image size: {actualImageDimensions.width} x{" "}
                    {actualImageDimensions.height}px
                  </p>
                )}
                {crop &&
                  actualImageDimensions &&
                  (() => {
                    const pixelCrop = convertToPixelCrop(
                      crop,
                      actualImageDimensions.width,
                      actualImageDimensions.height
                    );
                    return (
                      <Button
                        className="mt-4"
                        onClick={applyCropDimensions}
                        size="sm"
                        variant="outline"
                      >
                        Apply Crop ({Math.round(pixelCrop.x)},{" "}
                        {Math.round(pixelCrop.y)}, {Math.round(pixelCrop.width)}{" "}
                        x {Math.round(pixelCrop.height)}px)
                      </Button>
                    );
                  })()}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Extract Parameters</CardTitle>
              <CardDescription>
                All parameters supported by the /extract endpoint
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
                    <TopParam onChange={setTop} value={top} />
                    <LeftParam onChange={setLeft} value={left} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <AreaWidthParam onChange={setAreawidth} value={areawidth} />
                    <AreaHeightParam
                      onChange={setAreaheight}
                      value={areaheight}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <WidthParam
                      label="Output Width (optional)"
                      onChange={setWidth}
                      value={width}
                    />
                    <HeightParam
                      label="Output Height (optional)"
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
                  <RotateParam onChange={setRotate} value={rotate} />

                  <AspectRatioParam
                    onChange={setAspectratio}
                    value={aspectratio}
                  />

                  <Separator />

                  <div className="space-y-3">
                    <FlipParam onChange={setFlip} value={flip} />
                    <FlopParam onChange={setFlop} value={flop} />
                  </div>

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
                {isProcessing ? "Processing..." : "Extract Area"}
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
