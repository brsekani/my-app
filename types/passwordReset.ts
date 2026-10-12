export interface RequestPasswordResetRequest {
  email: string;
}

export interface RequestPasswordResetResponse {
  code: number;
  message: string;
  data: {
    pending_token: string;
  };
}

export interface VerifyPasswordResetOtpRequest {
  otp: string;
  pending_token: string;
}

export interface VerifyPasswordResetOtpResponse {
  code: number;
  message: string;
  data: {
    reset_token: string;
  };
}

export interface ConfirmPasswordResetRequest {
  reset_token: string;
  password: string;
  password_confirmation: string;
}

export interface ConfirmPasswordResetResponse {
  code: number;
  message: string;
}
