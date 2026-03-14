import AuthHeader from "@/components/AuthHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AuthHeader />
      {children}
    </div>
  );
}
