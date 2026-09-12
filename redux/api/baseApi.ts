import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",

  baseQuery: fetchBaseQuery({
    // RTK Query communicates with Next.js, not Laravel.
    baseUrl: "/api",

    // Sends same-origin cookies automatically.
    credentials: "same-origin",

    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");

      return headers;
    },
  }),

  tagTypes: ["Auth", "Customer", "Shop", "Product", "Order"],

  endpoints: () => ({}),
});
