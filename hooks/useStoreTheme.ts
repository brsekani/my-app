// src/hooks/useStoreTheme.ts

"use client";

import { useEffect, useState } from "react";
import type { StoreTheme } from "@/types/store-theme";

const STORAGE_KEY = "storeface-store-theme";

export const DEFAULT_STORE_THEME: StoreTheme = {
  name: "Fresh Market",
  brandColor: "#27AE60",
  backgroundColor: "#FFFFFF",
  productLayout: "classic",
};

export function useStoreTheme() {
  const [storeTheme, setStoreTheme] = useState<StoreTheme>(DEFAULT_STORE_THEME);

  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem(STORAGE_KEY);

      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme) as StoreTheme;

        setStoreTheme({
          ...DEFAULT_STORE_THEME,
          ...parsedTheme,
        });
      }
    } catch (error) {
      console.error("Unable to load store theme:", error);
    } finally {
      setThemeLoaded(true);
    }
  }, []);

  return {
    storeTheme,
    themeLoaded,
  };
}
