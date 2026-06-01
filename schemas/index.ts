import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

export const basicSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name is too long")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name is too long")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required(" Email is required"),
  password: Yup.string()
    .min(5)
    .matches(passwordRules, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const whatsappSchema = Yup.object({
  whatsapp: Yup.string()
    .required("Phone number is required")
    .test("is-valid-phone", "Invalid phone number", (value) =>
      value ? isValidPhoneNumber(value) : false,
    ),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required(" Email is required"),
  password: Yup.string()
    .min(5)
    .matches(passwordRules, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .required("Password is required"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required(" Email is required"),
});

export const productSchema = Yup.object({
  images: Yup.array()
    .min(1, "At least one image is required")
    .max(3, "You can only upload 3 images"),

  productName: Yup.string().trim().required("Product name is required"),

  description: Yup.string().trim().required("Description is required"),

  price: Yup.object({
    currency: Yup.string().required("Currency is required"),

    amount: Yup.string().required("Amount is required"),
  }),
});

export const profileSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),

  lastName: Yup.string().trim().required("Last name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  whatsapp: Yup.string()
    .required("Phone number is required")
    .test("is-valid-phone", "Invalid phone number", (value) =>
      value ? isValidPhoneNumber(value) : false,
    ),

  shopName: Yup.string().trim().required("Shop name is required"),

  shopBio: Yup.string().required("Shop bio is required"),
});

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),

  newPassword: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .matches(passwordRules, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    })
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Please confirm your password"),
});
