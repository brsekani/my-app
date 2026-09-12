import { GetProductResponse } from "@/types/Product";
import { baseApi } from "./baseApi";

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
  status: string;
  created_at: string;
}

export interface Pagination {
  from: number;
  to: number;
  total: number;
  per_page: number;
  first_page: number;
  previous_page: number | null;
  current_page: number;
  next_page: number | null;
  last_page: number;
}

export interface GetProductsResponse {
  code: number;
  message: string;
  data: {
    products: Product[];
    pagination: Pagination;
  };
}

export interface CreateProductResponse {
  code: number;
  message: string;
  data: {
    product: {
      id: string;
      name: string;
      description: string | null;
      price: string;
      compare_at_price: string | null;
      stock_quantity: number;
      status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
      photo: string | null;
      photos: string[];
      created_at: string;
    };
  };
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      GetProductsResponse,
      { page?: number; per_page?: number; search?: string }
    >({
      query: ({ page = 1, per_page = 10, search = "" } = {}) => ({
        url: `/customer/store/products?page=${page}&per_page=${per_page}&search=${encodeURIComponent(search)}`,
        method: "GET",
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.data.products.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    createProduct: builder.mutation<CreateProductResponse, FormData>({
      query: (formData) => ({
        url: "/customer/store/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    getProductById: builder.query<GetProductResponse, string>({
      query: (id) => ({
        url: `/customer/store/products/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    updateProduct: builder.mutation<
      CreateProductResponse,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/customer/store/products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    deleteProduct: builder.mutation<{ code: number; message: string }, string>({
      query: (id) => ({
        url: `/customer/store/products/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (_result, _error, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
