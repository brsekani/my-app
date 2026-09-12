"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaTelegram,
  FaFacebookF,
  FaXTwitter,
  FaLink,
  FaShareNodes,
} from "react-icons/fa6";

import { nativeShare } from "@/lib/share";

interface ShareSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  text: string;
  url: string;
}

export default function ShareSheet({
  open,
  onClose,
  title,
  text,
  url,
}: ShareSheetProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const openUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    onClose();
  };

  const more = async () => {
    await nativeShare(title, text, url);
    onClose();
  };

  const Item = ({
    icon,
    label,
    onClick,
    bg,
  }: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    bg: string;
  }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 active:scale-95 transition"
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${bg}`}
      >
        {icon}
      </div>

      <span className="text-xs font-medium text-[#555]">{label}</span>
    </button>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 400 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.y > 150) onClose();
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 30,
            }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[32px] bg-white px-6 pt-3 pb-10 shadow-2xl"
          >
            <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-gray-300" />

            <h2 className="mb-8 text-center text-lg font-semibold">
              Share Product
            </h2>

            <div className="grid grid-cols-4 gap-y-8">
              <Item
                label="WhatsApp"
                bg="bg-green-500"
                icon={<FaWhatsapp />}
                onClick={() =>
                  openUrl(`https://wa.me/?text=${encodedText}%20${encodedUrl}`)
                }
              />

              <Item
                label="Telegram"
                bg="bg-sky-500"
                icon={<FaTelegram />}
                onClick={() =>
                  openUrl(
                    `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
                  )
                }
              />

              <Item
                label="Facebook"
                bg="bg-blue-600"
                icon={<FaFacebookF />}
                onClick={() =>
                  openUrl(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
                  )
                }
              />

              <Item
                label="X"
                bg="bg-black"
                icon={<FaXTwitter />}
                onClick={() =>
                  openUrl(
                    `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
                  )
                }
              />

              <Item
                label="Copy"
                bg="bg-gray-700"
                icon={<FaLink />}
                onClick={copy}
              />

              <Item
                label="More"
                bg="bg-[#68DB25]"
                icon={<FaShareNodes />}
                onClick={more}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
