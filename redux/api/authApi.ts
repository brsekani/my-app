import { baseApi } from "./baseApi";

import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  SocialLoginRequest,
  SocialLoginResponse,
} from "@/types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerCustomer: builder.mutation<SignupResponse, SignupRequest>({
      query: (customerDetails) => ({
        url: "/customer/auth/register",
        method: "POST",
        body: customerDetails,
      }),

      invalidatesTags: ["Auth"],
    }),

    socialLogin: builder.mutation<SocialLoginResponse, SocialLoginRequest>({
      query: (body) => ({
        url: "/customer/auth/social",
        method: "POST",
        body,
      }),
    }),

    loginCustomer: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/customer/auth/login",
        method: "POST",
        body: credentials,
      }),

      invalidatesTags: ["Auth"],
    }),

    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "/customer/auth/verify-email",
        method: "POST",
        body,
      }),
    }),

    resendVerification: builder.mutation<
      { code: number; message: string },
      void
    >({
      query: () => ({
        url: "/customer/auth/resend-verification",
        method: "POST",
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/customer/auth/logout",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSocialLoginMutation,
  useRegisterCustomerMutation,
  useLoginCustomerMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useLogoutMutation,
} = authApi;
