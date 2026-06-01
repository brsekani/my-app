"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import EmptyState from "@/components/EmptyState";

import copy from "@/assets/svgs/copy.svg";
import share from "@/assets/svgs/share.svg";
import close from "@/assets/svgs/close.svg";
import search from "@/assets/svgs/search.svg";
import PaginationNavigator from "@/components/PaginationNavigator";
import Drawer from "@/components/Drawer";
import AddProductDrawer from "@/components/AddProductDrawer";
import testImage from "@/assets/Images/test-image.jpg";
import nothingHere from "@/assets/svgs/nothing-here.svg";
import matchNotFound from "@/assets/svgs/match-not-found.svg";
import Link from "next/link";

export default function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [storeLink, setStoreLink] = useState(
    "https://thiswillbe theshoplink--a94df7b2-215e-45ca-8d4b-68ba8a0ac2",
  );
  const [isCopied, setIsCopied] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const [openAddProductDrawer, setOpenAddProductDrawer] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(storeLink);
      setIsCopied(true);

      // Reset the button text back to "Copy Link" after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

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

  const products = [
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
    <div className="leading-[100%] space-y-6">
      <h6 className="text-[16px] leading-[100%] font-medium text-[#111111]">
        Welcome, Shop name
      </h6>

      <div className="p-4 border border-[#E5E5E5] rounded-[6px] space-y-2">
        <p className="text-[#111111] text-[12px] font-semibold">STORE LINK</p>
        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2">
          <input
            disabled
            value={storeLink}
            className="w-full bg-[#F5F5F599] p-2 rounded-[4px] truncate text-[14px] leading-[100%] text-[#777777]"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 justify-center border border-[#111111] px-[18px] py-2 rounded-[100px] text-nowrap"
            >
              <p className="text-[14px] leading-[100%] text-[#111111] font-medium">
                {isCopied ? "Copied!" : "Copy Link"}
              </p>
              <Image src={copy} alt="copy-icon" />
            </button>

            <Image src={share} alt="share-icon" />
          </div>
        </div>
      </div>

      <hr className="border border-[#E5E5E5]" />

      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <Image
          className="absolute top-2.25 left-2"
          src={search}
          alt="search-icon"
        />
        {searchValue.length > 0 && (
          <button
            type="button" // Critical so this button doesn't trigger the form submit
            onClick={handleClear}
            className="absolute top-1.5 right-2 flex items-center justify-center p-0.5 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Image src={close} alt="close-icon" />
          </button>
        )}
        <input
          placeholder="Search products…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full bg-[#F5F5F5] py-2 px-7 rounded-[4px] truncate text-[14px] leading-[100%] placeholder:text-[#777777] text-[#777777]"
        />
      </form>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h5 className="text-[14px] font-semibold text-[#111111]">PRODUCTS</h5>

          <button
            onClick={() => setOpenAddProductDrawer(true)}
            className="px-[33px] py-1.5 bg-[#68DB25] rounded-[100px] text-[14px] font-semibold text-[#111111]"
          >
            Add Product
          </button>
        </div>

        {searchValue && (
          <p className="text-[14px] text-[#111111]">
            Results for "{searchValue}"
          </p>
        )}
      </div>

      {hasProducts ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 gap-[18px] md:gap-4">
          {products.map((product) => (
            <Link
              href={`/products/${product?.id}`}
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

              <div className="space-y-1.5 text-[14px]">
                <p className="text-[#111111] font-semibold">{product.price}</p>

                <h3 className="text-[#111111] line-clamp-1">{product.name}</h3>

                <p className="line-clamp-2 text-[#777777]">
                  {product.description}
                </p>
              </div>
            </Link>
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
            buttonText="Add Product"
            onClick={() => setOpenAddProductDrawer(true)}
          />
        </div>
      )}
      <PaginationNavigator totalPages={10} loading={false} />

      <Drawer
        open={openAddProductDrawer}
        onClose={() => setOpenAddProductDrawer(false)}
        placement="right"
        width="max-w-[640px] w-full"
        closeOnOverlayClick={false}
      >
        <AddProductDrawer onClose={() => setOpenAddProductDrawer(false)} />
      </Drawer>
    </div>
  );
}
