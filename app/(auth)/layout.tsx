import AuthHeader from "@/components/AuthHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <AuthHeader />
      {children}
    </div>
  );
}
