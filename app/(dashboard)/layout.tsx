import AuthHeader from "@/components/AuthHeader";
import DashboardHeader from "@/components/DashboardHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <DashboardHeader />
      <div className="w-full max-w-[1440px] mx-auto px-5">{children}</div>
    </div>
  );
}
