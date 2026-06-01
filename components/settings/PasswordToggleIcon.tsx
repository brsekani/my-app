import Image from "next/image";
import eyeOpen from "@/assets/svgs/eye-open.svg";
import eyeClose from "@/assets/svgs/eye-close.svg";

export default function PasswordToggleIcon({
  show,
  onClick,
}: {
  show: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-[14px] top-1/2 -translate-y-1/2 cursor-pointer"
      aria-label={show ? "Hide password" : "Show password"}
    >
      <Image
        src={show ? eyeOpen : eyeClose}
        alt={show ? "Hide password" : "Show password"}
        width={20}
        height={20}
      />
    </button>
  );
}
