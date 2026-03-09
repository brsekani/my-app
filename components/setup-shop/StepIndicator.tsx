export default function StepIndicator({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <>
      <div className="flex items-center gap-2  justify-center ">
        {[1, 2].map((step) => (
          <div key={step} className="flex items-center gap-2  ">
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                step === currentStep
                  ? "border-gray-400 text-gray-700 bg-white"
                  : "border-gray-300 text-gray-400 bg-white"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  step === currentStep ? "bg-gray-500" : "bg-gray-300"
                }`}
              />
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
