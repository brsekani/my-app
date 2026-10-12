"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import EmptyState from "@/components/EmptyState";

import copy from "@/assets/svgs/copy.svg";
import share from "@/assets/svgs/share.svg";
import close from "@/assets/svgs/close.svg";
import searchImg from "@/assets/svgs/search.svg";
import arrowDown from "@/assets/svgs/arrow-down.svg";
import matchNotFound from "@/assets/svgs/match-not-found.svg";

import PaginationNavigator from "@/components/PaginationNavigator";
import Drawer from "@/components/Drawer";
import AddProductDrawer from "@/components/AddProductDrawer";
import testImage from "@/assets/Images/test-image.jpg";
import nothingHere from "@/assets/svgs/nothing-here.svg";
import Link from "next/link";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { getImageUrl } from "@/lib/get-image-url";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";
import ShareSheet from "@/components/ShareSheet";
import { useGetCustomerStoreQuery } from "@/redux/api/storeApi";
import { getCurrencyInfo } from "@/utils/currency";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isCopied, setIsCopied] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const [openAddProductDrawer, setOpenAddProductDrawer] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("per_page") ?? 10);
  const search = searchParams.get("q") ?? "";

  const { data, isLoading, isFetching } = useGetProductsQuery({
    page: page,
    per_page: perPage,
    search,
  });

  const {
    data: userData,
    isLoading: userDataLoading,
    isError,
    error,
  } = useGetCustomerStoreQuery();

  const currency = userData?.data?.store?.currency ?? "NGN";
  const storeLink = `https://shelfie-teal.vercel.app/shops/${userData?.data.store.slug}`;

  const { code, symbol } = getCurrencyInfo(currency);

  console.log(code); // AUD
  console.log(symbol); // $

  console.log(userData);
  console.log(currency);

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

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    const trimmedSearch = searchValue.trim();

    if (trimmedSearch) {
      params.set("q", trimmedSearch);
    } else {
      params.delete("q");
    }

    // New search should start from page 1
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchValue("");

    const params = new URLSearchParams(searchParams.toString());

    params.delete("q");
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const products = data?.data?.products;

  const hasSearch = searchValue.trim().length > 0;
  const hasProducts = (products?.length ?? 0) > 0;

  const handleCloseAddProduct = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    const shouldOpen = searchParams.get("add-product") === "true";
    setOpenAddProductDrawer(shouldOpen);
  }, [searchParams]);

  useEffect(() => {
    setSearchValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  console.log(data);

  return (
    <div className="leading-[100%] space-y-6">
      <h6 className="text-[16px] leading-[100%] font-medium text-[#111111]">
        Welcome,{" "}
        {isLoading ? (
          <span className="inline-block h-4 w-24 animate-pulse rounded bg-[#E5E7EB] align-middle" />
        ) : (
          userData?.data?.store?.name
        )}
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

            <button onClick={() => setShareOpen(true)}>
              <Image src={share} alt="share" />
            </button>
          </div>
        </div>
      </div>

      <hr className="border border-[#E5E5E5]" />

      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <Image
          className="absolute top-2.25 left-2"
          src={searchImg}
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

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="border border-[#111111] rounded-[100px] flex items-center gap-1 py-1.5 px-3.5 text-[14px] font-medium outline-none">
              <p>All</p>
              <Image src={arrowDown} alt="arrow-icon" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="min-w-[160px]">
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Electronics</DropdownMenuItem>
            <DropdownMenuItem>Fashion</DropdownMenuItem>
            <DropdownMenuItem>Beauty</DropdownMenuItem>
            <DropdownMenuItem>Food</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h5 className="text-[14px] font-semibold text-[#111111]">PRODUCTS</h5>

          <button
            onClick={() => router.push("/dashboard?add-product=true")}
            className="px-[33px] py-1.5 bg-[#68DB25] rounded-[100px] text-[14px] font-semibold text-[#111111]"
          >
            Add Product
          </button>
        </div>

        {searchValue.trim() && !isLoading && !isFetching && (
          <p className="text-[14px] text-[#111111]">
            Results for <span className="font-semibold">"{searchValue}"</span>
          </p>
        )}
      </div>

      {isLoading || isFetching ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 gap-[18px] md:gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : hasProducts ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 gap-[18px] md:gap-4">
          {products?.map((product) => (
            <Link
              href={`/products/${product?.id}`}
              key={product.id}
              className="md:w-[251.2px] min-w-[166px] h-full p-2 border border-[#E5E5E5] rounded-[8px] space-y-3 relative"
            >
              <p className="text-[#111111] text-[12px] px-3 py-1 bg-[#FFFFFFC4] border w-fit rounded-[100px] border-[#E5E5E5] backdrop-blur-[30px] absolute top-4 right-4 z-10">
                Fashion
              </p>
              <div className="relative w-full h-[235px] overflow-hidden rounded-[4px] border border-[#E5E5E5]">
                <Image
                  src={product?.photo || "/global-bag.png"}
                  alt={product.name}
                  fill
                  loading="eager"
                  className="object-cover"
                  sizes="(min-width: 768px) 251px, 166px"
                />
              </div>

              <div className="space-y-1.5 text-[14px]">
                <p className="font-semibold text-[#111111] truncate">
                  {symbol}
                  {Number(product.price).toLocaleString()}
                </p>

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
            onClick={() => router.push("/dashboard?add-product=true")}
          />
        </div>
      )}
      <PaginationNavigator
        pagination={data?.data.pagination}
        loading={isLoading || isFetching}
      />

      <Drawer
        open={openAddProductDrawer}
        onClose={handleCloseAddProduct}
        placement="right"
        width="max-w-[640px] w-full"
        closeOnOverlayClick={false}
      >
        <AddProductDrawer onClose={handleCloseAddProduct} />
      </Drawer>

      <ShareSheet
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title="Share Store"
        text={`Check out ${userData?.data.store.name || "our store"} and browse our products.`}
        url={storeLink}
      />
    </div>
  );
}
