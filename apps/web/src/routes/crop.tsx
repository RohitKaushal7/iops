import { Crop as CropIcon } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  AspectRatioParam,
  BackgroundParam,
  ColorspaceParam,
  CompressionParam,
  EmbedParam,
  ExtendParam,
  FlipParam,
  FlopParam,
  ForceParam,
  GravityParam,
  HeightParam,
  InterlaceParam,
  MinAmplParam,
  NoProfileParam,
  NoRotationParam,
  QualityParam,
  RotateParam,
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

export const Route = createFileRoute("/crop")({
  component: CropComponent,
});

function CropComponent() {
  const [selectedImage, setSelectedImage] = useState<File | string | null>(
    null
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  // Basic params
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(400);
  const [gravity, setGravity] = useState("centre");
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
    if (!selectedImage) {
      return;
    }

    const params: Record<string, string | number | boolean> = {
      width,
      height,
      gravity,
    };

    // Optional params
    if (type === "jpeg") params.quality = quality;
    if (type === "png") params.compression = compression;
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
      endpoint: "/crop",
      params,
      image: selectedImage,
    });
  };

  const applyCropDimensions = () => {
    if (completedCrop) {
      setWidth(Math.round(completedCrop.width));
      setHeight(Math.round(completedCrop.height));
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <CropIcon size={32} weight="duotone" />
        <div>
          <h1 className="font-bold text-3xl">Crop Image</h1>
          <p className="text-muted-foreground">
            Crop image by width and height maintaining aspect ratio
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
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                >
                  <img
                    alt="Crop preview"
                    className="max-w-full"
                    ref={imgRef}
                    src={imagePreview}
                  />
                </ReactCrop>
                {completedCrop && (
                  <Button
                    className="mt-4"
                    onClick={applyCropDimensions}
                    size="sm"
                    variant="outline"
                  >
                    Apply Crop Dimensions ({Math.round(completedCrop.width)} x{" "}
                    {Math.round(completedCrop.height)})
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Crop Parameters</CardTitle>
              <CardDescription>
                All parameters supported by the /crop endpoint
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
                    <WidthParam onChange={setWidth} value={width} />
                    <HeightParam onChange={setHeight} value={height} />
                  </div>

                  <GravityParam onChange={setGravity} value={gravity} />

                  <TypeParam onChange={setType} value={type} />

                  {type === "jpeg" && (
                    <QualityParam onChange={setQuality} value={quality} />
                  )}

                  {type === "png" && (
                    <CompressionParam
                      onChange={setCompression}
                      value={compression}
                    />
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
                {isProcessing ? "Processing..." : "Crop Image"}
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
