import { SelectRoleForm } from "@components/forms/select-role-form";
import { SetupForm } from "@components/forms/setup-form";
import { getQueryClient, trpc } from "@src/trpc/server";
import { Icons } from "@unstage/ui/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Setup | Unstage",
};

export default async function SetupPage() {
  const queryClient = getQueryClient();

  const user = await queryClient.fetchQuery(trpc.user.me.queryOptions());

  if (!user) redirect("/sign-in");

  return (
    <div>
      <div className="absolute left-5 top-4 md:left-10 md:top-10">
        <Link href="/">
          <Icons.LogoMark className="size-8" />
        </Link>
      </div>

      <main className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        {!user?.role ? <SelectRoleForm /> : <SetupForm />}
        {/* <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col bg-red-500">
          <div className="text-center">
            <h1 className="text-2xl mb-2 font-display font-semibold">Update your account</h1>
            <p className="text-[#878787] text-sm mb-8">Add your name and an optional avatar.</p>
          </div>

          <SetupForm />
        </div> */}
      </main>
    </div>
  );
}
