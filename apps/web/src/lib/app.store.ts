import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppStore = {
  apiBaseUrl: string;
  setApiBaseUrl: (url: string) => void;
};

const defaultApiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      apiBaseUrl: defaultApiBaseUrl,
      setApiBaseUrl: (url: string) => set({ apiBaseUrl: url }),
    }),
    {
      name: "app-storage",
    }
  )
);
