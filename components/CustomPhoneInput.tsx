"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en.json";
import { useField } from "formik";
import { CustomInput } from "./CustomInput";
import CountrySelect from "./CountrySelect";

type Props = {
  name: string;
  label?: string;
  disabled?: boolean;
};

export default function CustomPhoneInput({
  name,
  label,
  disabled = false,
}: Props) {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="space-y-2 w-full relative text-[16px] leading-[150%] text-[#0C0A09] dark:text-[#D6D3D1] bg-transparent">
      {label && (
        <label className="text-[14px] leading-[140%] text-[#44403C] dark:text-[#D6D3D1]">
          {label}
        </label>
      )}

      <div className="space-y-1 w-full">
        <div
          className={`w-full text-[16px] leading-[150%] mt-0.5  outline-none ${
            disabled && "pointer-events-none"
          }`}
        >
          <PhoneInput
            className="phone-input"
            international={false}
            defaultCountry="NG"
            value={field.value}
            onChange={(value) => helpers.setValue(value)}
            onBlur={() => helpers.setTouched(true)}
            flags={flags}
            disabled={disabled}
            countrySelectComponent={(props) => (
              <CountrySelect {...props} labels={en} />
            )}
            inputComponent={CustomInput}
          />
        </div>

        {meta.touched && meta.error && (
          <p className="text-[#EF4444] text-xs text-start">{meta.error}</p>
        )}
      </div>
    </div>
  );
}
