import { GlobalOverlays } from "@components/overlays/global-overlays";
import { Header } from "@components/recruiter/header";
import { Sidebar } from "@components/recruiter/sidebar";
import { getQueryClient, HydrateClient, trpc } from "@src/trpc/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const user = await queryClient.fetchQuery(trpc.user.me.queryOptions());

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <HydrateClient>
      <div className="relative">
        <Sidebar />
        <div className="md:ml-[70px] pb-8">
          <Header />
          <div className="px-6">{children}</div>
        </div>

        <GlobalOverlays />
      </div>
    </HydrateClient>
  );
}
