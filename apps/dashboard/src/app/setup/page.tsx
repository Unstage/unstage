import SetupForm from "@components/forms/setup-form";
import { Icons } from "@unstage/ui/components/icons";
import Link from "next/link";

export default function SetupPage() {
  return (
    <div>
      <div className="absolute left-5 top-4 md:left-10 md:top-10">
        <Link href="/">
          <Icons.LogoMark className="size-8" />
        </Link>
      </div>

      <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col">
          <div className="text-center">
            <h1 className="text-2xl mb-2 font-display font-semibold">Update your account</h1>
            <p className="text-[#878787] text-sm mb-8">Add your name and an optional avatar.</p>
          </div>

          <SetupForm />
        </div>
      </div>
    </div>
  );
}
