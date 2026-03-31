interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: any;
  onBlur: any;
  error?: string;
  touched?: boolean;
  isTextarea?: boolean;
}

export default function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  isTextarea = false,
}: FormFieldProps) {
  const hasError = error && touched;
  const baseClass = `w-full text-sm flex-1 text-gray-800 placeholder:text-gray-400 bg-gray-100 border rounded-md px-3 focus:outline-none py-2.5 focus:outline-none focus:border-[#1bc8c8] transition-colors ${
    hasError ? "border-red-400" : "border-transparent"
  }`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-800">
        {label}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={3}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={baseClass}
        />
      )}

      {hasError && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
