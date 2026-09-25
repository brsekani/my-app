"use client";

import { useMemo, useState } from "react";
import { useField } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import currencyCodes from "currency-codes";
import { Search, X } from "lucide-react";

const currencies = currencyCodes.data
  .map((currency) => ({
    code: currency.code,
    currency: currency.currency,
  }))
  .sort((a, b) => a.currency.localeCompare(b.currency));

type Props = {
  name: string;
  label?: string;
  disabled?: boolean;
  mode?: "both" | "currency" | "amount";
  max?: number;
  maxLength?: number;
  currencyCode?: string;
  currencySymbol?: string;
};

const getCurrencySymbol = (code: string) => {
  try {
    return (
      new Intl.NumberFormat("en", {
        style: "currency",
        currency: code,
        currencyDisplay: "narrowSymbol",
      })
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value || code
    );
  } catch {
    return code;
  }
};

export default function CustomAmountInput({
  name,
  label,
  disabled = false,
  mode = "both",
  max,
  maxLength = 12,
  currencyCode = "NGN",
  currencySymbol = "₦",
}: Props) {
  const [field, meta, helpers] = useField(name);
  const [search, setSearch] = useState("");

  console.log(field);

  const value = field.value ?? "";

  const hasError = meta.touched && meta.error;

  const filteredCurrencies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return currencies;

    return currencies.filter(
      (currency) =>
        currency.currency.toLowerCase().includes(query) ||
        currency.code.toLowerCase().includes(query),
    );
  }, [search]);

  const formatAmount = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");
    return numbersOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="w-full space-y-2">
      {label && <label className="text-[14px] text-[#111111]">{label}</label>}{" "}
      {mode !== "currency" && (
        <span className="text-sm text-[#111111]">({currencyCode})</span>
      )}
      <div className="space-y-0.5">
        <div
          className={`w-full ${
            mode === "both" ? "flex items-center gap-3" : ""
          }`}
        >
          {/* Currency */}
          {mode !== "amount" && (
            <Select
              value={value.currency}
              defaultValue="NGN"
              onValueChange={(currency) => {
                helpers.setValue({
                  ...value,
                  currency,
                });

                setSearch("");
              }}
              disabled={disabled}
            >
              <SelectTrigger
                className={`!h-[45px] rounded bg-[#F5F5F5] border-none shadow-none focus:ring-0 disabled:bg-[#F8F8F8] disabled:text-[#B0B0B0] disabled:border-[#E5E5E5] disabled:cursor-not-allowed ${
                  mode === "both" ? "!w-[76px]" : "!w-full"
                }`}
              >
                <SelectValue placeholder="Currency" />
              </SelectTrigger>

              <SelectContent
                side="bottom"
                sideOffset={6}
                position="popper"
                align="start"
                className="w-[300px] max-h-[340px] overflow-hidden p-0"
              >
                {/* Search */}
                <div
                  className="sticky top-0 z-10 border-b border-[#EEEEEE] bg-white p-2"
                  onKeyDown={(e) => e.stopPropagation()}
                  onKeyUp={(e) => e.stopPropagation()}
                  onKeyPress={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <Search
                      size={15}
                      strokeWidth={1.8}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search currency..."
                      autoComplete="off"
                      onKeyDown={(e) => e.stopPropagation()}
                      onKeyUp={(e) => e.stopPropagation()}
                      onKeyPress={(e) => e.stopPropagation()}
                      className="h-9 w-full rounded-md border border-[#E8E8E8] bg-[#F8F8F8] pl-9 pr-9 text-[13px] text-[#111111] outline-none transition-all placeholder:text-[#999999] focus:border-[#D6D6D6] focus:bg-white"
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[#888888] transition-colors hover:bg-[#EEEEEE] hover:text-[#111111]"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Currency list */}
                <div className="max-h-[285px] overflow-y-auto p-1">
                  {filteredCurrencies.length > 0 ? (
                    filteredCurrencies.map((currency) => (
                      <SelectItem
                        key={currency.code}
                        value={currency.code}
                        className="rounded-md px-2.5 py-2.5"
                      >
                        <div className="flex w-full min-w-0 items-center gap-3">
                          {/* Currency name */}
                          <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#111111]">
                            {currency.currency}
                          </span>

                          {/* Currency code */}
                          <span className="shrink-0 text-[11px] font-medium uppercase tracking-wide text-[#8A8A8A]">
                            {currency.code}
                          </span>

                          {/* Currency symbol */}
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#F5F5F5] text-[13px] font-semibold text-[#111111]">
                            {getCurrencySymbol(currency.code)}
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F5F5]">
                        <Search size={16} className="text-[#888888]" />
                      </div>

                      <p className="text-[13px] font-medium text-[#222222]">
                        No currency found
                      </p>

                      <p className="mt-1 text-[12px] text-[#999999]">
                        Try another name or currency code
                      </p>
                    </div>
                  )}
                </div>
              </SelectContent>
            </Select>
          )}

          {/* Amount */}
          {mode !== "currency" && (
            <input
              type="text"
              placeholder="0.00"
              value={
                value
                  ? `${currencySymbol}${" "}${Number(
                      String(value).replace(/,/g, ""),
                    ).toLocaleString("en-NG")}`
                  : ""
              }
              maxLength={13}
              disabled={disabled}
              onChange={(e) => {
                const formatted = formatAmount(e.target.value);

                if (!formatted) {
                  helpers.setValue("");
                  return;
                }

                const numericValue = Number(formatted.replace(/,/g, ""));

                if (max !== undefined && numericValue > max) {
                  return;
                }

                helpers.setValue(formatted);
              }}
              onBlur={() => helpers.setTouched(true)}
              className={`h-[45px] w-full rounded border bg-[#F5F5F5] px-4 text-[14px] text-[#111111] outline-none transition-all duration-200 placeholder:text-[#6B6B6B] disabled:cursor-not-allowed disabled:border-[#E5E5E5] disabled:bg-[#F8F8F8] disabled:text-[#B0B0B0] ${hasError ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-transparent focus:ring-1 focus:ring-[#A7E981]"}`}
            />
          )}
        </div>

        {meta.touched &&
          typeof meta.error === "object" &&
          meta.error !== null && (
            <p className="text-xs text-red-500">
              {(meta.error as { amount?: string }).amount}
            </p>
          )}
      </div>
    </div>
  );
}
