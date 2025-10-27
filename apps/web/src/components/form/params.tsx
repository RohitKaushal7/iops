import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

// ==================== Integer Parameters ====================

type IntParamProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  id: string;
  description?: string;
};

export function IntParam({
  value,
  onChange,
  min,
  max,
  label,
  id,
  description,
}: IntParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        max={max}
        min={min}
        onChange={(e) => onChange(Number(e.target.value))}
        type="number"
        value={value}
      />
      {description && (
        <p className="text-muted-foreground text-xs">{description}</p>
      )}
    </div>
  );
}

// Width Parameter
type WidthParamProps = {
  value: number;
  onChange: (value: number) => void;
  label?: string;
};

export function WidthParam({
  value,
  onChange,
  label = "Width (px)",
}: WidthParamProps) {
  return (
    <IntParam
      id="width"
      label={label}
      min={1}
      onChange={onChange}
      value={value}
    />
  );
}

// Height Parameter
type HeightParamProps = {
  value: number;
  onChange: (value: number) => void;
  label?: string;
};

export function HeightParam({
  value,
  onChange,
  label = "Height (px)",
}: HeightParamProps) {
  return (
    <IntParam
      id="height"
      label={label}
      min={1}
      onChange={onChange}
      value={value}
    />
  );
}

// Quality Parameter
type QualityParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function QualityParam({ value, onChange }: QualityParamProps) {
  return (
    <IntParam
      description="JPEG image quality between 1-100"
      id="quality"
      label="Quality"
      max={100}
      min={1}
      onChange={onChange}
      value={value}
    />
  );
}

// Compression Parameter
type CompressionParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function CompressionParam({ value, onChange }: CompressionParamProps) {
  return (
    <IntParam
      description="PNG compression level (0-9)"
      id="compression"
      label="Compression"
      max={9}
      min={0}
      onChange={onChange}
      value={value}
    />
  );
}

// Top Parameter
type TopParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function TopParam({ value, onChange }: TopParamProps) {
  return (
    <IntParam
      description="Top edge position"
      id="top"
      label="Top (px)"
      min={0}
      onChange={onChange}
      value={value}
    />
  );
}

// Left Parameter
type LeftParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function LeftParam({ value, onChange }: LeftParamProps) {
  return (
    <IntParam
      description="Left edge position"
      id="left"
      label="Left (px)"
      min={0}
      onChange={onChange}
      value={value}
    />
  );
}

// Area Width Parameter
type AreaWidthParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function AreaWidthParam({ value, onChange }: AreaWidthParamProps) {
  return (
    <IntParam
      id="areawidth"
      label="Area Width (px)"
      min={1}
      onChange={onChange}
      value={value}
    />
  );
}

// Area Height Parameter
type AreaHeightParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function AreaHeightParam({ value, onChange }: AreaHeightParamProps) {
  return (
    <IntParam
      id="areaheight"
      label="Area Height (px)"
      min={1}
      onChange={onChange}
      value={value}
    />
  );
}

// Rotate Parameter
type RotateParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function RotateParam({ value, onChange }: RotateParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="rotate">Rotation Angle</Label>
      <Select onValueChange={(v) => onChange(Number(v))} value={String(value)}>
        <SelectTrigger id="rotate">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="90">90°</SelectItem>
          <SelectItem value="180">180°</SelectItem>
          <SelectItem value="270">270°</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-muted-foreground text-xs">Must be multiple of 90</p>
    </div>
  );
}

// Margin Parameter
type MarginParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function MarginParam({ value, onChange }: MarginParamProps) {
  return (
    <IntParam
      description="Text area margin for watermark"
      id="margin"
      label="Margin (px)"
      min={0}
      onChange={onChange}
      value={value}
    />
  );
}

// DPI Parameter
type DPIParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function DPIParam({ value, onChange }: DPIParamProps) {
  return (
    <IntParam
      description="DPI value for watermark"
      id="dpi"
      label="DPI"
      min={1}
      onChange={onChange}
      value={value}
    />
  );
}

// Text Width Parameter
type TextWidthParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function TextWidthParam({ value, onChange }: TextWidthParamProps) {
  return (
    <IntParam
      description="Text area width for watermark"
      id="textwidth"
      label="Text Width (px)"
      min={1}
      onChange={onChange}
      value={value}
    />
  );
}

// ==================== Float/Slider Parameters ====================

// Opacity Parameter
type OpacityParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function OpacityParam({ value, onChange }: OpacityParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="opacity">Opacity: {value.toFixed(2)}</Label>
      <Slider
        id="opacity"
        max={1}
        min={0}
        onValueChange={(vals) => onChange(vals[0])}
        step={0.1}
        value={[value]}
      />
      <p className="text-muted-foreground text-xs">
        Opacity level (0.0 to 1.0)
      </p>
    </div>
  );
}

// Factor Parameter (for zoom)
type FactorParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function FactorParam({ value, onChange }: FactorParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="factor">Zoom Factor: {value}x</Label>
      <Slider
        id="factor"
        max={10}
        min={1}
        onValueChange={(vals) => onChange(vals[0])}
        step={0.5}
        value={[value]}
      />
      <p className="text-muted-foreground text-xs">Zoom level from 1x to 10x</p>
    </div>
  );
}

// Sigma Parameter
type SigmaParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function SigmaParam({ value, onChange }: SigmaParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="sigma">Sigma: {value.toFixed(1)}</Label>
      <Slider
        id="sigma"
        max={50}
        min={0.1}
        onValueChange={(vals) => onChange(vals[0])}
        step={0.1}
        value={[value]}
      />
      <p className="text-muted-foreground text-xs">
        Size of the gaussian mask (higher = more blur)
      </p>
    </div>
  );
}

// MinAmpl Parameter
type MinAmplParamProps = {
  value: number;
  onChange: (value: number) => void;
};

export function MinAmplParam({ value, onChange }: MinAmplParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="minampl">Min Amplitude: {value.toFixed(1)}</Label>
      <Slider
        id="minampl"
        max={2}
        min={0.1}
        onValueChange={(vals) => onChange(vals[0])}
        step={0.1}
        value={[value]}
      />
      <p className="text-muted-foreground text-xs">
        Minimum amplitude of the gaussian filter
      </p>
    </div>
  );
}

// ==================== Boolean Parameters ====================

type BoolParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  id: string;
  description?: string;
};

export function BoolParam({
  value,
  onChange,
  label,
  id,
  description,
}: BoolParamProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={value}
        id={id}
        onCheckedChange={(checked) => onChange(checked === true)}
      />
      <div className="space-y-1">
        <Label className="cursor-pointer" htmlFor={id}>
          {label}
        </Label>
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
      </div>
    </div>
  );
}

// Force Parameter
type ForceParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function ForceParam({ value, onChange }: ForceParamProps) {
  return (
    <BoolParam
      description="Force image transformation to exact dimensions"
      id="force"
      label="Force resize"
      onChange={onChange}
      value={value}
    />
  );
}

// NoCrop Parameter
type NoCropParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function NoCropParam({ value, onChange }: NoCropParamProps) {
  return (
    <BoolParam
      description="Disable crop transformation (maintain aspect ratio)"
      id="nocrop"
      label="No crop"
      onChange={onChange}
      value={value}
    />
  );
}

// Flip Parameter
type FlipParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function FlipParam({ value, onChange }: FlipParamProps) {
  return (
    <BoolParam
      description="Transform image with flip operation (vertical)"
      id="flip"
      label="Flip"
      onChange={onChange}
      value={value}
    />
  );
}

// Flop Parameter
type FlopParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function FlopParam({ value, onChange }: FlopParamProps) {
  return (
    <BoolParam
      description="Transform image with flop operation (horizontal)"
      id="flop"
      label="Flop"
      onChange={onChange}
      value={value}
    />
  );
}

// NoRotation Parameter
type NoRotationParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function NoRotationParam({ value, onChange }: NoRotationParamProps) {
  return (
    <BoolParam
      description="Disable auto rotation based on EXIF orientation"
      id="norotation"
      label="No rotation"
      onChange={onChange}
      value={value}
    />
  );
}

// NoProfile Parameter
type NoProfileParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function NoProfileParam({ value, onChange }: NoProfileParamProps) {
  return (
    <BoolParam
      description="Disable adding ICC profile metadata"
      id="noprofile"
      label="No profile"
      onChange={onChange}
      value={value}
    />
  );
}

// StripMeta Parameter
type StripMetaParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function StripMetaParam({ value, onChange }: StripMetaParamProps) {
  return (
    <BoolParam
      description="Remove original image metadata (EXIF)"
      id="stripmeta"
      label="Strip metadata"
      onChange={onChange}
      value={value}
    />
  );
}

// Embed Parameter
type EmbedParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function EmbedParam({ value, onChange }: EmbedParamProps) {
  return (
    <BoolParam
      description="Embed image in the center of the canvas"
      id="embed"
      label="Embed"
      onChange={onChange}
      value={value}
    />
  );
}

// Palette Parameter
type PaletteParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function PaletteParam({ value, onChange }: PaletteParamProps) {
  return (
    <BoolParam
      description="Enable 8-bit quantisation (PNG only)"
      id="palette"
      label="Palette"
      onChange={onChange}
      value={value}
    />
  );
}

// Interlace Parameter
type InterlaceParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function InterlaceParam({ value, onChange }: InterlaceParamProps) {
  return (
    <BoolParam
      description="Use progressive/interlaced format"
      id="interlace"
      label="Interlace"
      onChange={onChange}
      value={value}
    />
  );
}

// NoReplicate Parameter
type NoReplicateParamProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export function NoReplicateParam({ value, onChange }: NoReplicateParamProps) {
  return (
    <BoolParam
      description="Disable text replication in watermark"
      id="noreplicate"
      label="No replicate"
      onChange={onChange}
      value={value}
    />
  );
}

// ==================== String Parameters ====================

// Text Parameter
type TextParamProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TextParam({ value, onChange }: TextParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="text">Watermark Text</Label>
      <Textarea
        id="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter watermark text"
        rows={2}
        value={value}
      />
    </div>
  );
}

// Font Parameter
type FontParamProps = {
  value: string;
  onChange: (value: string) => void;
};

export function FontParam({ value, onChange }: FontParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="font">Font</Label>
      <Input
        id="font"
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., sans bold 48"
        value={value}
      />
      <p className="text-muted-foreground text-xs">
        Format: font-family style size (e.g., sans bold 48)
      </p>
    </div>
  );
}

// Color Parameter
type ColorParamProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ColorParam({ value, onChange }: ColorParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="color">Text Color (RGB)</Label>
      <Input
        id="color"
        onChange={(e) => onChange(e.target.value)}
        placeholder="255,255,255"
        value={value}
      />
      <p className="text-muted-foreground text-xs">
        Format: R,G,B (e.g., 255,255,255 for white)
      </p>
    </div>
  );
}

// Background Parameter
type BackgroundParamProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BackgroundParam({ value, onChange }: BackgroundParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="background">Background Color (RGB)</Label>
      <Input
        id="background"
        onChange={(e) => onChange(e.target.value)}
        placeholder="255,255,255"
        value={value}
      />
      <p className="text-muted-foreground text-xs">
        Format: R,G,B for flattening transparent images
      </p>
    </div>
  );
}

// WatermarkImage Parameter
type WatermarkImageParamProps = {
  value: string;
  onChange: (value: string) => void;
};

export function WatermarkImageParam({
  value,
  onChange,
}: WatermarkImageParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="watermark-url">Watermark Image URL</Label>
      <Input
        id="watermark-url"
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/watermark.png"
        type="url"
        value={value}
      />
    </div>
  );
}

// AspectRatio Parameter
type AspectRatioParamProps = {
  value: string;
  onChange: (value: string) => void;
};

export function AspectRatioParam({ value, onChange }: AspectRatioParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="aspectratio">Aspect Ratio</Label>
      <Input
        id="aspectratio"
        onChange={(e) => onChange(e.target.value)}
        placeholder="16:9"
        value={value}
      />
      <p className="text-muted-foreground text-xs">
        Format: width:height (e.g., 16:9)
      </p>
    </div>
  );
}

// ==================== Select Parameters ====================

// Type/Format Parameter
type TypeParamProps = {
  value: string;
  onChange: (value: string) => void;
  formats?: string[];
};

export function TypeParam({
  value,
  onChange,
  formats = ["jpeg", "png", "webp"],
}: TypeParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="type">Output Format</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger id="type">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formats.map((format) => (
            <SelectItem key={format} value={format}>
              {format.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Gravity Parameter
type GravityParamProps = {
  value: string;
  onChange: (value: string) => void;
};

export function GravityParam({ value, onChange }: GravityParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="gravity">Gravity</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger id="gravity">
          <SelectValue placeholder="Select gravity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="north">North</SelectItem>
          <SelectItem value="south">South</SelectItem>
          <SelectItem value="east">East</SelectItem>
          <SelectItem value="west">West</SelectItem>
          <SelectItem value="centre">Centre</SelectItem>
          <SelectItem value="center">Center</SelectItem>
          <SelectItem value="smart">Smart</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-muted-foreground text-xs">
        Define the crop operation gravity
      </p>
    </div>
  );
}

// Colorspace Parameter
type ColorspaceParamProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ColorspaceParam({ value, onChange }: ColorspaceParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="colorspace">Color Space</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger id="colorspace">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="srgb">sRGB</SelectItem>
          <SelectItem value="bw">Black & White</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

// Extend Parameter
type ExtendParamProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ExtendParam({ value, onChange }: ExtendParamProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="extend">Extend Mode</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger id="extend">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="black">Black</SelectItem>
          <SelectItem value="white">White</SelectItem>
          <SelectItem value="copy">Copy</SelectItem>
          <SelectItem value="mirror">Mirror</SelectItem>
          <SelectItem value="lastpixel">Last Pixel</SelectItem>
          <SelectItem value="background">Background</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-muted-foreground text-xs">
        Image extend mode when edges are extended
      </p>
    </div>
  );
}
