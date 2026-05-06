import SetupShopForm from "../../../components/setup-shop/SetupShopForm";
import ShopBadge from "../../../components/setup-shop/ShopBadge";
import StepIndicator from "../../../components/setup-shop/StepIndicator";

export default function SetupShopPage() {
  return (
    <main className="min-h-[90vh] bg-white flex flex-col items-center justify-center px-4 leading-[100%]">
      <div className="max-w-[640px] w-full flex flex-col gap-6 items-center">
        <ShopBadge />

        <h1 className=" font-semibold text-center text-2xl sm:text-[32px] text-[#111111]">
          Set Up Your Shop
        </h1>

        <p className="text-[16px] text-[#777777]">
          Add details customers need to trust your shop.
        </p>

        <StepIndicator currentStep={1} />

        <SetupShopForm />
      </div>
    </main>
  );
}
