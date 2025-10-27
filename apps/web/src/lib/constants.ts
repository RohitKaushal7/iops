export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type ImageOperation = {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  icon: string;
  category: "basic" | "transform" | "advanced" | "effects" | "info";
};

export const IMAGE_OPERATIONS: ImageOperation[] = [
  {
    id: "crop",
    name: "Crop",
    description: "Crop image by width and height maintaining aspect ratio",
    endpoint: "/crop",
    icon: "Crop",
    category: "basic",
  },
  {
    id: "smartcrop",
    name: "Smart Crop",
    description: "Intelligent crop using libvips algorithm",
    endpoint: "/smartcrop",
    icon: "MagicWand",
    category: "basic",
  },
  {
    id: "resize",
    name: "Resize",
    description: "Resize image by width or height",
    endpoint: "/resize",
    icon: "ArrowsOut",
    category: "basic",
  },
  {
    id: "enlarge",
    name: "Enlarge",
    description: "Enlarge image to specific dimensions",
    endpoint: "/enlarge",
    icon: "ArrowsOutSimple",
    category: "basic",
  },
  {
    id: "extract",
    name: "Extract",
    description: "Extract specific area from image",
    endpoint: "/extract",
    icon: "Selection",
    category: "advanced",
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Zoom image by factor",
    endpoint: "/zoom",
    icon: "MagnifyingGlassPlus",
    category: "advanced",
  },
  {
    id: "thumbnail",
    name: "Thumbnail",
    description: "Create thumbnail with specific dimensions",
    endpoint: "/thumbnail",
    icon: "ImageSquare",
    category: "advanced",
  },
  {
    id: "fit",
    name: "Fit",
    description: "Fit image within bounds without cropping",
    endpoint: "/fit",
    icon: "FrameCorners",
    category: "advanced",
  },
  {
    id: "rotate",
    name: "Rotate",
    description: "Rotate image by degrees (90, 180, 270)",
    endpoint: "/rotate",
    icon: "ArrowClockwise",
    category: "transform",
  },
  {
    id: "autorotate",
    name: "Auto Rotate",
    description: "Auto-rotate based on EXIF orientation",
    endpoint: "/autorotate",
    icon: "ArrowsClockwise",
    category: "transform",
  },
  {
    id: "flip",
    name: "Flip",
    description: "Flip image vertically",
    endpoint: "/flip",
    icon: "ArrowsVertical",
    category: "transform",
  },
  {
    id: "flop",
    name: "Flop",
    description: "Flop image horizontally",
    endpoint: "/flop",
    icon: "ArrowsHorizontal",
    category: "transform",
  },
  {
    id: "blur",
    name: "Blur",
    description: "Apply gaussian blur to image",
    endpoint: "/blur",
    icon: "Radical",
    category: "effects",
  },
  {
    id: "watermark",
    name: "Watermark",
    description: "Add text watermark to image",
    endpoint: "/watermark",
    icon: "TextT",
    category: "effects",
  },
  {
    id: "watermarkimage",
    name: "Watermark Image",
    description: "Add image watermark to image",
    endpoint: "/watermarkimage",
    icon: "Images",
    category: "effects",
  },
  {
    id: "convert",
    name: "Convert",
    description: "Convert image format (JPEG, PNG, WEBP)",
    endpoint: "/convert",
    icon: "ArrowsLeftRight",
    category: "effects",
  },
  {
    id: "info",
    name: "Info",
    description: "Get image metadata and information",
    endpoint: "/info",
    icon: "Info",
    category: "info",
  },
];

export const CATEGORIES = {
  basic: { name: "Basic Operations", color: "blue" },
  transform: { name: "Transform", color: "green" },
  advanced: { name: "Advanced", color: "purple" },
  effects: { name: "Effects", color: "orange" },
  info: { name: "Information", color: "gray" },
} as const;
