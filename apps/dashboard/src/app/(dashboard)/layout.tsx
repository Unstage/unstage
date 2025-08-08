import Header from "@components/header";
import { Sidebar } from "@components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Sidebar />
      <div className="md:ml-[70px] pb-8">
        <Header />
        <div className="px-6">{children}</div>
      </div>
    </div>
  );
}
