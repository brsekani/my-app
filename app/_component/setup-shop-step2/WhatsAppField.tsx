interface WhatsAppFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

export default function WhatsAppField({
  value,
  onChange,
  onBlur,
  error,
  touched,
}: WhatsAppFieldProps) {
  const hasError = error && touched;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="whatsapp" className="text-sm font-medium text-gray-800">
        WhatsApp Number
      </label>

      <div
        className={`flex items-center bg-gray-100 border rounded-md overflow-hidden transition-colors focus-within:border-[#1bc8c8] ${
          hasError ? "border-red-400" : "border-transparent"
        }`}
      >
        <div className="flex items-center gap-1 px-3 py-2.5 border-r border-gray-300 shrink-0">
          <span className="text-sm text-gray-700 font-medium">+234</span>
        </div>

        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter your WhatsApp number"
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 px-3 py-2.5 focus:outline-none"
        />
      </div>

      {hasError && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
