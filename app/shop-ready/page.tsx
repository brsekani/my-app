// app/shop-ready/page.tsx
import Link from "next/link";

export default function ShopReadyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4">
        <Link
          href="/"
          className="inline-block bg-[#1a3a4a] text-white text-xs font-semibold px-4 py-2 rounded-full"
        >
          LOGO
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-5">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
            <img
              src="/remark.png"
              alt="Shop Ready Icon"
              width={40}
              height={40}
            />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase text-center">
            Your Shop Is Ready
          </h1>

          <p className="text-sm text-gray-500 text-center max-w-xs">
            Now let&apos;s add your first product so customers can start
            ordering.
          </p>

          <hr className="w-full max-w-sm border-gray-200" />

          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Go To Dashboard
            </Link>
            <Link
              href="/dashboard/add-product"
              className="px-6 py-2.5 rounded-full bg-[#7ed957] hover:bg-[#5fc23e] border border-[#5fc23e] text-sm font-bold text-white transition-colors"
            >
              Add Product
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
