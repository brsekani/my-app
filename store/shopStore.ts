import { create } from "zustand";
import { persist } from "zustand/middleware";

type ShopState = {
  shopName: string;
  shopBio: string;
  whatsapp: string;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setShopData: (data: Partial<ShopState>) => void;
  resetShop: () => void;
};

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      shopName: "",
      shopBio: "",
      whatsapp: "",
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      setShopData: (data) => set((state) => ({ ...state, ...data })),

      resetShop: () =>
        set({
          shopName: "",
          shopBio: "",
          whatsapp: "",
        }),
    }),
    {
      name: "shop-storage",

      // ✅ ONLY persist actual data
      partialize: (state) => ({
        shopName: state.shopName,
        shopBio: state.shopBio,
        whatsapp: state.whatsapp,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
