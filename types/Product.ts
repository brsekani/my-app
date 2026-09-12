export interface ProductCategory {
  id: string;
  store_id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string;
  children: ProductCategory[];
  products_count: number;
  created_at: string;
}

export interface Product {
  id: string;
  store_id: string;
  name: string;
  description: string;
  price: string;
  compare_at_price: string | null;
  stock_quantity: number;
  photo: string | null;
  photos: string[];
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  categories: ProductCategory[];
  created_at: string;
}

export interface GetProductResponse {
  code: number;
  data: {
    product: Product;
  };
}
