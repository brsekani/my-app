import { toast, ToastOptions } from "react-toastify";
import ToastBadge from "@/components/ToastBadge";

const options: ToastOptions = {
  className: "!bg-transparent !shadow-none !p-0",
  icon: false,
  closeButton: false,
  hideProgressBar: true,
  autoClose: 3000,
};

export const showToast = {
  success: (message: string, title = "Success") =>
    toast.success(
      <ToastBadge variant="success" title={title} description={message} />,
      {
        ...options,
        toastId: `${title}-${message}`,
      },
    ),

  error: (message: string, title = "Something went wrong") =>
    toast.error(
      <ToastBadge variant="error" title={title} description={message} />,
      {
        ...options,
        toastId: `${title}-${message}`,
      },
    ),

  warning: (message: string, title = "Warning") =>
    toast.warning(
      <ToastBadge variant="warning" title={title} description={message} />,
      {
        ...options,
        toastId: `${title}-${message}`,
      },
    ),

  info: (message: string, title = "Information") =>
    toast.info(
      <ToastBadge variant="info" title={title} description={message} />,
      {
        ...options,
        toastId: `${title}-${message}`,
      },
    ),
};
