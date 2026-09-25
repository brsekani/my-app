export const getStoreCurrency = (storeData?: {
  data?: {
    store?: {
      currency?: string;
    };
  };
}): string => {
  return storeData?.data?.store?.currency ?? "NGN";
};

export const getCurrencyInfo = (currencyCode?: string) => {
  const code = currencyCode || "NGN";

  const symbol =
    new Intl.NumberFormat("en", {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
    })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value || code;

  return {
    code,
    symbol,
  };
};
