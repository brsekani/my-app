"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { PRODUCT_LAYOUT_CONFIG } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";

type ProductLayout =
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

type PreviewDevice = "desktop" | "mobile";

const STORAGE_KEY = "storeface-store-theme";

const DEFAULT_THEME: StoreTheme = {
  name: "Default",
  brandColor: "#111111",
  backgroundColor: "#FFFFFF",
  productLayout: "default",
};

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
  {
    name: "Sunset Deals",
    brandColor: "#F97316",
    backgroundColor: "#FFF7ED",
    productLayout: "showcase",
  },
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
];

const PRODUCTS = [
  { id: 1, name: "Classic Denim Jacket", price: "₦28,000" },
  { id: 2, name: "Leather Backpack", price: "₦42,500" },
  { id: 3, name: "Wireless Headphones", price: "₦85,000" },
  { id: 4, name: "Smart Fitness Watch", price: "₦65,000" },
  { id: 5, name: "Luxury Office Chair", price: "₦120,000" },
  { id: 6, name: "Bluetooth Speaker", price: "₦24,999" },
];

const isHexColor = (value: string) =>
  /^#([0-9A-F]{3}){1,2}$/i.test(value.trim());

export default function StoreAppearancePage() {
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState<StoreTheme>(DEFAULT_THEME);
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>("desktop");
  const [savedTheme, setSavedTheme] = useState<StoreTheme>(DEFAULT_THEME);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  const previewRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);

      if (storedTheme) {
        const parsedTheme = JSON.parse(storedTheme) as StoreTheme;
        setTheme(parsedTheme);
        setSavedTheme(parsedTheme);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  const hasChanges = useMemo(
    () => JSON.stringify(theme) !== JSON.stringify(savedTheme),
    [theme, savedTheme],
  );

  const layout = PRODUCT_LAYOUT_CONFIG[theme.productLayout];

  const selectPreset = (preset: StoreTheme) => {
    setTheme({ ...preset });
    setSaved(false);
    scrollToPreviewOnMobile();
  };

  const updateColor = (
    key: "brandColor" | "backgroundColor",
    value: string,
  ) => {
    setTheme((current) => ({
      ...current,
      name: "Custom style",
      [key]: value,
    }));
    setSaved(false);
    // scrollToPreviewOnMobile();
  };

  const updateLayout = (productLayout: ProductLayout) => {
    setTheme((current) => ({
      ...current,
      name: "Custom style",
      productLayout,
    }));
    setSaved(false);
    scrollToPreviewOnMobile();
  };

  const saveTheme = () => {
    if (!isHexColor(theme.brandColor) || !isHexColor(theme.backgroundColor)) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    setSavedTheme(theme);
    setSaved(true);

    scrollToPreviewOnMobile();

    window.setTimeout(() => setSaved(false), 2500);
  };

  const resetTheme = () => {
    setTheme(DEFAULT_THEME);
    setSaved(false);

    scrollToPreviewOnMobile();
  };

  const previewGridClass = useMemo(() => {
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
      default:
        return "grid grid-cols-2 gap-3";
    }
  }, [layout.grid, previewDevice, theme.productLayout]);

  useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);

      // No saved theme means use the original default storefront.
      if (!storedTheme) {
        setTheme(DEFAULT_THEME);
        setSavedTheme(DEFAULT_THEME);
        return;
      }

      const parsedTheme = JSON.parse(storedTheme) as Partial<StoreTheme>;

      const validLayouts: ProductLayout[] = [
        "default",
        "classic",
        "compact",
        "spacious",
        "editorial",
        "showcase",
      ];

      const restoredTheme: StoreTheme = {
        ...DEFAULT_THEME,
        ...parsedTheme,
        productLayout:
          parsedTheme.productLayout &&
          validLayouts.includes(parsedTheme.productLayout)
            ? parsedTheme.productLayout
            : "default",
      };

      setTheme(restoredTheme);
      setSavedTheme(restoredTheme);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      setTheme(DEFAULT_THEME);
      setSavedTheme(DEFAULT_THEME);
    } finally {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#F7F7F8]">
        <p className="text-sm text-[#777777]">Loading store appearance…</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-6 flex flex-col gap-4 border-b border-[#E5E5E5] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-[14px] font-medium uppercase tracking-[0.18em] ">
              Store settings
            </p>

            <p className="text-[14px]">
              Pick a style, customize it, and preview what customers will see.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={resetTheme}
              className="rounded-lg border border-[#D9D9D9] bg-white px-4 py-2.5 text-sm font-semibold text-[#333333] transition hover:bg-[#F1F1F1]"
            >
              Reset
            </button>

            <button
              type="button"
              disabled={!hasChanges}
              onClick={saveTheme}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: theme.brandColor }}
            >
              {saved ? "Saved ✓" : "Save changes"}
            </button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[350px_minmax(0,1fr)]">
          <aside className="space-y-5">
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
                    theme.name === preset.name &&
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
                        style={{ backgroundColor: preset.backgroundColor }}
                      >
                        <div
                          className="mb-3 h-2 w-14 rounded-full"
                          style={{ backgroundColor: preset.brandColor }}
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
                            style={{ backgroundColor: preset.brandColor }}
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

          <section
            ref={previewRef}
            className="xl:sticky xl:top-6 xl:self-start"
          >
            <div className="overflow-hidden rounded-2xl border border-[#DADADA] bg-[#ECECEC] shadow-sm">
              <div className="flex items-center justify-between border-b border-[#DADADA] bg-white px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#111111]">
                    Live customer preview
                  </p>
                  <p className="text-xs text-[#777777]">
                    Updates instantly as you save.
                  </p>
                </div>

                <div className="flex items-center rounded-lg border border-[#E5E5E5] bg-[#F7F7F8] p-1">
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

              <div className="">
                <div
                  className={`mx-auto overflow-hidden border border-black/10 bg-white shadow-xl transition-all duration-300 ${
                    previewDevice === "mobile"
                      ? "w-[390px] max-w-full rounded-[28px]"
                      : "w-full max-w-full"
                  }`}
                >
                  <div
                    className="flex min-h-[720px] flex-col"
                    style={{ backgroundColor: theme.backgroundColor }}
                  >
                    <header
                      className={`border-b border-black/10 ${
                        previewDevice === "mobile" ? "px-4 py-4" : "px-7 py-5"
                      }`}
                    >
                      <div
                        className={`flex gap-4 ${
                          previewDevice === "mobile"
                            ? "flex-col"
                            : "items-start justify-between"
                        }`}
                      >
                        <div>
                          <div className="mb-3 flex items-center gap-3">
                            <div
                              className="grid h-11 w-11 place-items-center rounded-xl text-lg font-bold text-white"
                              style={{ backgroundColor: theme.brandColor }}
                            >
                              S
                            </div>

                            <div>
                              <h2 className="text-base font-semibold text-[#111111]">
                                Sonia&apos;s Store
                              </h2>
                              <p className="mt-0.5 text-xs text-[#777777]">
                                Fashion, bags and accessories
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`rounded-full px-4 py-2 text-xs font-semibold text-white ${
                            previewDevice === "mobile" ? "w-full" : ""
                          }`}
                          style={{ backgroundColor: theme.brandColor }}
                        >
                          Chat on WhatsApp
                        </button>
                      </div>
                    </header>
                    <div
                      className={`flex-1 py-6 ${
                        previewDevice === "mobile" ? "px-4" : "px-7"
                      }`}
                    >
                      <div
                        className={`mb-6 flex gap-4 ${
                          previewDevice === "mobile"
                            ? "flex-col"
                            : "items-center justify-between"
                        }`}
                      >
                        <div>
                          <p
                            className="text-xs font-bold uppercase tracking-[0.16em]"
                            style={{ color: theme.brandColor }}
                          >
                            Our collection
                          </p>
                          <h3 className="mt-2 text-xl font-semibold text-[#111111]">
                            Products
                          </h3>
                        </div>

                        <div
                          className={`rounded-lg border border-black/10 bg-white px-4 py-2.5 text-xs text-[#777777] ${
                            previewDevice === "mobile" ? "w-full" : "w-64"
                          }`}
                        >
                          Search products...
                        </div>
                      </div>

                      <div className={previewGridClass}>
                        {PRODUCTS.map((product, index) => {
                          const featured =
                            theme.productLayout === "showcase" && index === 0;

                          return (
                            <article
                              key={product.id}
                              className={`${layout.card} ${
                                featured
                                  ? previewDevice === "mobile"
                                    ? "col-span-2 row-span-2"
                                    : "col-span-2 row-span-2"
                                  : ""
                              }`}
                            >
                              <div
                                className={`relative overflow-hidden ${layout.image} ${
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
                                    className="h-12 w-12 rounded-full opacity-60"
                                    style={{
                                      backgroundColor: theme.brandColor,
                                    }}
                                  />
                                </div>
                              </div>

                              <div className={layout.content}>
                                <p
                                  className="text-xs font-semibold"
                                  style={{ color: theme.brandColor }}
                                >
                                  {product.price}
                                </p>

                                <h4 className="truncate text-xs font-semibold text-[#111111] sm:text-sm">
                                  {product.name}
                                </h4>

                                {theme.productLayout !== "compact" && (
                                  <p className="line-clamp-2 text-[10px] leading-4 text-[#777777] sm:text-xs">
                                    Quality product with reliable delivery and
                                    direct WhatsApp ordering.
                                  </p>
                                )}
                              </div>

                              <button
                                type="button"
                                className={`mt-auto w-full px-3 py-2 text-[10px] font-semibold text-white sm:text-xs ${layout.button}`}
                                style={{ backgroundColor: theme.brandColor }}
                              >
                                Order on WhatsApp
                              </button>
                            </article>
                          );
                        })}
                      </div>
                    </div>

                    <footer className="mt-auto border-t border-black/10 px-5 py-4 text-center text-xs text-[#777777]">
                      Powered by Storeface
                    </footer>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-[#777777]">
              Saved locally in this browser for now.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

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
            style={{ borderTop: `3px solid ${brandColor}` }}
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
            style={{ borderTop: `6px solid ${brandColor}` }}
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
              style={{ backgroundColor: `${brandColor}55` }}
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
          style={{ backgroundColor: `${brandColor}88` }}
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
          style={{ borderTop: `4px solid ${brandColor}` }}
        />
      ))}
    </span>
  );
}
