"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type Placement = "left" | "right" | "top" | "bottom";
type Size = "sm" | "md" | "lg" | "xl" | "full";

const sizeMap: Record<Size, string> = {
  sm: "w-64",
  md: "w-80",
  lg: "w-[28rem]",
  xl: "w-[36rem]",
  full: "w-[95vw]",
};

const heightMap: Record<Size, string> = {
  sm: "h-1/4",
  md: "h-1/3",
  lg: "h-1/2",
  xl: "h-2/3",
  full: "h-[95vh]",
};

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  placement?: Placement;
  size?: Size;
  width?: string; // 👈 add this
  closeOnOverlayClick?: boolean;
};

export default function Drawer({
  open,
  onClose,
  children,
  placement = "right",
  size = "md",
  width,
  closeOnOverlayClick = true,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  const portalRoot = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let root = document.getElementById("drawer-root");

    if (!root) {
      root = document.createElement("div");
      root.id = "drawer-root";
      document.body.appendChild(root);
    }

    portalRoot.current = root;
  }, []);

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Lock scroll
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // Overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!closeOnOverlayClick) return;
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!portalRoot.current) return null;

  // Animation variants based on placement
  const variants = {
    hidden: {
      x: placement === "left" ? "-100%" : placement === "right" ? "100%" : 0,
      y: placement === "top" ? "-100%" : placement === "bottom" ? "100%" : 0,
    },
    visible: { x: 0, y: 0 },
    exit: {
      x: placement === "left" ? "-100%" : placement === "right" ? "100%" : 0,
      y: placement === "top" ? "-100%" : placement === "bottom" ? "100%" : 0,
    },
  };

  const isVertical = placement === "top" || placement === "bottom";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0000004D] dark:bg-[#FFFFFF4D]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={drawerRef}
            className={`
              fixed
              ${isVertical ? "w-full" : (width ?? sizeMap[size])}  
              ${!isVertical ? "h-full" : heightMap[size]}

              ${placement === "right" && "top-0 right-0"}
              ${placement === "left" && "top-0 left-0"}
              ${placement === "top" && "top-0 left-0"}
              ${placement === "bottom" && "bottom-0 left-0"}

              overflow-y-auto
            `}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot.current,
  );
}
