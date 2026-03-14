import * as Yup from "yup";

export const shopSchema = Yup.object({
  shopName: Yup.string().required("Shop name is required"),
  shopBio: Yup.string().required("Shop bio is required"),
});
