export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  other_name: string | null;
  email: string;
  phone_no: string | null;
  profile_image: string | null;
  gender: string | null;
  status: string;
  full_name: string;
  role: string[];
  email_verified_at: string | null;
  two_factor_confirmed_at: string | null;
  created_at: string;
}

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface SignupResponse {
  code: number;
  message: string;
  data: {
    user: Customer;

    /*
     * These fields are optional because registration may require
     * email verification before the user becomes authenticated.
     */
    requires_email_verification?: boolean;
    email_verification_required?: boolean;
  };
}

export interface ApiValidationError {
  code?: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  data: {
    user: Customer;
    roles: string[];
    permissions: string[];

    challenge_token?: string;
    requires_two_factor?: boolean;
  };
}
