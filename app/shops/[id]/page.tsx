"use client";

import Image from "next/image";
import Link from "next/link";

import close from "@/assets/svgs/close.svg";
import search from "@/assets/svgs/search.svg";
import nothingHere from "@/assets/svgs/nothing-here.svg";
import arrow from "@/public/arrow-30.svg";
import testImage from "@/assets/Images/test-image.jpg";

import EmptyState from "@/components/EmptyState";
import PaginationNavigator from "@/components/PaginationNavigator";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import matchNotFound from "@/assets/svgs/match-not-found.svg";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

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
      image: testImage,
    },
    {
      id: 2,
      name: "Minimalist Leather Backpack",
      price: "₦42,500",
      description:
        "Premium leather backpack with spacious compartments, padded straps, and laptop sleeve.",
      image: testImage,
    },
    {
      id: 3,
      name: "Wireless Noise Cancelling Headphones",
      price: "₦85,000",
      description:
        "Immersive sound experience with active noise cancellation and 30-hour battery life.",
      image: testImage,
    },
    {
      id: 4,
      name: "Smart Fitness Watch",
      price: "₦65,000",
      description:
        "Track workouts, heart rate, sleep, and notifications with this sleek fitness smartwatch.",
      image: testImage,
    },
    {
      id: 5,
      name: "Luxury Office Chair",
      price: "₦120,000",
      description:
        "Ergonomic office chair with lumbar support, adjustable height, and breathable mesh.",
      image: testImage,
    },
    {
      id: 6,
      name: "Portable Bluetooth Speaker",
      price: "₦24,999",
      description:
        "Compact speaker with deep bass, waterproof design, and up to 12 hours playback.",
      image: testImage,
    },
  ];

  const hasSearch = searchValue.trim().length > 0;
  const hasProducts = products.length > 0;

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
            <h5 className="text-[14px] font-semibold text-[#111111]">
              PRODUCTS
            </h5>

            {hasProducts ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 gap-[18px] md:gap-4">
                {products.map((product) => (
                  <div
                    // href={`/products/${product?.id}`}
                    key={product.id}
                    className="md:w-[251.2px] min-w-[166px] h-full p-2 border border-[#E5E5E5] rounded-[8px] space-y-3"
                  >
                    <div className="relative w-full h-[235px] overflow-hidden rounded-[4px] border border-[#E5E5E5]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 251px, 166px"
                      />
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

                    <button className="hidden md:block border border-[#111111] w-full py-1.5 rounded-[100px] text-[14px] font-semibold">
                      Order on WhatsApp
                    </button>
                  </div>
                ))}
              </div>
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
          <div className="px-5 pb-5">
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
    </div>
  );
}
