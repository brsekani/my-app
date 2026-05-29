"use client";

import { useField } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import currencyCodes from "currency-codes";

const currencies = currencyCodes.data.map((currency) => ({
  code: currency.code,
  currency: currency.currency,
}));

type Props = {
  name: string;
  label?: string;
  disabled?: boolean;
};

export default function CustomAmountInput({
  name,
  label,
  disabled = false,
}: Props) {
  const [field, meta, helpers] = useField(name);

  const value = field.value || {
    currency: "NGN",
    amount: "",
  };

  const hasError = meta.touched && meta.error;

  // format number with commas
  const formatAmount = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");

    return numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-[14px] text-[#111111]">{label}</label>}

      <div className="space-y-0.5">
        <div className="flex items-center gap-3 w-full">
          {/* Currency Select */}
          <Select
            value={value.currency}
            defaultValue="NGN"
            onValueChange={(currency) =>
              helpers.setValue({
                ...value,
                currency,
              })
            }
            disabled={disabled}
          >
            <SelectTrigger className="w-[76px] !h-[45px] rounded bg-[#F5F5F5] border-none shadow-none focus:ring-0 flex items-center disabled:bg-[#F8F8F8] disabled:text-[#B0B0B0] disabled:border-[#E5E5E5] disabled:cursor-not-allowed">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>

            <SelectContent
              side="bottom"
              sideOffset={6}
              position="popper"
              align="start"
              className="max-h-[300px] min-w-[80px]"
            >
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Amount Input */}
          <input
            type="text"
            placeholder="0.00"
            value={value.amount}
            disabled={disabled}
            onChange={(e) => {
              helpers.setValue({
                ...value,
                amount: formatAmount(e.target.value),
              });
            }}
            onBlur={() => helpers.setTouched(true)}
            className={`flex-1 h-[45px] px-4 bg-[#F5F5F5] disabled:bg-[#F8F8F8] disabled:text-[#B0B0B0] disabled:border-[#E5E5E5] disabled:cursor-not-allowed rounded outline-none text-[14px] text-[#111111] placeholder:text-[#6B6B6B] border transition-all duration-200
            ${
              hasError
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-transparent focus:ring-1 focus:ring-[#A7E981]"
            }
          `}
          />
        </div>

        {meta.touched &&
          typeof meta.error === "object" &&
          meta.error !== null && (
            <p className="text-red-500 text-xs">
              {(meta.error as { amount?: string }).amount}
            </p>
          )}
      </div>
    </div>
  );
}
