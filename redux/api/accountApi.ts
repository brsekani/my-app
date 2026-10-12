import {
  ConfirmPasswordChangeRequest,
  ConfirmPasswordChangeResponse,
  InitiatePasswordChangeResponse,
  VerifyPasswordChangeOtpRequest,
  VerifyPasswordChangeOtpResponse,
} from "@/types/accountApi";
import { baseApi } from "./baseApi";

export const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePasswordChange: builder.mutation<
      InitiatePasswordChangeResponse,
      void
    >({
      query: () => ({
        url: "/customer/account/security/password",
        method: "PATCH",
      }),
    }),

    verifyPasswordChangeOtp: builder.mutation<
      VerifyPasswordChangeOtpResponse,
      VerifyPasswordChangeOtpRequest
    >({
      query: (body) => ({
        url: "/customer/account/security/password/verification",
        method: "POST",
        body,
      }),
    }),

    confirmPasswordChange: builder.mutation<
      ConfirmPasswordChangeResponse,
      ConfirmPasswordChangeRequest
    >({
      query: (body) => ({
        url: "/customer/account/security/password/confirmation",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useInitiatePasswordChangeMutation,
  useVerifyPasswordChangeOtpMutation,
  useConfirmPasswordChangeMutation,
} = accountApi;
