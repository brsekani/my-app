"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ViewProductImageProps {
  images: any[];
  initialIndex?: number;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ViewProductImage({
  images,
  initialIndex = 0,
  onClose,
}: ViewProductImageProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const hasManyImages = images.length > 1;

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50 && hasManyImages) goNext();
    if (distance < -50 && hasManyImages) goPrev();

    setTouchStart(null);
  };

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#111111] cursor-pointer"
      >
        ✕
      </button>

      <div
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[500px] overflow-hidden rounded-lg bg-[#F5F5F5]"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{
              x: direction > 0 ? "100%" : "-100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: direction > 0 ? "-100%" : "100%",
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`Product image ${currentIndex + 1}`}
              fill
              className="object-contain"
              // sizes="(max-width: 768px) 100vw, 640px"
              priority={currentIndex === initialIndex}
            />
          </motion.div>
        </AnimatePresence>

        {hasManyImages && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-0 top-0 z-20 h-full w-1/2 cursor-pointer"
              aria-label="Previous image"
            />

            <button
              type="button"
              onClick={goNext}
              className="absolute right-0 top-0 z-20 h-full w-1/2 cursor-pointer"
              aria-label="Next image"
            />
          </>
        )}
      </div>
    </div>
  );
}
