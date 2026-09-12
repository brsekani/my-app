import { Capacitor } from "@capacitor/core";
import { Share } from "@capacitor/share";

export async function nativeShare(title: string, text: string, url: string) {
  if (Capacitor.isNativePlatform()) {
    await Share.share({
      title,
      text,
      url,
      dialogTitle: "Share",
    });

    return true;
  }

  if (navigator.share) {
    await navigator.share({
      title,
      text,
      url,
    });

    return true;
  }

  return false;
}
