import { ProductLayout } from "@/types/store-theme";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRODUCT_LAYOUT_CONFIG: Record<
  ProductLayout,
  {
    grid: string;
    card: string;
    image: string;
    content: string;
    button: string;
  }
> = {
  default: {
    grid: "grid grid-cols-2 gap-[18px] md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5",

    card: "flex h-full w-full min-w-0 flex-col rounded-[8px] border border-[#E5E5E5] bg-white p-2",

    image:
      "relative h-[235px] w-full overflow-hidden rounded-[4px] border border-[#E5E5E5]",

    content: "space-y-1.5 pb-0 text-[14px] md:pb-2",

    button:
      "hidden w-full rounded-[100px] border border-[#111111] py-1.5 text-[14px] font-semibold text-[#111111] transition-colors duration-200 hover:bg-[#111111] hover:text-white md:block",
  },

  classic: {
    grid: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
    card: "flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white",
    image: "relative aspect-square w-full overflow-hidden",
    content: "flex flex-1 flex-col p-4",
    button: "rounded-xl",
  },

  compact: {
    grid: "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5",
    card: "flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white",
    image: "relative aspect-square w-full overflow-hidden",
    content: "flex flex-1 flex-col p-2.5",
    button: "rounded-lg",
  },

  spacious: {
    grid: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
    card: "flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm",
    image: "relative aspect-[4/3] w-full overflow-hidden",
    content: "flex flex-1 flex-col p-5",
    button: "rounded-2xl",
  },

  editorial: {
    grid: "grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3",
    card: "flex h-full flex-col overflow-hidden bg-transparent",
    image: "relative aspect-[3/4] w-full overflow-hidden",
    content: "flex flex-1 flex-col py-4",
    button: "rounded-none",
  },

  showcase: {
    grid: "grid auto-rows-[220px] grid-cols-2 gap-4 md:auto-rows-[280px] md:grid-cols-4",
    card: "flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white",
    image: "relative min-h-0 flex-1 overflow-hidden",
    content: "p-4",
    button: "rounded-xl",
  },
};
