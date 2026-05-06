"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

type Size = "sm" | "md" | "lg" | "xl" | "full";

const sizeMap: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[95vw]",
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: Size;
  width?: string;
  closeOnOverlayClick?: boolean;
  useBottomSheetOnMobile?: boolean;
};

export default function Modal({
  open,
  onClose,
  children,
  size = "md",
  width,
  closeOnOverlayClick = true,
  useBottomSheetOnMobile = false,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const shouldUseBottomSheet = isMobile && useBottomSheetOnMobile;

  const portalRoot = useRef<HTMLElement | null>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!closeOnOverlayClick) return;
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Lock body scroll
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    return () => {
      const y = Math.abs(parseInt(document.body.style.top || "0"));
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, y);
    };
  }, [open]);

  useEffect(() => {
    let root = document.getElementById("modal-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "modal-root";
      document.body.appendChild(root);
    }
    portalRoot.current = root;
  }, []);

  if (!portalRoot.current) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="modal-overlay-wrapper"
          className={`
  fixed inset-0 z-[9999] bg-[#0000004D] dark:bg-[#FFFFFF40]
  ${
    shouldUseBottomSheet
      ? "flex items-end justify-center"
      : "flex items-center justify-center p-4"
  }
`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            ref={modalRef}
            data-testid="modal-inner"
            className={`
    ${width ?? sizeMap[size]}
    max-h-[90vh] overflow-y-auto
    ${shouldUseBottomSheet ? "w-full rounded-t-2xl bg-white" : ""}
  `}
            drag={shouldUseBottomSheet ? "y" : false}
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 300 }}
            dragElastic={0.2}
            // ✅ Close when dragged enough
            onDragEnd={(event, info) => {
              if (info.offset.y > 120 || info.velocity.y > 800) {
                onClose();
              }
            }}
            initial={
              shouldUseBottomSheet
                ? { y: "100%" } // start off-screen bottom
                : { scale: 0.96, y: 20 }
            }
            animate={
              shouldUseBottomSheet
                ? { y: 0 } // slide up
                : { scale: 1, y: 0 }
            }
            exit={
              shouldUseBottomSheet
                ? { y: "100%" } // slide down on close
                : { scale: 0.96, y: 20 }
            }
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot.current,
  );
}
