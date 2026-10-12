"use client";

import { useMemo, useRef, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  Eye,
  LayoutGrid,
  Monitor,
  Palette,
  RotateCcw,
  Save,
  Search,
  Smartphone,
  Sparkles,
  Store,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useIsMobile } from "@/hooks/useIsMobile";
import { PRODUCT_LAYOUT_CONFIG } from "@/lib/utils";
import {
  useGetCustomerStoreQuery,
  useUpdateStoreMutation,
} from "@/redux/api/storeApi";

export type ProductLayout =
  | "default"
  | "classic"
  | "compact"
  | "spacious"
  | "editorial";

interface StoreTheme {
  name: string;
  brandColor: string;
  backgroundColor: string;
  productLayout: ProductLayout;
}

interface ThemePreset extends StoreTheme {
  description: string;
  category: "Minimal" | "Fresh" | "Elegant" | "Bold";
}

const THEME_PRESETS: ThemePreset[] = [
  {
    name: "Clean",
    description: "Simple, timeless and easy to shop.",
    category: "Minimal",
    brandColor: "#111111",
    backgroundColor: "#FFFFFF",
    productLayout: "default",
  },
  {
    name: "Fresh Market",
    description: "Bright and welcoming for everyday products.",
    category: "Fresh",
    brandColor: "#278A4B",
    backgroundColor: "#F7FCF8",
    productLayout: "classic",
  },
  {
    name: "Coastal",
    description: "Cool, modern and spacious.",
    category: "Fresh",
    brandColor: "#2563EB",
    backgroundColor: "#F5F9FF",
    productLayout: "compact",
  },
  {
    name: "Rose",
    description: "Soft, stylish and perfect for boutiques.",
    category: "Elegant",
    brandColor: "#D83B67",
    backgroundColor: "#FFF7F9",
    productLayout: "editorial",
  },
  {
    name: "Clay",
    description: "Warm tones with a premium feel.",
    category: "Elegant",
    brandColor: "#A05A3A",
    backgroundColor: "#FFF8F2",
    productLayout: "spacious",
  },
  {
    name: "Sage",
    description: "Natural and calm with a refined look.",
    category: "Fresh",
    brandColor: "#557A63",
    backgroundColor: "#F5FAF6",
    productLayout: "classic",
  },
  {
    name: "Lavender",
    description: "Modern, soft and creative.",
    category: "Elegant",
    brandColor: "#7048B8",
    backgroundColor: "#FAF8FF",
    productLayout: "editorial",
  },
  {
    name: "Citrus",
    description: "Energetic and attention-grabbing.",
    category: "Bold",
    brandColor: "#D86B13",
    backgroundColor: "#FFF9F2",
    productLayout: "compact",
  },
  {
    name: "Studio",
    description: "Minimal with a sophisticated editorial feel.",
    category: "Minimal",
    brandColor: "#242424",
    backgroundColor: "#F5F1EA",
    productLayout: "spacious",
  },
  {
    name: "Sky",
    description: "Clean, friendly and contemporary.",
    category: "Fresh",
    brandColor: "#0284C7",
    backgroundColor: "#F0F9FF",
    productLayout: "default",
  },
  {
    name: "Plum",
    description: "Distinctive and luxurious.",
    category: "Elegant",
    brandColor: "#7E3F8F",
    backgroundColor: "#FBF7FC",
    productLayout: "editorial",
  },
  {
    name: "Graphite",
    description: "Strong contrast for a premium storefront.",
    category: "Bold",
    brandColor: "#30343B",
    backgroundColor: "#F4F5F6",
    productLayout: "classic",
  },
];

const LAYOUT_OPTIONS: Array<{
  id: ProductLayout;
  name: string;
  description: string;
}> = [
  {
    id: "default",
    name: "Default",
    description: "Clean and balanced",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional product grid",
  },
  {
    id: "compact",
    name: "Compact",
    description: "More products at once",
  },
  {
    id: "spacious",
    name: "Spacious",
    description: "Large premium cards",
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Fashion-inspired layout",
  },
];

const MOCK_PRODUCTS = [
  {
    name: "Classic Denim Jacket",
    price: "₦28,000",
    category: "Fashion",
  },
  {
    name: "Leather Backpack",
    price: "₦42,500",
    category: "Accessories",
  },
  {
    name: "Wireless Headphones",
    price: "₦85,000",
    category: "Electronics",
  },
  {
    name: "Fitness Watch",
    price: "₦65,000",
    category: "Electronics",
  },
  {
    name: "Luxury Office Chair",
    price: "₦120,000",
    category: "Furniture",
  },
  {
    name: "Bluetooth Speaker",
    price: "₦24,999",
    category: "Electronics",
  },
];

function isProductLayout(value: unknown): value is ProductLayout {
  return (
    value === "default" ||
    value === "classic" ||
    value === "compact" ||
    value === "spacious" ||
    value === "editorial"
  );
}

function isHexColor(value: string) {
  return /^#[0-9A-F]{6}$/i.test(value.trim());
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");

  if (clean.length !== 6) return null;

  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function getLuminance(hex: string) {
  const rgb = hexToRgb(hex);

  if (!rgb) return 0;

  const values = [rgb.r, rgb.g, rgb.b].map((value) => {
    const normalized = value / 255;

    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function getContrastRatio(first: string, second: string) {
  if (!isHexColor(first) || !isHexColor(second)) return 0;

  const firstLum = getLuminance(first);
  const secondLum = getLuminance(second);

  const lighter = Math.max(firstLum, secondLum);
  const darker = Math.min(firstLum, secondLum);

  return (lighter + 0.05) / (darker + 0.05);
}

function getContrastText(background: string) {
  if (!isHexColor(background)) return "#FFFFFF";

  return getContrastRatio(background, "#FFFFFF") >= 4.5 ? "#FFFFFF" : "#111111";
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function StoreAppearancePage() {
  const {
    data: user,
    isLoading: userDataLoading,
    isError,
  } = useGetCustomerStoreQuery();

  const userData = user?.data?.store;

  const [updateStore, { isLoading: isUpdating }] = useUpdateStoreMutation();

  const isMobile = useIsMobile();

  const [theme, setTheme] = useState<StoreTheme | null>(null);
  const [savedTheme, setSavedTheme] = useState<StoreTheme | null>(null);

  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">(
    "desktop",
  );

  const [activeTab, setActiveTab] = useState<"themes" | "colors" | "layout">(
    "themes",
  );

  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [themeFilter, setThemeFilter] = useState("All");
  const [showAllThemes, setShowAllThemes] = useState(false);

  const initializedStoreId = useRef<string | null>(null);
  const previewRef = useRef<HTMLElement | null>(null);

  /*
   * Initialize from API.
   *
   * No localStorage is intentionally used here.
   */
  if (userData && initializedStoreId.current !== String(userData.id)) {
    const serverTheme: StoreTheme = {
      name: "Custom",
      brandColor: userData.brand_color ?? "#111111",
      backgroundColor: userData.background_color ?? "#FFFFFF",
      productLayout: isProductLayout(userData.product_layout)
        ? userData.product_layout
        : "default",
    };

    setTheme(serverTheme);
    setSavedTheme(serverTheme);
    initializedStoreId.current = String(userData.id);
  }

  const hasChanges = useMemo(() => {
    if (!theme || !savedTheme) return false;

    return (
      theme.brandColor !== savedTheme.brandColor ||
      theme.backgroundColor !== savedTheme.backgroundColor ||
      theme.productLayout !== savedTheme.productLayout
    );
  }, [theme, savedTheme]);

  const selectedPreset = useMemo(() => {
    if (!theme) return null;

    return (
      THEME_PRESETS.find(
        (preset) =>
          preset.brandColor.toLowerCase() === theme.brandColor.toLowerCase() &&
          preset.backgroundColor.toLowerCase() ===
            theme.backgroundColor.toLowerCase() &&
          preset.productLayout === theme.productLayout,
      ) ?? null
    );
  }, [theme]);

  const contrastRatio = useMemo(() => {
    if (!theme) return 0;

    return getContrastRatio(theme.brandColor, "#FFFFFF");
  }, [theme]);

  const brandContrastIsGood = contrastRatio >= 4.5;

  const layout = useMemo(() => {
    if (!theme) return PRODUCT_LAYOUT_CONFIG.default;

    return (
      PRODUCT_LAYOUT_CONFIG[theme.productLayout] ??
      PRODUCT_LAYOUT_CONFIG.default
    );
  }, [theme]);

  const visibleThemes = useMemo(() => {
    const filtered =
      themeFilter === "All"
        ? THEME_PRESETS
        : THEME_PRESETS.filter((preset) => preset.category === themeFilter);

    return showAllThemes ? filtered : filtered.slice(0, 6);
  }, [themeFilter, showAllThemes]);

  function scrollToPreviewOnMobile() {
    if (!isMobile) return;

    requestAnimationFrame(() => {
      previewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function selectPreset(preset: ThemePreset) {
    setTheme({
      name: preset.name,
      brandColor: preset.brandColor,
      backgroundColor: preset.backgroundColor,
      productLayout: preset.productLayout,
    });

    setSaved(false);
    setSaveError("");

    scrollToPreviewOnMobile();
  }

  function updateColor(field: "brandColor" | "backgroundColor", value: string) {
    let clean = value.replace(/[^0-9a-fA-F#]/g, "");

    if (clean && !clean.startsWith("#")) {
      clean = `#${clean}`;
    }

    clean = `#${clean.replace(/^#+/, "").slice(0, 6)}`;

    setTheme((current) =>
      current
        ? {
            ...current,
            name: "Custom",
            [field]: clean,
          }
        : current,
    );

    setSaved(false);
    setSaveError("");
  }

  function updateLayout(productLayout: ProductLayout) {
    setTheme((current) =>
      current
        ? {
            ...current,
            name: "Custom",
            productLayout,
          }
        : current,
    );

    setSaved(false);
    setSaveError("");
    scrollToPreviewOnMobile();
  }

  async function saveTheme() {
    if (!theme) return;

    setSaveError("");

    if (!isHexColor(theme.brandColor)) {
      setSaveError("Please enter a valid brand color.");
      return;
    }

    if (!isHexColor(theme.backgroundColor)) {
      setSaveError("Please enter a valid background color.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("brand_color", theme.brandColor);
      formData.append("background_color", theme.backgroundColor);
      formData.append("product_layout", theme.productLayout);

      await updateStore(formData).unwrap();

      const matchingPreset = THEME_PRESETS.find(
        (preset) =>
          preset.brandColor.toLowerCase() === theme.brandColor.toLowerCase() &&
          preset.backgroundColor.toLowerCase() ===
            theme.backgroundColor.toLowerCase() &&
          preset.productLayout === theme.productLayout,
      );

      const nextTheme = {
        ...theme,
        name: matchingPreset?.name ?? "Custom",
      };

      setTheme(nextTheme);
      setSavedTheme(nextTheme);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setSaveError(
        "We couldn't save your storefront appearance. Please try again.",
      );
    }
  }

  function resetTheme() {
    if (!savedTheme) return;

    setTheme({ ...savedTheme });
    setSaveError("");
    setSaved(false);
  }

  if (userDataLoading || !theme) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
          <p className="text-sm text-neutral-500">Loading your storefront...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <X size={22} />
          </div>

          <h2 className="text-lg font-semibold text-neutral-900">
            Unable to load your storefront
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Something went wrong while loading your appearance settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#F6F7F9]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm sm:flex">
              <Palette size={18} className="text-neutral-700" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-[15px] font-semibold text-neutral-950 sm:text-base">
                  Store appearance
                </h1>

                <span
                  className={cx(
                    "hidden rounded-full px-2 py-0.5 text-[11px] font-medium sm:inline-flex",
                    hasChanges
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700",
                  )}
                >
                  {hasChanges ? "Unsaved changes" : "Saved"}
                </span>
              </div>

              <p className="hidden text-xs text-neutral-500 sm:block">
                Customize how customers experience your store.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasChanges && (
              <button
                type="button"
                onClick={resetTheme}
                disabled={isUpdating}
                className="hidden h-9 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-600 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50 sm:flex"
              >
                <RotateCcw size={15} />
                Reset
              </button>
            )}

            <button
              type="button"
              onClick={saveTheme}
              disabled={!hasChanges || isUpdating}
              className={cx(
                "flex h-9 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition",
                hasChanges
                  ? "bg-neutral-950 text-white shadow-sm hover:bg-neutral-800"
                  : "bg-neutral-200 text-neutral-400",
              )}
            >
              {isUpdating ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Saving
                </>
              ) : saved ? (
                <>
                  <Check size={15} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={15} />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-5 pb-28 sm:px-6 lg:px-8 lg:py-7">
        {saveError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <X size={18} className="mt-0.5 shrink-0" />
            <span>{saveError}</span>
          </motion.div>
        )}

        <div className="grid gap-6 xl:grid-cols-[390px_minmax(0,1fr)]">
          {/* SETTINGS */}
          <aside className="space-y-5">
            {/* Appearance controls */}
            <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              {/* Tabs */}
              <div className="border-b border-neutral-200 px-4 pt-3">
                <div className="flex gap-1">
                  {(
                    [
                      {
                        id: "themes",
                        label: "Themes",
                        icon: Sparkles,
                      },
                      {
                        id: "colors",
                        label: "Colors",
                        icon: Palette,
                      },
                      {
                        id: "layout",
                        label: "Layout",
                        icon: LayoutGrid,
                      },
                    ] as const
                  ).map((tab) => {
                    const Icon = tab.icon;
                    const active = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={cx(
                          "relative flex flex-1 items-center justify-center gap-1.5 rounded-t-lg px-2 py-3 text-xs font-semibold transition",
                          active
                            ? "text-neutral-950"
                            : "text-neutral-400 hover:text-neutral-700",
                        )}
                      >
                        <Icon size={14} />

                        <span>{tab.label}</span>

                        {active && (
                          <motion.span
                            layoutId="appearance-tab-indicator"
                            className="absolute bottom-[-1px] left-0 right-0 h-0.5 rounded-full bg-neutral-950"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ------------------------------------------------------------------ */}
              {/* THEMES TAB                                                         */}
              {/* ------------------------------------------------------------------ */}

              {activeTab === "themes" && (
                <div>
                  <div className="border-b border-neutral-100 px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-semibold text-neutral-950">
                          Choose a style
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-neutral-500">
                          Start with a ready-made style, then customize it.
                        </p>
                      </div>

                      {selectedPreset && (
                        <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-semibold text-neutral-600">
                          {selectedPreset.name}
                        </span>
                      )}
                    </div>

                    {/* Theme filters */}
                    <div className="mt-4 flex gap-1 overflow-x-auto pb-1">
                      {["All", "Minimal", "Fresh", "Elegant", "Bold"].map(
                        (filter) => (
                          <button
                            key={filter}
                            type="button"
                            onClick={() => {
                              setThemeFilter(filter);
                              setShowAllThemes(false);
                            }}
                            className={cx(
                              "shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium transition",
                              themeFilter === filter
                                ? "bg-neutral-950 text-white"
                                : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200",
                            )}
                          >
                            {filter}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-4">
                    {visibleThemes.map((preset) => {
                      const selected =
                        theme.brandColor.toLowerCase() ===
                          preset.brandColor.toLowerCase() &&
                        theme.backgroundColor.toLowerCase() ===
                          preset.backgroundColor.toLowerCase() &&
                        theme.productLayout === preset.productLayout;

                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => selectPreset(preset)}
                          aria-pressed={selected}
                          className={cx(
                            "group relative overflow-hidden rounded-xl border text-left transition-all",
                            selected
                              ? "border-neutral-950 ring-2 ring-neutral-950/10"
                              : "border-neutral-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md",
                          )}
                        >
                          {/* Mini storefront */}
                          <div
                            className="relative h-[104px] overflow-hidden p-2.5"
                            style={{
                              backgroundColor: preset.backgroundColor,
                            }}
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <div className="h-2 w-8 rounded-full bg-neutral-900/80" />

                              <div
                                className="h-4 w-4 rounded-full"
                                style={{
                                  backgroundColor: preset.brandColor,
                                }}
                              />
                            </div>

                            <div
                              className={cx(
                                "grid h-[58px] gap-1.5",
                                preset.productLayout === "spacious"
                                  ? "grid-cols-1"
                                  : "grid-cols-2",
                              )}
                            >
                              {[0, 1, 2, 3].map((item) => (
                                <div
                                  key={item}
                                  className="rounded-[5px] bg-white/90 shadow-sm"
                                >
                                  <div
                                    className="h-5 rounded-t-[5px]"
                                    style={{
                                      backgroundColor: `${preset.brandColor}18`,
                                    }}
                                  />
                                </div>
                              ))}
                            </div>

                            {selected && (
                              <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-950 text-white shadow-sm">
                                <Check size={12} strokeWidth={3} />
                              </div>
                            )}
                          </div>

                          {/* Theme information */}
                          <div className="border-t border-neutral-100 bg-white px-3 py-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate text-xs font-semibold text-neutral-900">
                                {preset.name}
                              </span>

                              <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full border border-black/10"
                                style={{
                                  backgroundColor: preset.brandColor,
                                }}
                              />
                            </div>

                            <p className="mt-0.5 line-clamp-1 text-[10px] text-neutral-400">
                              {preset.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {THEME_PRESETS.filter(
                    (preset) =>
                      themeFilter === "All" || preset.category === themeFilter,
                  ).length > 6 && (
                    <div className="border-t border-neutral-100 px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setShowAllThemes((value) => !value)}
                        className="flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-neutral-600 transition hover:text-neutral-950"
                      >
                        {showAllThemes ? "Show fewer" : "View all styles"}

                        <ChevronRight
                          size={14}
                          className={cx(
                            "transition-transform",
                            showAllThemes && "rotate-90",
                          )}
                        />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* COLORS TAB                                                         */}
              {/* ------------------------------------------------------------------ */}

              {activeTab === "colors" && (
                <div>
                  <div className="border-b border-neutral-100 px-5 py-4">
                    <h2 className="text-sm font-semibold text-neutral-950">
                      Brand colors
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      Fine-tune the colors customers see across your store.
                    </p>
                  </div>

                  <div className="space-y-5 p-5">
                    {/* Color preview */}
                    <div className="overflow-hidden rounded-xl border border-neutral-200">
                      <div
                        className="flex h-24 items-center justify-center"
                        style={{
                          backgroundColor: theme.backgroundColor,
                        }}
                      >
                        <div
                          className="rounded-xl px-5 py-3 text-xs font-semibold shadow-sm"
                          style={{
                            backgroundColor: theme.brandColor,
                            color: getContrastText(theme.brandColor),
                          }}
                        >
                          Your brand
                        </div>
                      </div>

                      <div className="grid grid-cols-2 divide-x border-t border-neutral-200">
                        <div className="p-3">
                          <p className="text-[10px] text-neutral-400">Brand</p>

                          <p className="mt-1 font-mono text-xs font-semibold text-neutral-900">
                            {theme.brandColor.toUpperCase()}
                          </p>
                        </div>

                        <div className="p-3">
                          <p className="text-[10px] text-neutral-400">
                            Background
                          </p>

                          <p className="mt-1 font-mono text-xs font-semibold text-neutral-900">
                            {theme.backgroundColor.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <ColorField
                      label="Brand color"
                      description="Buttons, accents and highlights"
                      value={theme.brandColor}
                      onChange={(value) => updateColor("brandColor", value)}
                    />

                    <ColorField
                      label="Store background"
                      description="Main storefront background"
                      value={theme.backgroundColor}
                      onChange={(value) =>
                        updateColor("backgroundColor", value)
                      }
                    />

                    {/* Contrast */}
                    <div
                      className={cx(
                        "rounded-xl border px-3.5 py-3",
                        brandContrastIsGood
                          ? "border-emerald-100 bg-emerald-50"
                          : "border-amber-100 bg-amber-50",
                      )}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={cx(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                            brandContrastIsGood
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700",
                          )}
                        >
                          {brandContrastIsGood ? (
                            <Check size={12} strokeWidth={3} />
                          ) : (
                            <span className="text-[10px] font-bold">!</span>
                          )}
                        </div>

                        <div>
                          <p
                            className={cx(
                              "text-xs font-semibold",
                              brandContrastIsGood
                                ? "text-emerald-800"
                                : "text-amber-800",
                            )}
                          >
                            {brandContrastIsGood
                              ? "Good button contrast"
                              : "Consider a darker brand color"}
                          </p>

                          <p
                            className={cx(
                              "mt-0.5 text-[11px] leading-4",
                              brandContrastIsGood
                                ? "text-emerald-700"
                                : "text-amber-700",
                            )}
                          >
                            {brandContrastIsGood
                              ? "Your brand color works well with white button text."
                              : "This color may be difficult to read with white button text."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------------ */}
              {/* LAYOUT TAB                                                         */}
              {/* ------------------------------------------------------------------ */}

              {activeTab === "layout" && (
                <div>
                  <div className="border-b border-neutral-100 px-5 py-4">
                    <h2 className="text-sm font-semibold text-neutral-950">
                      Product layout
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-neutral-500">
                      Choose how your products are presented to customers.
                    </p>
                  </div>

                  <div className="space-y-2 p-4">
                    {LAYOUT_OPTIONS.map((option) => {
                      const selected = theme.productLayout === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => updateLayout(option.id)}
                          aria-pressed={selected}
                          className={cx(
                            "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition",
                            selected
                              ? "border-neutral-950 bg-neutral-50"
                              : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50",
                          )}
                        >
                          <LayoutThumbnail
                            layout={option.id}
                            selected={selected}
                            brandColor={theme.brandColor}
                            backgroundColor={theme.backgroundColor}
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-semibold text-neutral-900">
                                {option.name}
                              </span>

                              {selected && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-950 text-white">
                                  <Check size={11} strokeWidth={3} />
                                </span>
                              )}
                            </div>

                            <p className="mt-0.5 text-[11px] text-neutral-400">
                              {option.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Current layout */}
                  <div className="mx-4 mb-4 rounded-xl border border-neutral-100 bg-neutral-50 px-3.5 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium text-neutral-400">
                        Current layout
                      </span>

                      <span className="text-xs font-semibold capitalize text-neutral-900">
                        {theme.productLayout}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </aside>

          {/* PREVIEW */}
          <section ref={previewRef} className="min-w-0 scroll-mt-24">
            <div className="sticky top-[76px]">
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                {/* Preview toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
                      <Eye size={15} className="text-neutral-600" />
                    </div>

                    <div>
                      <h2 className="text-xs font-semibold text-neutral-900">
                        Live preview
                      </h2>

                      <p className="hidden text-[10px] text-neutral-400 sm:block">
                        Changes appear instantly
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1">
                    <PreviewDeviceButton
                      active={previewDevice === "desktop"}
                      onClick={() => setPreviewDevice("desktop")}
                      icon={<Monitor size={14} />}
                      label="Desktop"
                    />

                    <PreviewDeviceButton
                      active={previewDevice === "mobile"}
                      onClick={() => setPreviewDevice("mobile")}
                      icon={<Smartphone size={14} />}
                      label="Mobile"
                    />
                  </div>
                </div>

                {/* Preview area */}
                <div className="min-h-[680px] bg-[#ECEEF1] p-3 sm:p-6 lg:p-8">
                  <div
                    className={cx(
                      "mx-auto transition-all duration-500",
                      previewDevice === "desktop" ? "w-full" : "max-w-[390px]",
                    )}
                  >
                    {previewDevice === "mobile" ? (
                      <PhonePreview theme={theme} layout={layout} />
                    ) : (
                      <DesktopPreview theme={theme} layout={layout} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile save bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:hidden"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetTheme}
                disabled={isUpdating}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600"
              >
                <RotateCcw size={15} />
                Reset
              </button>

              <button
                type="button"
                onClick={saveTheme}
                disabled={isUpdating}
                className="flex h-11 flex-[1.5] items-center justify-center gap-2 rounded-xl bg-neutral-950 text-sm font-semibold text-white"
              >
                {isUpdating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    Save changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Color Field                                                                */
/* -------------------------------------------------------------------------- */

function ColorField({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const valid = isHexColor(value);

  return (
    <div>
      <div className="mb-2.5">
        <p className="text-xs font-semibold text-neutral-900">{label}</p>

        <p className="mt-0.5 text-[11px] text-neutral-400">{description}</p>
      </div>

      <div
        className={cx(
          "flex items-center gap-3 rounded-xl border bg-white p-2 transition",
          valid
            ? "border-neutral-200 focus-within:border-neutral-400"
            : "border-red-300",
        )}
      >
        <label className="relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-black/10">
          <input
            type="color"
            value={valid ? value : "#000000"}
            onChange={(event) => onChange(event.target.value.toUpperCase())}
            className="absolute inset-[-8px] h-[calc(100%+16px)] w-[calc(100%+16px)] cursor-pointer opacity-0"
          />

          <span
            className="block h-full w-full"
            style={{
              backgroundColor: valid ? value : "#000000",
            }}
          />
        </label>

        <div className="min-w-0 flex-1">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            maxLength={7}
            spellCheck={false}
            className="w-full bg-transparent font-mono text-sm font-medium uppercase text-neutral-900 outline-none placeholder:text-neutral-300"
            placeholder="#000000"
          />

          <p className="mt-0.5 text-[10px] text-neutral-400">HEX color</p>
        </div>

        {valid && (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={14} />
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Layout Thumbnail                                                           */
/* -------------------------------------------------------------------------- */

function LayoutThumbnail({
  layout,
  selected,
  brandColor,
  backgroundColor,
}: {
  layout: ProductLayout;
  selected: boolean;
  brandColor: string;
  backgroundColor: string;
}) {
  const items = layout === "spacious" ? 2 : layout === "editorial" ? 3 : 4;

  return (
    <div
      className={cx(
        "flex h-12 w-[68px] shrink-0 overflow-hidden rounded-lg border p-1.5",
        selected ? "border-neutral-300" : "border-neutral-200",
      )}
      style={{
        backgroundColor,
      }}
    >
      <div
        className={cx(
          "grid w-full gap-1",
          layout === "spacious"
            ? "grid-cols-1"
            : layout === "editorial"
              ? "grid-cols-2"
              : "grid-cols-2",
        )}
      >
        {Array.from({ length: items }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-[3px] bg-white">
            <div
              className="h-2/3"
              style={{
                backgroundColor: `${brandColor}${
                  layout === "editorial" && index === 0 ? "35" : "18"
                }`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Preview Device Button                                                      */
/* -------------------------------------------------------------------------- */

function PreviewDeviceButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[10px] font-semibold transition",
        active
          ? "bg-white text-neutral-900 shadow-sm"
          : "text-neutral-400 hover:text-neutral-700",
      )}
      aria-pressed={active}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop Preview                                                            */
/* -------------------------------------------------------------------------- */

function DesktopPreview({ theme, layout }: { theme: StoreTheme; layout: any }) {
  const buttonText = getContrastText(theme.brandColor);

  return (
    <motion.div
      key={`${theme.brandColor}-${theme.backgroundColor}-${theme.productLayout}`}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      className="overflow-hidden rounded-xl border border-neutral-300 bg-white shadow-2xl shadow-black/10"
    >
      {/* Browser bar */}
      <div className="flex h-10 items-center gap-2 border-b border-neutral-200 bg-[#F8F8F8] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />

        <div className="mx-auto flex h-6 max-w-md flex-1 items-center justify-center rounded-md border border-neutral-200 bg-white px-3">
          <span className="truncate text-[9px] text-neutral-400">
            lumished.com/store/sonias-store
          </span>
        </div>

        <div className="w-[54px]" />
      </div>

      <Storefront theme={theme} layout={layout} buttonText={buttonText} />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Phone Preview                                                              */
/* -------------------------------------------------------------------------- */

function PhonePreview({ theme, layout }: { theme: StoreTheme; layout: any }) {
  const buttonText = getContrastText(theme.brandColor);

  return (
    <div className="mx-auto max-w-[370px]">
      <div className="rounded-[38px] bg-[#161616] p-2 shadow-2xl shadow-black/20">
        <div className="overflow-hidden rounded-[31px] bg-white">
          <div className="flex h-7 items-center justify-center bg-white">
            <div className="h-4 w-24 rounded-full bg-black" />
          </div>

          <div className="max-h-[650px] overflow-hidden">
            <Storefront
              theme={theme}
              layout={layout}
              buttonText={buttonText}
              mobile
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Storefront                                                                 */
/* -------------------------------------------------------------------------- */

function Storefront({
  theme,
  layout,
  buttonText,
  mobile = false,
}: {
  theme: StoreTheme;
  layout: any;
  buttonText: string;
  mobile?: boolean;
}) {
  const gridClass =
    theme.productLayout === "compact"
      ? "grid grid-cols-2 gap-2.5"
      : theme.productLayout === "spacious"
        ? "grid grid-cols-1 gap-5"
        : theme.productLayout === "editorial"
          ? "grid grid-cols-2 gap-x-3 gap-y-6"
          : "grid grid-cols-2 gap-3";

  return (
    <div
      className="min-h-[640px]"
      style={{
        backgroundColor: theme.backgroundColor,
      }}
    >
      {/* Store header */}
      <header className="border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
        <div
          className={cx(
            "mx-auto flex items-center justify-between gap-5 px-6 py-4",
            mobile ? "px-4 py-3" : "max-w-6xl",
          )}
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
              style={{
                backgroundColor: theme.brandColor,
                color: buttonText,
              }}
            >
              S
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-neutral-950">
                Sonia&apos;s Store
              </h3>

              <p className="truncate text-[10px] text-neutral-400">
                Fashion, lifestyle & more
              </p>
            </div>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-lg px-3 py-2 text-[10px] font-semibold"
            style={{
              backgroundColor: theme.brandColor,
              color: buttonText,
            }}
          >
            WhatsApp
          </button>
        </div>
      </header>

      {/* Hero / Store intro */}
      <div
        className={cx("mx-auto", mobile ? "px-4 py-7" : "max-w-6xl px-6 py-10")}
      >
        <div className="flex items-end justify-between gap-5">
          <div>
            <p
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{
                color: theme.brandColor,
              }}
            >
              Welcome
            </p>

            <h2
              className={cx(
                "font-bold tracking-tight text-neutral-950",
                mobile ? "text-xl" : "text-2xl",
              )}
            >
              Our collection
            </h2>

            <p className="mt-1 max-w-md text-[11px] leading-5 text-neutral-500">
              Discover our latest products and contact us directly to place your
              order.
            </p>
          </div>

          {!mobile && (
            <div className="hidden rounded-lg border border-black/[0.07] bg-white px-3 py-2 sm:flex">
              <Search size={13} className="text-neutral-400" />
              <span className="ml-2 text-[10px] text-neutral-400">
                Search products
              </span>
            </div>
          )}
        </div>

        {/* Category chips */}
        <div className="mt-6 flex gap-2 overflow-hidden">
          {["All", "Fashion", "Accessories", "Electronics"].map(
            (category, index) => (
              <div
                key={category}
                className="shrink-0 rounded-full px-3 py-1.5 text-[9px] font-semibold"
                style={{
                  backgroundColor:
                    index === 0 ? theme.brandColor : "rgba(0,0,0,0.045)",
                  color: index === 0 ? buttonText : "rgba(0,0,0,0.55)",
                }}
              >
                {category}
              </div>
            ),
          )}
        </div>

        {/* Products */}
        <div className={cx("mt-7", gridClass)}>
          {MOCK_PRODUCTS.map((product, index) => (
            <PreviewProductCard
              key={product.name}
              product={product}
              index={index}
              theme={theme}
              layout={layout}
              buttonText={buttonText}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-black/[0.06] px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <Store size={12} className="text-neutral-400" />

          <span className="text-[9px] font-medium text-neutral-400">
            Powered by Lumished
          </span>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Preview Product Card                                                       */
/* -------------------------------------------------------------------------- */

function PreviewProductCard({
  product,
  index,
  theme,
  layout,
  buttonText,
}: {
  product: (typeof MOCK_PRODUCTS)[number];
  index: number;
  theme: StoreTheme;
  layout: any;
  buttonText: string;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: index * 0.025,
      }}
      className={cx(
        "group overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-sm transition-shadow hover:shadow-md",
        theme.productLayout === "editorial" && index === 0 && "col-span-2",
      )}
    >
      {/* Product image */}
      <div
        className={cx(
          "relative overflow-hidden",
          theme.productLayout === "spacious"
            ? "aspect-[2/1]"
            : theme.productLayout === "editorial" && index === 0
              ? "aspect-[2.3/1]"
              : "aspect-square",
        )}
        style={{
          background: `linear-gradient(135deg, ${theme.brandColor}18, ${theme.brandColor}05)`,
        }}
      >
        <div
          className="absolute inset-[15%] rounded-full opacity-70 blur-[1px]"
          style={{
            backgroundColor: `${theme.brandColor}16`,
          }}
        />

        <div
          className="absolute bottom-[18%] left-[24%] h-[42%] w-[52%] rotate-[-7deg] rounded-[18%]"
          style={{
            backgroundColor: `${theme.brandColor}32`,
          }}
        />

        <div
          className="absolute right-3 top-3 rounded-full px-2 py-1 text-[8px] font-semibold"
          style={{
            backgroundColor: theme.brandColor,
            color: buttonText,
          }}
        >
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className={cx("p-3", theme.productLayout === "compact" && "p-2.5")}>
        <h3 className="line-clamp-1 text-[11px] font-semibold text-neutral-900">
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-1 text-[9px] text-neutral-400">
          Quality product from Sonia&apos;s Store.
        </p>

        {/* Price */}
        <div className="mt-3">
          <span className="text-[11px] font-bold text-neutral-950">
            {product.price}
          </span>
        </div>

        {/* Full width order button */}
        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center rounded-lg px-3 py-2 text-[9px] font-semibold transition-all hover:opacity-90"
          style={{
            backgroundColor: theme.brandColor,
            color: buttonText,
          }}
        >
          Order via WhatsApp
        </button>
      </div>
    </motion.article>
  );
}
