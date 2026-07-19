"use client";

import Image from "next/image";
import Link from "next/link";

import close from "@/assets/svgs/close.svg";
import search from "@/assets/svgs/search.svg";
import nothingHere from "@/assets/svgs/nothing-here.svg";
import matchNotFound from "@/assets/svgs/match-not-found.svg";
import arrow from "@/public/arrow-30.svg";
import testImage from "@/assets/Images/test-image.jpg";
import testImage2 from "@/assets/Images/test-image-2.png";

import EmptyState from "@/components/EmptyState";
import PaginationNavigator from "@/components/PaginationNavigator";
import Modal from "@/components/Modal";
import ViewProductDetails from "@/components/modals/ViewProductDetails";
import ProductGrid from "@/components/store/ProductGrid";

import { useStoreTheme } from "@/hooks/useStoreTheme";
import { StoreProduct } from "@/types/store-product";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Variants } from "framer-motion";

const productGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

const productCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const products: StoreProduct[] = [
  {
    id: 1,
    name: "Classic Blue Denim Jacket",
    price: "₦28,000",
    description:
      "Timeless blue denim jacket made from durable cotton fabric with a comfortable inner lining.",
    image: [testImage, testImage2],
  },
  {
    id: 2,
    name: "Minimalist Leather Backpack",
    price: "₦42,500",
    description:
      "Premium leather backpack with spacious compartments, padded straps, and laptop sleeve.",
    image: [testImage, testImage2],
  },
  {
    id: 3,
    name: "Wireless Noise Cancelling Headphones",
    price: "₦85,000",
    description:
      "Immersive sound experience with active noise cancellation and 30-hour battery life.",
    image: [testImage, testImage2],
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    price: "₦65,000",
    description:
      "Track workouts, heart rate, sleep, and notifications with this sleek fitness smartwatch.",
    image: [testImage, testImage2],
  },
  {
    id: 5,
    name: "Luxury Office Chair",
    price: "₦120,000",
    description:
      "Ergonomic office chair with lumbar support, adjustable height, and breathable mesh.",
    image: [testImage, testImage2],
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    price: "₦24,999",
    description:
      "Compact speaker with deep bass, waterproof design, and up to 12 hours playback.",
    image: [testImage, testImage2],
  },
];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { storeTheme, themeLoaded } = useStoreTheme();

  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  const [showProductModal, setShowProductModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(
    null,
  );

  const isDefault = storeTheme.productLayout === "default";

  const hasProducts = products.length > 0;
  const hasSearch = searchValue.trim().length > 0;

  const currentPage = searchParams.get("page") ?? "1";
  const currentSearch = searchParams.get("q") ?? "";

  const animationKey = `${currentSearch}-${currentPage}`;

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSearch = searchValue.trim();

    if (trimmedSearch) {
      router.push(`?q=${encodeURIComponent(trimmedSearch)}`);

      return;
    }

    router.push("?");
  };

  const handleClear = () => {
    setSearchValue("");
    router.push("?");
  };

  const handleProductClick = (product: StoreProduct) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  if (!themeLoaded) {
    return (
      <div className="grid min-h-screen place-items-center bg-white">
        <p className="text-sm text-[#777777]">Loading store...</p>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col leading-[100%]"
      style={{
        backgroundColor: storeTheme.backgroundColor,
      }}
    >
      <main className="flex-1">
        {/* Header */}
        <header>
          <div className="mx-auto w-full max-w-[1440px]">
            <section className="space-y-4 px-5 py-6">
              <div className="space-y-2.5">
                <h1
                  className="text-[16px] font-semibold"
                  style={{
                    color: isDefault ? "#111111" : storeTheme.brandColor,
                  }}
                >
                  NAME OF STORE
                </h1>

                <p className="text-[14px] leading-5 text-[#777777]">
                  [SHOP BIO] - Fashion, bags &amp; accessories. Quality pieces
                  at great prices.
                </p>
              </div>
            </section>
          </div>

          <hr className="border-[#E5E5E5]" />
        </header>

        {/* Main content */}
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
          <section className="flex-1 space-y-7 px-5 py-7">
            {/* Search */}
            <form className="relative w-full" onSubmit={handleSearchSubmit}>
              <Image
                className="absolute left-2 top-2.5"
                src={search}
                alt=""
                aria-hidden="true"
              />

              {searchValue && (
                <button
                  type="button"
                  aria-label="Clear search"
                  className="absolute right-2 top-1.5 flex items-center justify-center p-0.5"
                  onClick={handleClear}
                >
                  <Image src={close} alt="" aria-hidden="true" />
                </button>
              )}

              <input
                type="search"
                placeholder="Search products..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="w-full truncate rounded-[4px] border border-transparent bg-[#F5F5F5] px-7 py-2 text-[14px] leading-[100%] text-[#777777] outline-none placeholder:text-[#777777] focus:border-black/10"
                style={{
                  caretColor: storeTheme.brandColor,
                }}
              />
            </form>

            {/* Products heading */}
            <div className="space-y-2">
              <h2
                className="text-[14px] font-semibold"
                style={{
                  color: isDefault ? "#111111" : storeTheme.brandColor,
                }}
              >
                PRODUCTS
              </h2>

              {!hasProducts && hasSearch && (
                <p className="text-[14px] text-[#111111]">
                  Results for “{searchValue}”
                </p>
              )}
            </div>

            {/* Product states */}
            {hasProducts ? (
              <ProductGrid
                products={products}
                storeTheme={storeTheme}
                animationKey={animationKey}
                gridVariants={productGridVariants}
                cardVariants={productCardVariants}
                onProductClick={handleProductClick}
              />
            ) : hasSearch ? (
              <div className="h-full py-[88px]">
                <EmptyState
                  icon={matchNotFound}
                  title={
                    <>
                      No products found for{" "}
                      <span className="break-words font-semibold text-[#111111]">
                        &quot;{searchValue}&quot;
                      </span>
                      . Try another keyword or add a product.
                    </>
                  }
                  buttonText="Clear Search"
                  onClick={handleClear}
                />
              </div>
            ) : (
              <div className="h-full py-[88px]">
                <EmptyState
                  icon={nothingHere}
                  title="You haven’t added any products yet."
                />
              </div>
            )}
          </section>

          {/* Pagination */}
          <div className="px-5 pb-20">
            <PaginationNavigator totalPages={0} loading={false} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row">
          <p className="text-[14px] text-[#777777]">
            Powered by NAME OF PRODUCT
          </p>

          <Link
            href="/auth/register"
            className="flex cursor-pointer items-center gap-2"
          >
            <span
              className="text-[14px] font-semibold underline underline-offset-2"
              style={{
                color: isDefault ? "#111111" : storeTheme.brandColor,
              }}
            >
              Create your own store
            </span>

            <Image src={arrow} alt="" aria-hidden="true" />
          </Link>
        </div>
      </footer>

      <Modal
        closeOnOverlayClick={false}
        open={showProductModal}
        onClose={handleCloseProductModal}
        width="w-[640px]"
      >
        {selectedProduct && (
          <ViewProductDetails
            product={selectedProduct}
            onClose={handleCloseProductModal}
            onConfirm={() => {}}
          />
        )}
      </Modal>
    </div>
  );
}
