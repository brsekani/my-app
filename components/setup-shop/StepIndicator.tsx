import dotInCircle from "@/assets/svgs/dot-in-circle.svg";
import Image from "next/image";

export default function StepIndicator({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <>
      <div className="flex items-center gap-2  justify-center leading-[100%]">
        {[1, 2].map((step) => (
          <div key={step} className="flex items-center gap-2  ">
            <div
              className={`flex items-center gap-1.5 pr-3.5 pl-2 py-1.5 rounded-full border text-[14px] transition-colors ${
                step === currentStep
                  ? "border-[#111111] text-[#111111]"
                  : "border-[#E5E5E5] text-[#777777]"
              }`}
            >
              <Image src={dotInCircle} alt="dot" />
              Step {step}
            </div>
            {step < 2 && <div className="w-6 h-px bg-gray-300 " />}
          </div>
        ))}
      </div>
      <div className="w-full border-b border-gray-300 mt-4"></div>
    </>
  );
}
