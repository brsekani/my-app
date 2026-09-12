import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.shelfie.app",
  appName: "Shelfie",
  server: {
    url: "http://192.168.1.100:3000",
    cleartext: false,
  },
};

export default config;
