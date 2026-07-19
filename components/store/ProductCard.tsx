"use client";

import { StoreProduct } from "@/types/store-product";
import { StoreTheme } from "@/types/store-theme";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
  product: StoreProduct;
  storeTheme: StoreTheme;
  index: number;
  variants: Variants;
  onClick: () => void;
}

interface LayoutClasses {
  card: string;
  clickableArea: string;
  imageWrapper: string;
  content: string;
  price: string;
  name: string;
  description: string;
  button: string;
}

const getLayoutClasses = (
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

export default function ProductCard({
  product,
  storeTheme,
  index,
  variants,
  onClick,
}: ProductCardProps) {
  const classes = getLayoutClasses(storeTheme.productLayout);

  const isDefault = storeTheme.productLayout === "default";

  const isEditorial = storeTheme.productLayout === "editorial";

  const isFeatured = storeTheme.productLayout === "showcase" && index === 0;

  return (
    <motion.article
      variants={variants}
      whileHover={{
        y: -5,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      whileTap={{ scale: 0.98 }}
      className={`${classes.card} ${
        isFeatured ? "col-span-2 row-span-2 md:col-span-2" : ""
      }`}
    >
      <div
        className={classes.clickableArea}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        }}
      >
        <div
          className={`${classes.imageWrapper} ${
            isFeatured ? "min-h-[340px] md:min-h-[460px]" : ""
          }`}
        >
          <motion.div
            className="relative h-full w-full"
            whileHover={{ scale: 1.06 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
          >
            <Image
              src={product.image[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes={
                isFeatured
                  ? "(min-width: 1024px) 50vw, 100vw"
                  : "(min-width: 1280px) 251px, (min-width: 768px) 33vw, 50vw"
              }
            />
          </motion.div>

          {isFeatured && (
            <span
              className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white"
              style={{
                backgroundColor: storeTheme.brandColor,
              }}
            >
              Featured
            </span>
          )}
        </div>

        <div className={classes.content}>
          <p
            className={classes.price}
            style={{
              color: isDefault ? "#111111" : storeTheme.brandColor,
            }}
          >
            {product.price}
          </p>

          <h3 className={classes.name}>{product.name}</h3>

          <p className={classes.description}>{product.description}</p>
        </div>
      </div>

      <button
        type="button"
        className={classes.button}
        style={
          isDefault
            ? undefined
            : isEditorial
              ? {
                  borderColor: storeTheme.brandColor,
                  color: storeTheme.brandColor,
                }
              : {
                  backgroundColor: storeTheme.brandColor,
                }
        }
      >
        Order on WhatsApp
      </button>
    </motion.article>
  );
}
