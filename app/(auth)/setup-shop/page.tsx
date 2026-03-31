import Link from "next/link";
import SetupShopForm from "../../../components/setup-shop/SetupShopForm";
import ShopBadge from "../../../components/setup-shop/ShopBadge";
import StepIndicator from "../../../components/setup-shop/StepIndicator";

export default function SetupShopPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex justify-center items-center min-h-screen px-4 py-8">
        <div className="max-w-sm w-full flex flex-col gap-5 items-center">
          <ShopBadge />

          <h1 className=" font-bold text-center text-2xl sm:text-3xl">
            Set Up Your Shop
          </h1>

          <StepIndicator currentStep={1} />

          <SetupShopForm />
        </div>
      </main>
    </div>
  );
}
