export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto px-4 overflow-hidden md:overflow-visible">{children}</main>
  );
}
