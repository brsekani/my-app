import {
  ConfirmPasswordResetRequest,
  ConfirmPasswordResetResponse,
  RequestPasswordResetRequest,
  RequestPasswordResetResponse,
  VerifyPasswordResetOtpRequest,
  VerifyPasswordResetOtpResponse,
} from "@/types/passwordReset";

import { baseApi } from "./baseApi";

export const passwordResetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestPasswordReset: builder.mutation<
      RequestPasswordResetResponse,
      RequestPasswordResetRequest
    >({
      query: (body) => ({
        url: "/customer/auth/password/reset/request",
        method: "POST",
        body,
      }),
    }),

    verifyPasswordResetOtp: builder.mutation<
      VerifyPasswordResetOtpResponse,
      VerifyPasswordResetOtpRequest
    >({
      query: (body) => ({
        url: "/customer/auth/password/reset/verification",
        method: "POST",
        body,
      }),
    }),

    confirmPasswordReset: builder.mutation<
      ConfirmPasswordResetResponse,
      ConfirmPasswordResetRequest
    >({
      query: (body) => ({
        url: "/customer/auth/password/reset/confirmation",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRequestPasswordResetMutation,
  useVerifyPasswordResetOtpMutation,
  useConfirmPasswordResetMutation,
} = passwordResetApi;
