"use client";

import { useGetPublicStoreQuery } from "@/redux/api/storeApi";
import { getLayoutClasses } from "@/store/product-layout";
import { StoreProduct } from "@/types/store-product";
import { StoreTheme } from "@/types/store-theme";
import { getCurrencyInfo } from "@/utils/currency";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";

interface ProductCardProps {
  product: StoreProduct;
  storeTheme: StoreTheme;
  index: number;
  variants: Variants;
  onClick: () => void;
  onClickWhatappBtn: () => void;
}

export default function ProductCard({
  product,
  storeTheme,
  index,
  variants,
  onClick,
  onClickWhatappBtn,
}: ProductCardProps) {
  const params = useParams();

  const slug = params.id as string;

  const { data, isLoading, isError } = useGetPublicStoreQuery({
    slug,
  });

  const currency = data?.data?.store?.currency ?? "NGN";

  const { code, symbol } = getCurrencyInfo(currency);

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
              src={product?.photo || "/images/product-placeholder.png"}
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
            {symbol}
            {Number(product.price).toLocaleString()}
          </p>

          <h3 className={classes.name}>{product?.name}</h3>

          <p className={classes.description}>{product.description}</p>
        </div>
      </div>

      <button
        type="button"
        className={classes.button}
        onClick={onClickWhatappBtn}
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
