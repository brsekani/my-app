import React from "react";

export default function StoreSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header>
        <div className="mx-auto w-full max-w-360">
          <section className="space-y-4 px-5 py-6">
            <div className="space-y-3">
              {/* Store name */}
              <div className="h-4 w-32 animate-pulse rounded bg-[#E8E8E8]" />

              {/* Store description */}
              <div className="space-y-2">
                <div className="h-3 w-full max-w-md animate-pulse rounded bg-[#F0F0F0]" />
                <div className="h-3 w-3/4 max-w-sm animate-pulse rounded bg-[#F0F0F0]" />
              </div>
            </div>
          </section>
        </div>

        <div className="h-px bg-[#E5E5E5]" />
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-360">
        <section className="space-y-7 px-5 py-7">
          {/* Search skeleton */}
          <div className="h-9 w-full animate-pulse rounded-[4px] bg-[#F5F5F5]" />

          {/* Products heading */}
          <div className="h-4 w-20 animate-pulse rounded bg-[#E8E8E8]" />

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="min-w-0">
                {/* Image */}
                <div className="aspect-square w-full animate-pulse overflow-hidden rounded-lg bg-[#F0F0F0]" />

                {/* Product info */}
                <div className="space-y-2 pt-3">
                  <div className="h-3.5 w-4/5 animate-pulse rounded bg-[#EAEAEA]" />

                  <div className="h-3 w-2/5 animate-pulse rounded bg-[#F0F0F0]" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5]">
        <div className="mx-auto flex w-full max-w-360 items-center justify-between px-5 py-6">
          <div className="h-3 w-32 animate-pulse rounded bg-[#EEEEEE]" />

          <div className="h-3 w-36 animate-pulse rounded bg-[#EEEEEE]" />
        </div>
      </footer>
    </div>
  );
}
