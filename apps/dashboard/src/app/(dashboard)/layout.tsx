import { Header } from "@components/recruiter/header";
import { Sidebar } from "@components/recruiter/sidebar";
import { getQueryClient, HydrateClient, trpc } from "../../trpc/server";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const user = await queryClient.fetchQuery(trpc.user.me.queryOptions());

  console.log("User from server:", user);

  return (
    <HydrateClient>
      <div className="relative">
        <Sidebar />
        <div className="md:ml-[70px] pb-8">
          <Header />
          <div className="px-6">{children}</div>
        </div>
      </div>
    </HydrateClient>
  );
}
