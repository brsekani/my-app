export default function ProductDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-5 w-24 rounded bg-gray-200" />

      <div className="border-t border-[#E5E5E5]" />

      <div className="grid md:grid-cols-[26%_74%] gap-6">
        {/* LEFT */}
        <div className="space-y-3">
          <div className="h-[370px] rounded-lg bg-gray-200" />

          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square w-full rounded-lg bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="flex justify-end gap-4">
            <div className="h-10 w-28 rounded-full bg-gray-200" />
            <div className="h-10 w-36 rounded-full bg-gray-200" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="h-32 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
