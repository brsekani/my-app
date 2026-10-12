export interface InitiatePasswordChangeResponse {
  code: number;
  message: string;
  data: {
    pending_token: string;
  };
}

export interface VerifyPasswordChangeOtpRequest {
  otp: string;
  pending_token: string;
}

export interface VerifyPasswordChangeOtpResponse {
  code: number;
  message: string;
  data: {
    reset_token: string;
  };
}

export interface ConfirmPasswordChangeRequest {
  password: string;
  password_confirmation: string;
  reset_token: string;
}

export interface ConfirmPasswordChangeResponse {
  code: number;
  message: string;
}
