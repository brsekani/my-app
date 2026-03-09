"use client";

interface ConfirmModalProps {
  phoneNumber: string;
  onEdit: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  phoneNumber,
  onEdit,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative">
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
          Confirm Your WhatsApp Number
        </h2>

        <div className="flex flex-col items-center gap-1 mb-6">
          <p className="text-sm text-gray-500">
            Are you sure this is your WhatsApp number?
          </p>
          <p className="text-base font-bold text-gray-900">{phoneNumber}</p>
          <p className="text-xs text-gray-400 text-center">
            Customers will contact you on this number from your store.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onEdit}
            className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] border border-[#5fc23e] text-sm font-bold text-white transition-colors"
          >
            Yes, this is correct
          </button>
        </div>
      </div>
    </div>
  );
}
