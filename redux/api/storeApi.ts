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
  }),
});

export const { useCreateStoreMutation } = storeApi;
