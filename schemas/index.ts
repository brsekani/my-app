import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

const passwordValidation = (label = "Password") =>
  Yup.string()
    .min(5, `${label} must be at least 5 characters`)
    .test("password-rules", function (value) {
      if (!value) {
        return this.createError({ message: `${label} is required` });
      }

      const missing: string[] = [];

      if (!/[A-Z]/.test(value)) missing.push("one uppercase letter");
      if (!/[a-z]/.test(value)) missing.push("one lowercase letter");
      if (!/[0-9]/.test(value)) missing.push("one number");

      if (missing.length === 0) return true;

      return this.createError({
        message: `${label} must contain at least ${missing.join(", and ")}`,
      });
    })
    .required(`${label} is required`);

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
  password: passwordValidation("Password"),
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
  password: passwordValidation("Password"),
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

  newPassword: passwordValidation("New password"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Please confirm your password"),
});
