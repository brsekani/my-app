"use client";

import { StoreProduct } from "@/types/store-product";
import { StoreTheme } from "@/types/store-theme";
import { motion, Variants } from "framer-motion";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: StoreProduct[];
  storeTheme: StoreTheme;
  animationKey: string;
  gridVariants: Variants;
  cardVariants: Variants;
  onProductClick: (product: StoreProduct) => void;
}

const getGridClasses = (layout: StoreTheme["productLayout"]) => {
  switch (layout) {
    case "classic":
      return "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4";

    case "compact":
      return "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";

    case "spacious":
      return "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";

    case "editorial":
      return "grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4";

    case "showcase":
      return "grid auto-rows-auto grid-cols-2 gap-4 md:grid-cols-4";

    case "default":
    default:
      return "grid grid-cols-2 gap-[18px] md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5";
  }
};

export default function ProductGrid({
  products,
  storeTheme,
  animationKey,
  gridVariants,
  cardVariants,
  onProductClick,
}: ProductGridProps) {
  return (
    <motion.div
      key={`${animationKey}-${storeTheme.productLayout}`}
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className={getGridClasses(storeTheme.productLayout)}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          storeTheme={storeTheme}
          variants={cardVariants}
          onClick={() => onProductClick(product)}
        />
      ))}
    </motion.div>
  );
}
