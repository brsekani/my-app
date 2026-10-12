import { StaticImageData } from "next/image";
import { ProductLayout } from "./store-theme";

export interface Store {
  id: string;
  name: string;
  description: string;
  tagline: string;
  logo_url: string;
  currency: string;
  phone: string;
  email: string;
  address: string;
  whatsapp_number: string;
  domain: string | null;
  slug: string;
  product_layout: string;
  brand_color: string;
  background_color: string;
  status: string;
  products_count: number;
  created_at: string;
}

export interface CustomerStoreResponse {
  code: number;
  message: string | null;
  data: {
    store: Store;
  };
}

export interface PublicStore {
  id: string;
  name: string;
  description: string | null;
  tagline: string | null;
  logo_url: string | null;
  currency: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  whatsapp_number: string | null;
  domain: string | null;
  slug: string;
  product_layout: ProductLayout;
  brand_color: string | null;
  background_color: string | null;
  status: string;
  products_count: number;
  created_at: string;
}

export interface PublicStoreResponse {
  code: number;
  data: {
    store: PublicStore;
  };
}

export interface StoreProductCategory {
  id: string;
  name: string;
}

export interface StoreProduct {
  id: string;
  store_id: string;
  name: string;
  description: string | null;
  price: string;
  compare_at_price: string | null;
  stock_quantity: number;
  photo: string | null;
  status: string;
  categories: StoreProductCategory[];
  created_at: string;
}

export interface StoreProductsPagination {
  current_page: number;
  first_page: number;
  last_page: number;
  next_page: number | null;
  previous_page: number | null;
  total: number;
  per_page: number;
  from: number | null;
  to: number | null;
}

export interface PublicStoreProductsResponse {
  code: number;
  message: string | null;
  data: {
    products: StoreProduct[];
    pagination: StoreProductsPagination;
  };
}
