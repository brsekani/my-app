import type { StoreTheme } from "@/types/store-theme";

export interface LayoutClasses {
  card: string;
  clickableArea: string;
  imageWrapper: string;
  content: string;
  price: string;
  name: string;
  description: string;
  button: string;
}

export const getLayoutClasses = (
  layout: StoreTheme["productLayout"],
): LayoutClasses => {
  switch (layout) {
    case "classic":
      return {
        card: "flex h-full min-w-0 flex-col overflow-hidden rounded-[12px] border border-black/10 bg-white",
        clickableArea: "flex-1 cursor-pointer",
        imageWrapper:
          "relative aspect-square w-full overflow-hidden border-b border-black/5",
        content: "space-y-2 p-4",
        price: "text-[14px] font-semibold",
        name: "line-clamp-1 text-[14px] font-medium text-[#111111]",
        description: "line-clamp-2 text-[13px] leading-5 text-[#777777]",
        button:
          "mx-4 mb-4 mt-auto rounded-full px-4 py-2.5 text-[13px] font-semibold text-white",
      };

    case "compact":
      return {
        card: "flex h-full min-w-0 flex-col overflow-hidden rounded-[8px] border border-black/10 bg-white",
        clickableArea: "flex-1 cursor-pointer",
        imageWrapper:
          "relative aspect-square w-full overflow-hidden border-b border-black/5",
        content: "space-y-1.5 p-2.5",
        price: "text-[12px] font-semibold",
        name: "line-clamp-1 text-[12px] font-medium text-[#111111]",
        description: "hidden",
        button:
          "mx-2.5 mb-2.5 mt-auto rounded-md px-2 py-2 text-[11px] font-semibold text-white",
      };

    case "spacious":
      return {
        card: "flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-sm",
        clickableArea: "flex-1 cursor-pointer",
        imageWrapper:
          "relative aspect-[4/3] w-full overflow-hidden border-b border-black/5",
        content: "space-y-2.5 p-5",
        price: "text-[15px] font-semibold",
        name: "line-clamp-1 text-[16px] font-semibold text-[#111111]",
        description: "line-clamp-2 text-[14px] leading-5 text-[#777777]",
        button:
          "mx-5 mb-5 mt-auto rounded-xl px-4 py-3 text-[14px] font-semibold text-white",
      };

    case "editorial":
      return {
        card: "flex h-full min-w-0 flex-col bg-transparent",
        clickableArea: "flex-1 cursor-pointer",
        imageWrapper:
          "relative aspect-[3/4] w-full overflow-hidden bg-[#F4F4F4]",
        content: "space-y-2 py-4",
        price: "text-[13px] font-semibold uppercase tracking-wide",
        name: "line-clamp-1 text-[15px] font-medium text-[#111111]",
        description: "line-clamp-2 text-[13px] leading-5 text-[#777777]",
        button:
          "mt-auto w-full border px-4 py-2.5 text-[13px] font-semibold transition",
      };

    case "showcase":
      return {
        card: "flex h-full min-w-0 flex-col overflow-hidden rounded-[18px] border border-black/10 bg-white",
        clickableArea: "flex flex-1 cursor-pointer flex-col",
        imageWrapper:
          "relative min-h-[220px] flex-1 overflow-hidden border-b border-black/5",
        content: "space-y-2 p-4",
        price: "text-[14px] font-semibold",
        name: "line-clamp-1 text-[15px] font-semibold text-[#111111]",
        description: "line-clamp-2 text-[13px] leading-5 text-[#777777]",
        button:
          "mx-4 mb-4 mt-auto rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white",
      };

    case "default":
    default:
      return {
        card: "flex h-full w-full min-w-0 flex-col rounded-[8px] border border-[#E5E5E5] bg-white p-2",
        clickableArea: "cursor-pointer space-y-3",
        imageWrapper:
          "relative h-[235px] w-full overflow-hidden rounded-[4px] border border-[#E5E5E5]",
        content: "space-y-1.5 pb-0 text-[14px] md:pb-2",
        price: "font-semibold text-[#111111]",
        name: "line-clamp-1 text-[#111111]",
        description: "line-clamp-2 text-[#777777]",
        button:
          "mt-auto hidden w-full rounded-[100px] border border-[#111111] py-1.5 text-[14px] font-semibold text-[#111111] transition-colors duration-200 hover:bg-[#111111] hover:text-white md:block",
      };
  }
};
