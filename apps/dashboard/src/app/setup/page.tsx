import { Setup } from "@components/setup";
import { getQueryClient, HydrateClient, trpc } from "@src/trpc/server";
import { Icons } from "@unstage/ui/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Setup",
};

export const dynamic = "force-dynamic";

export default async function SetupPage() {
  const queryClient = getQueryClient();

  const user = await queryClient.fetchQuery(trpc.user.me.queryOptions());

  if (!user) redirect("/sign-in");

  return (
    <div>
      <div className="absolute left-5 top-4 md:left-10 md:top-10">
        <Link href="/">
          <Icons.LogoMark className="size-6 md:size-8" />
        </Link>
      </div>

      <main className="flex min-h-screen justify-center md:items-center overflow-hidden p-6 md:p-0 pt-24 md:pt-0">
        <HydrateClient>
          <Setup />
        </HydrateClient>
      </main>
    </div>
  );
}
