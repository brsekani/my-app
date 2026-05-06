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
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const stepOneSchema = Yup.object({
  shopName: Yup.string().required("Shop name is required"),
  shopBio: Yup.string().required("Shop bio is required"),
});

export const stepTwoSchema = Yup.object({
  whatsappNumber: Yup.string()
    .required("WhatsApp number is required")
    .min(10, "Invalid number"),
});
