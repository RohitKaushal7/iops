import { useState } from "react";
import { API_BASE_URL } from "./constants";

type ProcessImageOptions = {
  endpoint: string;
  params: Record<string, string | number | boolean>;
  image: File | string;
};

export function useImageProcessor() {
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processImage = async ({
    endpoint,
    params,
    image,
  }: ProcessImageOptions) => {
    setIsProcessing(true);
    setError(null);
    setProcessedImage(null);

    try {
      let url = `${API_BASE_URL}${endpoint}`;

      // If image is a URL string
      if (typeof image === "string") {
        const queryParams = new URLSearchParams({
          url: image,
          ...Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          ),
        });
        url = `${url}?${queryParams.toString()}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to process image: ${response.statusText}`);
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setProcessedImage(imageUrl);
      } else {
        // If image is a File
        const formData = new FormData();
        formData.append("file", image);

        const queryParams = new URLSearchParams(
          Object.fromEntries(
            Object.entries(params).map(([key, value]) => [key, String(value)])
          )
        );
        url = `${url}?${queryParams.toString()}`;

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to process image: ${response.statusText}`);
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setProcessedImage(imageUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setProcessedImage(null);
    setError(null);
    setIsProcessing(false);
  };

  return {
    processedImage,
    isProcessing,
    error,
    processImage,
    reset,
  };
}
