import Link from "next/link";
import SetupShopForm from "../_component/setup-shop/SetupShopForm";
import ShopBadge from "../_component/setup-shop/ShopBadge";
import StepIndicator from "../_component/setup-shop/StepIndicator";

export default function SetupShopPage() {
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
      <main className="flex justify-center items-center min-h-screen">
        <div className="max-w-lg w-full flex flex-col gap-5 items-center">
          <ShopBadge />

          <h1 className="text-3xl font-bold text-center">Set Up Your Shop</h1>

          <StepIndicator currentStep={1} />

          <SetupShopForm />
        </div>
      </main>
    </div>
  );
}
