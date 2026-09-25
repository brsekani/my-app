"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { PRODUCT_LAYOUT_CONFIG } from "@/lib/utils";
import {
  useGetCustomerStoreQuery,
  useUpdateStoreMutation,
} from "@/redux/api/storeApi";
import { useEffect, useMemo, useRef, useState } from "react";

export type ProductLayout =
  | "default"
  | "classic"
  | "compact"
  | "spacious"
  | "editorial"
  | "showcase";

interface StoreTheme {
  name: string;
  brandColor: string;
  backgroundColor: string;
  productLayout: ProductLayout;
}

const isProductLayout = (value: unknown): value is ProductLayout => {
  return (
    value === "default" ||
    value === "classic" ||
    value === "compact" ||
    value === "spacious" ||
    value === "editorial" ||
    value === "showcase"
  );
};

type PreviewDevice = "desktop" | "mobile";

const STORE_STYLE_PRESETS: StoreTheme[] = [
  {
    name: "Default",
    brandColor: "#111111",
    backgroundColor: "#FFFFFF",
    productLayout: "default",
  },
  {
    name: "Fresh Market",
    brandColor: "#27AE60",
    backgroundColor: "#FFFFFF",
    productLayout: "classic",
  },
  {
    name: "Ocean Blue",
    brandColor: "#2563EB",
    backgroundColor: "#F8FAFC",
    productLayout: "compact",
  },
  {
    name: "Luxury Noir",
    brandColor: "#171717",
    backgroundColor: "#F7F3EC",
    productLayout: "spacious",
  },
  {
    name: "Rose Boutique",
    brandColor: "#E11D48",
    backgroundColor: "#FFF1F2",
    productLayout: "editorial",
  },
  // {
  //   name: "Sunset Deals",
  //   brandColor: "#F97316",
  //   backgroundColor: "#FFF7ED",
  //   productLayout: "showcase",
  // },
];

const PRODUCT_LAYOUTS: {
  value: ProductLayout;
  label: string;
  description: string;
}[] = [
  {
    value: "default",
    label: "Default",
    description: "The original clean Storeface storefront.",
  },
  {
    value: "classic",
    label: "Classic Grid",
    description: "Balanced cards for general stores.",
  },
  {
    value: "compact",
    label: "Compact Grid",
    description: "Displays more products at once.",
  },
  {
    value: "spacious",
    label: "Large Cards",
    description: "Larger images with a premium look.",
  },
  {
    value: "editorial",
    label: "Modern Showcase",
    description: "A clean fashion and lifestyle layout.",
  },
  // {
  //   value: "showcase",
  //   label: "Featured Showcase",
  //   description: "Highlights selected products with larger cards.",
  // },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    price: "₦28,000",
  },
  {
    id: 2,
    name: "Leather Backpack",
    price: "₦42,500",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: "₦85,000",
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    price: "₦65,000",
  },
  {
    id: 5,
    name: "Luxury Office Chair",
    price: "₦120,000",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: "₦24,999",
  },
];

const isHexColor = (value: string) =>
  /^#([0-9A-F]{3}){1,2}$/i.test(value.trim());

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

  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>("desktop");

  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  const previewRef = useRef<HTMLElement | null>(null);

  /**
   * Keeps track of the store that has already been initialized.
   *
   * This is important because RTK Query can refetch the store after
   * an update. We do not want a refetch to overwrite unsaved changes
   * currently being edited by the user.
   */
  const initializedStoreId = useRef<string | null>(null);

  /**
   * Initialize the editor from the API.
   *
   * There is intentionally NO localStorage here.
   */
  useEffect(() => {
    if (!userData) return;

    const storeId = String(userData.id ?? "current-store");

    if (initializedStoreId.current === storeId) {
      return;
    }

    const serverTheme: StoreTheme = {
      name: "Custom style",
      brandColor: userData.brand_color ?? "#111111",
      backgroundColor: userData.background_color ?? "#FFFFFF",
      productLayout: isProductLayout(userData.product_layout)
        ? userData.product_layout
        : "default",
    };
    setTheme(serverTheme);
    setSavedTheme(serverTheme);

    initializedStoreId.current = storeId;
  }, [userData]);

  /**
   * Scroll to preview on mobile after a change.
   */
  const scrollToPreviewOnMobile = () => {
    if (!isMobile) {
      return;
    }

    window.requestAnimationFrame(() => {
      previewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  /**
   * Compare the editable theme with the last saved API state.
   */
  const hasChanges = useMemo(() => {
    if (!theme || !savedTheme) {
      return false;
    }

    return (
      theme.brandColor !== savedTheme.brandColor ||
      theme.backgroundColor !== savedTheme.backgroundColor ||
      theme.productLayout !== savedTheme.productLayout
    );
  }, [theme, savedTheme]);

  /**
   * Do not render the editor until the API theme has been loaded.
   */
  const layout = useMemo(() => {
    if (!theme) {
      return PRODUCT_LAYOUT_CONFIG.default;
    }

    return (
      PRODUCT_LAYOUT_CONFIG[
        theme.productLayout as keyof typeof PRODUCT_LAYOUT_CONFIG
      ] ?? PRODUCT_LAYOUT_CONFIG.default
    );
  }, [theme]);

  /**
   * Select one of the predefined themes.
   */
  const selectPreset = (preset: StoreTheme) => {
    setTheme({
      ...preset,
    });

    setSaved(false);
    setSaveError("");

    scrollToPreviewOnMobile();
  };

  /**
   * Update either brand or background color.
   */
  const updateColor = (
    key: "brandColor" | "backgroundColor",
    value: string,
  ) => {
    setTheme((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        name: "Custom style",
        [key]: value,
      };
    });

    setSaved(false);
    setSaveError("");
  };

  /**
   * Update product layout.
   */
  const updateLayout = (productLayout: ProductLayout) => {
    setTheme((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        name: "Custom style",
        productLayout,
      };
    });

    setSaved(false);
    setSaveError("");

    scrollToPreviewOnMobile();
  };

  /**
   * Save the current editor state to the backend.
   *
   * The backend/API is the source of truth.
   */
  const saveTheme = async () => {
    if (!theme) {
      return;
    }

    if (!isHexColor(theme.brandColor) || !isHexColor(theme.backgroundColor)) {
      setSaveError("Please enter valid hex colors before saving.");
      return;
    }

    setSaveError("");
    setSaved(false);

    const formData = new FormData();

    formData.append("brand_color", theme.brandColor);
    formData.append("background_color", theme.backgroundColor);
    formData.append("product_layout", theme.productLayout);

    try {
      const response = await updateStore(formData).unwrap();

      console.log("Store updated:", response);

      /**
       * The current editor state is now the last successfully
       * saved state.
       */
      setSavedTheme({
        ...theme,
      });

      setSaved(true);

      scrollToPreviewOnMobile();

      window.setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      console.error("Failed to update store:", error);

      setSaveError("We couldn't save your changes. Please try again.");
    }
  };

  /**
   * Reset only discards unsaved changes.
   *
   * It does NOT reset to the hardcoded Default theme.
   * It restores the last successfully saved API state.
   */
  const resetTheme = () => {
    if (!savedTheme) {
      return;
    }

    setTheme({
      ...savedTheme,
    });

    setSaved(false);
    setSaveError("");

    scrollToPreviewOnMobile();
  };

  /**
   * Product grid changes depending on preview device and layout.
   */
  const previewGridClass = useMemo(() => {
    if (!theme) {
      return "grid grid-cols-2 gap-3";
    }

    if (previewDevice === "desktop") {
      return layout.grid;
    }

    switch (theme.productLayout) {
      case "compact":
        return "grid grid-cols-2 gap-2";

      case "spacious":
        return "grid grid-cols-1 gap-5";

      case "editorial":
        return "grid grid-cols-2 gap-x-3 gap-y-6";

      case "showcase":
        return "grid grid-cols-2 auto-rows-[190px] gap-3";

      case "classic":
      case "default":
      default:
        return "grid grid-cols-2 gap-3";
    }
  }, [layout.grid, previewDevice, theme]);

  /**
   * Initial loading state.
   */
  if (userDataLoading || !theme || !savedTheme) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#F7F7F8]">
        <div className="text-center">
          <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-[#E5E5E5] border-t-[#111111]" />

          <p className="text-sm text-[#777777]">Loading store appearance…</p>
        </div>
      </div>
    );
  }

  /**
   * API error state.
   */
  if (isError) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#F7F7F8] px-5">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-red-50 text-red-600">
            !
          </div>

          <h2 className="font-semibold text-[#111111]">
            Failed to load store appearance
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#777777]">
            We couldn't load your store settings. Please refresh the page and
            try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-360">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-4 border-b border-[#E5E5E5] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-[14px] font-medium uppercase tracking-[0.18em]">
              Store settings
            </p>

            <p className="text-[14px] text-[#777777]">
              Pick a style, customize it, and preview what customers will see.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={resetTheme}
              disabled={!hasChanges || isUpdating}
              className="rounded-lg border border-[#D9D9D9] bg-white px-4 py-2.5 text-sm font-semibold text-[#333333] transition hover:bg-[#F1F1F1] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset
            </button>

            <button
              type="button"
              disabled={!hasChanges || isUpdating}
              onClick={saveTheme}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: theme.brandColor,
              }}
            >
              {isUpdating ? "Saving..." : saved ? "Saved ✓" : "Save changes"}
            </button>
          </div>
        </header>

        {/* Save error */}
        {saveError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {saveError}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[350px_minmax(0,1fr)]">
          {/* Settings */}
          <aside className="space-y-5">
            {/* Store styles */}
            <section className="rounded-2xl border border-[#E5E5E5] bg-white p-5">
              <div className="mb-4">
                <h2 className="font-semibold text-[#111111]">
                  Choose a store style
                </h2>

                <p className="mt-1 text-sm leading-5 text-[#777777]">
                  Start with a preset, then personalize the colors and layout.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {STORE_STYLE_PRESETS.map((preset) => {
                  const selected =
                    theme.brandColor === preset.brandColor &&
                    theme.backgroundColor === preset.backgroundColor &&
                    theme.productLayout === preset.productLayout;

                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => selectPreset(preset)}
                      className={`overflow-hidden rounded-xl border text-left transition ${
                        selected
                          ? "border-[#111111] ring-2 ring-[#111111]/10"
                          : "border-[#E5E5E5] hover:border-[#AAAAAA]"
                      }`}
                    >
                      <div
                        className="h-24 p-3"
                        style={{
                          backgroundColor: preset.backgroundColor,
                        }}
                      >
                        <div
                          className="mb-3 h-2 w-14 rounded-full"
                          style={{
                            backgroundColor: preset.brandColor,
                          }}
                        />

                        <div className="grid grid-cols-3 gap-1.5">
                          {[0, 1, 2].map((item) => (
                            <div
                              key={item}
                              className="h-10 rounded-md border border-black/5 bg-white shadow-sm"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 border-t border-[#EEEEEE] bg-white px-3 py-2.5">
                        <span className="truncate text-xs font-semibold text-[#222222]">
                          {preset.name}
                        </span>

                        {selected && (
                          <span
                            className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] text-white"
                            style={{
                              backgroundColor: preset.brandColor,
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Brand colors */}
            <section className="rounded-2xl border border-[#E5E5E5] bg-white p-5">
              <h2 className="font-semibold text-[#111111]">Brand colors</h2>

              <div className="mt-4 space-y-4">
                <ColorField
                  label="Brand color"
                  value={theme.brandColor}
                  onChange={(value) => updateColor("brandColor", value)}
                  onComplete={scrollToPreviewOnMobile}
                />

                <ColorField
                  label="Background color"
                  value={theme.backgroundColor}
                  onChange={(value) => updateColor("backgroundColor", value)}
                  onComplete={scrollToPreviewOnMobile}
                />
              </div>
            </section>

            {/* Product layout */}
            <section className="rounded-2xl border border-[#E5E5E5] bg-white p-5">
              <div>
                <h2 className="font-semibold text-[#111111]">Product layout</h2>

                <p className="mt-1 text-sm text-[#777777]">
                  Choose how products are arranged for customers.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {PRODUCT_LAYOUTS.map((option) => {
                  const selected = theme.productLayout === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateLayout(option.value)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                        selected
                          ? "border-[#111111] bg-[#FAFAFA]"
                          : "border-[#E5E5E5] hover:border-[#BBBBBB]"
                      }`}
                    >
                      <LayoutThumbnail
                        layout={option.value}
                        brandColor={theme.brandColor}
                      />

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-[#222222]">
                          {option.label}
                        </span>

                        <span className="mt-0.5 block text-xs leading-4 text-[#777777]">
                          {option.description}
                        </span>
                      </span>

                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                          selected
                            ? "border-transparent text-white"
                            : "border-[#CCCCCC]"
                        }`}
                        style={{
                          backgroundColor: selected
                            ? theme.brandColor
                            : "transparent",
                        }}
                      >
                        {selected ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </aside>

          {/* Preview */}
          <section
            ref={previewRef}
            className="min-w-0 xl:sticky xl:top-6 xl:self-start"
          >
            <div className="min-w-0 overflow-hidden rounded-2xl border border-[#DADADA] bg-[#ECECEC] shadow-sm">
              {/* Preview toolbar */}
              <div className="flex min-w-0 items-center justify-between gap-3 border-b border-[#DADADA] bg-white px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#111111]">
                    Live customer preview
                  </p>

                  <p className="truncate text-xs text-[#777777]">
                    Updates instantly as you customize.
                  </p>
                </div>

                <div className="flex shrink-0 items-center rounded-lg border border-[#E5E5E5] bg-[#F7F7F8] p-1">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                      previewDevice === "desktop"
                        ? "bg-white text-[#111111] shadow-sm"
                        : "text-[#777777] hover:text-[#111111]"
                    }`}
                  >
                    Desktop
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                      previewDevice === "mobile"
                        ? "bg-white text-[#111111] shadow-sm"
                        : "text-[#777777] hover:text-[#111111]"
                    }`}
                  >
                    Mobile
                  </button>
                </div>
              </div>

              {/* Preview viewport */}
              <div className="min-w-0 overflow-x-hidden p-0 sm:p-4">
                <div
                  className={`mx-auto min-w-0 overflow-hidden border border-black/10 bg-white shadow-xl transition-all duration-300 ${
                    previewDevice === "mobile"
                      ? "w-full max-w-[390px] rounded-[28px]"
                      : "w-full max-w-full"
                  }`}
                >
                  <div
                    className="flex min-h-[720px] min-w-0 max-w-full flex-col overflow-hidden"
                    style={{
                      backgroundColor: theme.backgroundColor,
                    }}
                  >
                    {/* Preview Header */}
                    <header
                      className={`min-w-0 border-b border-black/10 ${
                        previewDevice === "mobile" ? "px-4 py-4" : "px-7 py-5"
                      }`}
                    >
                      <div
                        className={`flex min-w-0 gap-4 ${
                          previewDevice === "mobile"
                            ? "flex-col"
                            : "items-start justify-between"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex min-w-0 items-center gap-3">
                            <div
                              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-lg font-bold text-white"
                              style={{
                                backgroundColor: theme.brandColor,
                              }}
                            >
                              S
                            </div>

                            <div className="min-w-0">
                              <h2 className="truncate text-base font-semibold text-[#111111]">
                                Sonia&apos;s Store
                              </h2>

                              <p className="truncate text-xs text-[#777777]">
                                Fashion, bags and accessories
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-white ${
                            previewDevice === "mobile" ? "w-full" : ""
                          }`}
                          style={{
                            backgroundColor: theme.brandColor,
                          }}
                        >
                          Chat on WhatsApp
                        </button>
                      </div>
                    </header>

                    {/* Preview Content */}
                    <div
                      className={`min-w-0 flex-1 py-6 ${
                        previewDevice === "mobile" ? "px-4" : "px-7"
                      }`}
                    >
                      <div
                        className={`mb-6 flex min-w-0 gap-4 ${
                          previewDevice === "mobile"
                            ? "flex-col"
                            : "items-center justify-between"
                        }`}
                      >
                        <div className="min-w-0">
                          <p
                            className="truncate text-xs font-bold uppercase tracking-[0.16em]"
                            style={{
                              color: theme.brandColor,
                            }}
                          >
                            Our collection
                          </p>

                          <h3 className="mt-2 truncate text-xl font-semibold text-[#111111]">
                            Products
                          </h3>
                        </div>

                        <div
                          className={`min-w-0 max-w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-xs text-[#777777] ${
                            previewDevice === "mobile" ? "w-full" : "w-64"
                          }`}
                        >
                          <span className="block truncate">
                            Search products...
                          </span>
                        </div>
                      </div>

                      {/* Product Grid */}
                      <div className={`min-w-0 max-w-full ${previewGridClass}`}>
                        {PRODUCTS.map((product, index) => {
                          const featured =
                            theme.productLayout === "showcase" && index === 0;

                          return (
                            <article
                              key={product.id}
                              className={`min-w-0 max-w-full overflow-hidden ${
                                layout.card
                              } ${featured ? "col-span-2 row-span-2" : ""}`}
                            >
                              <div
                                className={`relative min-w-0 max-w-full overflow-hidden ${
                                  layout.image
                                } ${
                                  featured
                                    ? previewDevice === "mobile"
                                      ? "h-[300px]"
                                      : "h-[360px]"
                                    : ""
                                }`}
                                style={{
                                  background: `linear-gradient(135deg, ${theme.brandColor}22, ${theme.brandColor}66)`,
                                }}
                              >
                                <div className="absolute inset-0 grid place-items-center">
                                  <div
                                    className="h-12 w-12 shrink-0 rounded-full opacity-60"
                                    style={{
                                      backgroundColor: theme.brandColor,
                                    }}
                                  />
                                </div>
                              </div>

                              <div className={`min-w-0 ${layout.content}`}>
                                <p
                                  className="truncate text-xs font-semibold"
                                  style={{
                                    color: theme.brandColor,
                                  }}
                                >
                                  {product.price}
                                </p>

                                <h4 className="truncate text-xs font-semibold text-[#111111] sm:text-sm">
                                  {product.name}
                                </h4>

                                {theme.productLayout !== "compact" && (
                                  <p className="line-clamp-2 break-words text-[10px] leading-4 text-[#777777] sm:text-xs">
                                    Quality product with reliable delivery and
                                    direct WhatsApp ordering.
                                  </p>
                                )}
                              </div>

                              <button
                                type="button"
                                className={`mt-auto min-w-0 max-w-full px-3 py-2 text-[10px] font-semibold text-white sm:text-xs ${layout.button}`}
                                style={{
                                  backgroundColor: theme.brandColor,
                                }}
                              >
                                <span className="block truncate">
                                  Order on WhatsApp
                                </span>
                              </button>
                            </article>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-auto min-w-0 border-t border-black/10 px-5 py-4 text-center text-xs text-[#777777]">
                      <span className="block truncate">
                        Powered by Storeface
                      </span>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Color Field                                                                */
/* -------------------------------------------------------------------------- */

function ColorField({
  label,
  value,
  onChange,
  onComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onComplete: () => void;
}) {
  const valid = isHexColor(value);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nextValue = event.target.value
      .replace(/\s/g, "")
      .replace(/[^#0-9A-Fa-f]/g, "");

    if (nextValue && !nextValue.startsWith("#")) {
      nextValue = `#${nextValue}`;
    }

    nextValue = `#${nextValue.replace(/#/g, "").slice(0, 6)}`;

    onChange(nextValue);

    const hexDigits = nextValue.replace("#", "");

    if (/^[0-9A-Fa-f]{6}$/.test(hexDigits)) {
      onComplete();
    }
  };

  const handlePickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);

    // Color picker always returns a complete 6-digit color.
    onComplete();
  };

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#333333]">
        {label}
      </span>

      <span
        className={`flex items-center gap-3 rounded-xl border bg-white p-2 ${
          valid ? "border-[#DCDCDC]" : "border-red-500"
        }`}
      >
        <input
          type="color"
          value={valid ? value : "#000000"}
          onChange={handlePickerChange}
          className="h-10 w-12 cursor-pointer rounded-lg border-0 bg-transparent p-0"
          aria-label={`${label} color picker`}
        />

        <input
          type="text"
          value={value}
          onChange={handleTextChange}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium uppercase text-[#333333] outline-none"
          maxLength={7}
          placeholder="#27AE60"
          aria-label={`${label} hexadecimal value`}
        />
      </span>

      {!valid && (
        <span className="mt-1 block text-xs text-red-600">
          Enter a valid 6-digit hex color, for example #27AE60.
        </span>
      )}
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* Layout Thumbnail                                                           */
/* -------------------------------------------------------------------------- */

function LayoutThumbnail({
  layout,
  brandColor,
}: {
  layout: ProductLayout;
  brandColor: string;
}) {
  if (layout === "compact") {
    return (
      <span className="grid h-14 w-20 shrink-0 grid-cols-3 gap-1 rounded-lg bg-[#F2F2F2] p-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            className="rounded-sm bg-white"
            style={{
              borderTop: `3px solid ${brandColor}`,
            }}
          />
        ))}
      </span>
    );
  }

  if (layout === "spacious") {
    return (
      <span className="grid h-14 w-20 shrink-0 grid-cols-2 gap-1.5 rounded-lg bg-[#F2F2F2] p-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <span
            key={index}
            className="rounded-md bg-white shadow-sm"
            style={{
              borderTop: `6px solid ${brandColor}`,
            }}
          />
        ))}
      </span>
    );
  }

  if (layout === "editorial") {
    return (
      <span className="grid h-14 w-20 shrink-0 grid-cols-2 gap-x-2 gap-y-1 rounded-lg bg-[#F2F2F2] p-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="flex flex-col gap-1">
            <span
              className="flex-1"
              style={{
                backgroundColor: `${brandColor}55`,
              }}
            />

            <span className="h-0.5 bg-[#AAAAAA]" />
          </span>
        ))}
      </span>
    );
  }

  if (layout === "showcase") {
    return (
      <span className="grid h-14 w-20 shrink-0 grid-cols-2 grid-rows-2 gap-1 rounded-lg bg-[#F2F2F2] p-2">
        <span
          className="row-span-2 rounded-sm"
          style={{
            backgroundColor: `${brandColor}88`,
          }}
        />

        <span className="rounded-sm bg-white" />

        <span className="rounded-sm bg-white" />
      </span>
    );
  }

  return (
    <span className="grid h-14 w-20 shrink-0 grid-cols-2 gap-1.5 rounded-lg bg-[#F2F2F2] p-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={index}
          className="rounded-sm bg-white"
          style={{
            borderTop: `4px solid ${brandColor}`,
          }}
        />
      ))}
    </span>
  );
}
