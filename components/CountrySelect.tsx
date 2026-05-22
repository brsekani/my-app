"use client";

import { useEffect, useRef, useState } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";

import directionDown from "@/assets/svgs/direction-down.svg";
import Image from "next/image";

function getFlag(country: string) {
  return country
    ?.toUpperCase()
    ?.replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0)),
    );
}

export default function CountrySelect({ value, onChange, labels }: any) {
  //   const allowedCountries = ["US", "CA"];

  const countries = getCountries();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // ✅ CLICK OUTSIDE
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filtered = countries.filter((c) =>
    (labels?.[c] || c).toLowerCase().includes(query.toLowerCase()),
  );

  //   const filtered = countries
  //     .filter((c) => allowedCountries.includes(c))
  //     .filter((c) =>
  //       (labels?.[c] || c).toLowerCase().includes(query.toLowerCase()),
  //     );
  return (
    <div
      ref={ref}
      className=" bg-[#F5F5F5] h-full px-3 py-[10px] rounded border border-[#F5F5F5] text-[14px] leading-[100%]"
    >
      {/* Selected */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1"
      >
        {/* <span className="text-lg">{getFlag(value)}</span> */}
        <span className="">+{getCountryCallingCode(value)}</span>
        <Image
          src={directionDown}
          alt="open"
          width={24}
          height={24}
          className="pointer-events-none shrink-0"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full left-0 max-h-60 overflow-y-auto rounded-2xl bg-[#FFFFFF] text-[#0C0A09]shadow-xl p-2 space-y-1">
          {/* Search */}
          <input
            placeholder="Search country..."
            className="w-full px-3 py-2 mb-2 rounded-lg bg-transparent border border-[#D6D3D1] outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {filtered.map((country) => (
            <div
              key={country}
              onClick={() => {
                onChange(country);
                setOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-fit h-fit rounded-full flex items-center justify-center overflow-hidden text-[24px]">
                  {getFlag(country)}
                </div>
                <span className="line-clamp-1">
                  {labels?.[country] || country}
                </span>
              </div>

              <span className="">+{getCountryCallingCode(country)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
