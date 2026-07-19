export type ProductLayout =
  | "default"
  | "classic"
  | "compact"
  | "spacious"
  | "editorial"
  | "showcase";

export interface StoreTheme {
  name?: string;
  brandColor: string;
  backgroundColor: string;
  productLayout: ProductLayout;
}
