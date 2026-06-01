"use client";

import { formatPhoneNumberIntl } from "react-phone-number-input";

interface ConfrimPhoneNumberChangeProps {
  phoneNumber: string;
  onEdit: () => void;
  onConfirm: () => void;
}

export default function ConfrimPhoneNumberChange({
  phoneNumber,
  onEdit,
  onConfirm,
}: ConfrimPhoneNumberChangeProps) {
  console.log(phoneNumber);

  return (
    <div className="bg-[#FFFFFF] rounded w-full p-6 leading-[100%] space-y-6">
      <div className="h-10 flex items-start justify-between border-b border-[#E5E5E5]">
        <h2 className="text-[18px] font-semibold text-gray-900 uppercase tracking-wide">
          Confirm Your WhatsApp Number
        </h2>

        <button
          onClick={onEdit}
          className="text-[#111111] transition-colors w-[24px] h-[24px] cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 text-[16px]">
        <p className="text-[#111111]">
          Are you sure this is your WhatsApp number?
        </p>
        <p className="font-semibold text-[#111111]">
          {formatPhoneNumberIntl(phoneNumber)}
        </p>
        <p className="text-[#777777] text-center">
          Customers will contact you on this number from your store.
        </p>
      </div>

      <div className="flex gap-3 justify-center text-[14px] font-semibold text-[#111111]">
        <button
          onClick={onEdit}
          className="px-[40.5px] py-2.5 rounded-full border border-[#111111] hover:bg-gray-50 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onConfirm}
          className="px-4.5 py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] border border-[#5fc23e] transition-colors"
        >
          Yes, this is correct
        </button>
      </div>
    </div>
  );
}
