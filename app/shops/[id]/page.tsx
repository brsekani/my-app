"use client";

import Image from "next/image";
import Link from "next/link";

import close from "@/assets/svgs/close.svg";
import search from "@/assets/svgs/search.svg";
import nothingHere from "@/assets/svgs/nothing-here.svg";
import arrow from "@/public/arrow-30.svg";
import testImage from "@/assets/Images/test-image.jpg";
import testImage2 from "@/assets/Images/test-image-2.png";

import EmptyState from "@/components/EmptyState";
import PaginationNavigator from "@/components/PaginationNavigator";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import matchNotFound from "@/assets/svgs/match-not-found.svg";
import Modal from "@/components/Modal";
import ViewProductDetails from "@/components/modals/ViewProductDetails";
import { motion } from "framer-motion";

export default function Page() {
  const productGridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.15,
      },
    },
  };

  const productCardVariants = {
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
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the browser from doing a full page refresh

    if (searchValue.trim()) {
      // Updates URL to /dashboard?q=your-search-term
      router.push(`?q=${encodeURIComponent(searchValue.trim())}`);
    } else {
      // If search is empty, clear the query param entirely
      router.push("?");
    }
  };

  const handleClear = () => {
    setSearchValue("");
    router.push("?"); // Clears the query from the URL
  };
  const products: any[] = [
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

  const hasSearch = searchValue.trim().length > 0;
  const hasProducts = products.length > 0;

  const currentPage = searchParams.get("page") ?? "1";
  const currentSearch = searchParams.get("q") ?? "";
  const animationKey = `${currentSearch}-${currentPage}`;

  return (
    <div className="min-h-screen flex flex-col bg-white leading-[100%]">
      <main className="flex-1">
        {/* Header */}
        <div className="max-w-[1440px] w-full mx-auto">
          <section className="px-5 py-6 space-y-4">
            <div className="space-y-2.5">
              <h1 className="text-[16px] font-semibold text-[#111111]">
                NAME OF STORE
              </h1>

              <p className="text-[14px] text-[#777777]">
                [SHOP BIO] - Fashion, bags & accessories. Quality pieces at
                great prices.
              </p>
            </div>
          </section>
        </div>

        {/* Full Width Divider */}
        <hr className="border-[#E5E5E5]" />

        {/* Main Content */}
        <div className="max-w-[1440px] w-full mx-auto flex flex-col flex-1">
          <section className="px-5 py-7 space-y-7 flex-1">
            {/* Search */}
            <form className="relative w-full" onSubmit={handleSearchSubmit}>
              <Image
                className="absolute top-2.5 left-2"
                src={search}
                alt="search-icon"
              />

              <button
                type="button"
                className="absolute top-1.5 right-2 flex items-center justify-center p-0.5"
                onClick={handleClear}
              >
                <Image src={close} alt="close-icon" />
              </button>

              <input
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full bg-[#F5F5F5] py-2 px-7 rounded-[4px] truncate text-[14px] leading-[100%] placeholder:text-[#777777] text-[#777777]"
              />
            </form>

            {/* Products Header */}
            <div className="space-y-2">
              <h5 className="text-[14px] font-semibold text-[#111111]">
                PRODUCTS
              </h5>

              {!hasProducts && hasSearch && (
                <p className="text-[14px] text-[#111111]">
                  Results for “{searchValue}”
                </p>
              )}
            </div>

            {hasProducts ? (
              <motion.div
                key={animationKey}
                variants={productGridVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[18px] md:gap-4"
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={productCardVariants}
                    whileHover={{
                      y: -5,
                      transition: {
                        duration: 0.2,
                        ease: "easeOut",
                      },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full min-w-0 h-full p-2 border border-[#E5E5E5] rounded-[8px] bg-white"
                  >
                    <div
                      className="space-y-3 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductModal(true);
                      }}
                    >
                      <div className="relative w-full h-[235px] overflow-hidden rounded-[4px] border border-[#E5E5E5]">
                        <motion.div
                          className="relative w-full h-full"
                          whileHover={{ scale: 1.06 }}
                          transition={{
                            duration: 0.35,
                            ease: "easeOut",
                          }}
                        >
                          <Image
                            src={product.image.at(0)}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1280px) 251px, (min-width: 768px) 33vw, 50vw"
                          />
                        </motion.div>
                      </div>

                      <div className="space-y-1.5 text-[14px] md:pb-2 pb-0">
                        <p className="text-[#111111] font-semibold">
                          {product.price}
                        </p>

                        <h3 className="text-[#111111] line-clamp-1">
                          {product.name}
                        </h3>

                        <p className="line-clamp-2 text-[#777777]">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="hidden md:block border border-[#111111] w-full py-1.5 rounded-[100px] text-[14px] font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#111111] hover:text-white"
                    >
                      Order on WhatsApp
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            ) : hasSearch ? (
              <div className="py-[88px] h-full">
                <EmptyState
                  icon={matchNotFound}
                  title={
                    <>
                      No products found for{" "}
                      <span className="font-semibold text-[#111111] break-words">
                        "{searchValue}"
                      </span>
                      . Try another keyword or add product.
                    </>
                  }
                  buttonText="Clear Search"
                  onClick={handleClear}
                />
              </div>
            ) : (
              <div className="py-[88px] h-full">
                <EmptyState
                  icon={nothingHere}
                  title="You haven’t added any products yet."
                  //   buttonText="Add Product"
                  //   onClick={() => setOpenAddProductDrawer(true)}
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
        <div className="max-w-[1440px] w-full mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[14px] text-[#777777]">
            Powered by NAME OF PRODUCT
          </p>

          <Link
            href="/auth/register"
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="text-[14px] font-semibold text-[#111111] underline underline-offset-2">
              Create your own store
            </div>

            <Image src={arrow} alt="arrow" />
          </Link>
        </div>
      </footer>

      <Modal
        closeOnOverlayClick={false}
        open={showProductModal}
        onClose={() => setShowProductModal(false)}
        width="w-[640px]"
      >
        <ViewProductDetails
          product={selectedProduct}
          onClose={() => setShowProductModal(false)}
          onConfirm={() => {}}
        />
      </Modal>
    </div>
  );
}
