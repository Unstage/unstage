import { AuthHeader } from "@components/auth-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col h-screen w-screen items-center">
      <AuthHeader />
      <div className="flex flex-col max-w-md h-full justify-center">{children}</div>
    </main>
  );
}
