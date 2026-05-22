"use client";

import Image, { StaticImageData } from "next/image";

interface EmptyStateProps {
  icon: StaticImageData | string;
  title: string | React.ReactNode;
  buttonText?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  buttonText,
  onClick,
  children,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`leading-[100%] space-y-6 flex items-center flex-col ${className}`}
    >
      <div className="bg-[#F5F5F5] border border-[#E5E5E5] w-fit py-[24.5px] px-[20.5px] rounded-[24px]">
        <Image src={icon} alt="empty-icon" />
      </div>

      <p className="text-[16px] text-[#777777] text-center">{title}</p>

      {buttonText && (
        <button
          onClick={onClick}
          className="text-[#111111] font-semibold text-[14px] underline cursor-pointer"
        >
          {buttonText}
        </button>
      )}

      {children}
    </div>
  );
}
