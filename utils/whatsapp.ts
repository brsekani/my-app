export const openWhatsApp = ({
  phone,
  message,
}: {
  phone?: string | null;
  message?: string;
}) => {
  if (!phone) return;

  const cleanPhone = phone.replace(/\D/g, "");

  if (!cleanPhone) return;

  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    message ?? "",
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
};
