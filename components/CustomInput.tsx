import { forwardRef } from "react";
import { getCountryCallingCode } from "react-phone-number-input";

export const CustomInput = forwardRef(
  ({ value, onChange, country, ...rest }: any, ref: any) => {
    let localValue = value || "";

    // remove country code safely
    if (value && country) {
      const code = `+${getCountryCallingCode(country)}`;

      if (value.startsWith(code)) {
        localValue = value.slice(code.length);
      }
    }

    return (
      <input
        {...rest}
        ref={ref}
        value={localValue}
        onChange={(e) => {
          const inputValue = e.target.value;

          if (!country) {
            onChange(inputValue);
            return;
          }

          const code = `+${getCountryCallingCode(country)}`;

          // always send full number back to library
          onChange(`${code}${inputValue}`);
        }}
        placeholder="(801) 555-0123"
        className="flex-1 outline-none focus:border-[#68DB25] bg-[#F5F5F5] px-4 h-[45px] rounded border border-[#F5F5F5] text-[14px] leading-[150%]"
      />
    );
  },
);
