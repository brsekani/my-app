import CustomPhoneInput from "../CustomPhoneInput";

export default function WhatsAppField() {
  return (
    <div className="flex flex-col gap-1 leading-[100%]">
      <label htmlFor="whatsapp" className="text-[14px] text-[#111111]">
        WhatsApp Number
      </label>

      <CustomPhoneInput name="whatsapp" />

      {/* ❌ remove manual error props — handled inside CustomPhoneInput */}
    </div>
  );
}
