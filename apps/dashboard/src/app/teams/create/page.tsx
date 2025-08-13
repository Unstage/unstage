import { CreateTeamForm } from "@components/forms/create-team-form";
import { Icons } from "@unstage/ui/components/icons";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create team",
};

export default function CreateTeamPage() {
  return (
    <div>
      <div className="absolute left-5 top-4 md:left-10 md:top-10">
        <Link href="/">
          <Icons.LogoMark className="size-6 md:size-8" />
        </Link>
      </div>

      <main className="flex min-h-screen justify-center md:items-center overflow-hidden p-6 md:p-0 pt-24 md:pt-0">
        <CreateTeamForm />
      </main>
    </div>
  );
}
