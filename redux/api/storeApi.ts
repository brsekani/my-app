import {
  CustomerStoreResponse,
  PublicStoreProductsResponse,
  PublicStoreResponse,
} from "@/types/store-product";
import { baseApi } from "./baseApi";

export const storeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStore: builder.mutation<any, any>({
      query: (body) => ({
        url: "/customer/store",
        method: "POST",
        body,
      }),
    }),

    getCustomerStore: builder.query<CustomerStoreResponse, void>({
      query: () => ({
        url: "/customer/store",
        method: "GET",
      }),
    }),

    updateStore: builder.mutation<CustomerStoreResponse, FormData>({
      query: (body) => ({
        url: "/customer/store",
        method: "PUT",
        body,
      }),
    }),

    getPublicStore: builder.query<
      PublicStoreResponse,
      { slug?: string; domain?: string }
    >({
      query: ({ slug, domain }) => {
        const params = new URLSearchParams();

        if (slug) {
          params.set("slug", slug);
        }

        if (domain) {
          params.set("domain", domain);
        }

        return `/store?${params.toString()}`;
      },
    }),

    getPublicStoreProducts: builder.query<
      PublicStoreProductsResponse,
      {
        slug?: string;
        domain?: string;
        page?: number;
        per_page?: number;
        search?: string;
        sort_by?: string;
        sort_order?: "asc" | "desc";
      }
    >({
      query: ({
        slug,
        domain,
        page = 1,
        per_page = 10,
        search,
        sort_by,
        sort_order,
      }) => {
        const params = new URLSearchParams();

        if (slug) params.set("slug", slug);
        if (domain) params.set("domain", domain);

        params.set("page", String(page));
        params.set("per_page", String(per_page));

        if (search?.trim()) {
          params.set("search", search.trim());
        }
        if (sort_by) params.set("sort_by", sort_by);
        if (sort_order) params.set("sort_order", sort_order);

        return `/store/products?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useCreateStoreMutation,
  useGetCustomerStoreQuery,
  useUpdateStoreMutation,
  useGetPublicStoreQuery,
  useGetPublicStoreProductsQuery,
} = storeApi;
