import { Button } from "@unstage/ui/components/button";
import { Icons } from "@unstage/ui/components/icons";
import Link from "next/link";

interface HeaderProps {
  logoOnly?: boolean;
}

export default function Header({ logoOnly = false }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mt-4 px-8 w-full">
      <Link href="/">
        <Icons.LogoMark className="size-8" />
      </Link>
      {!logoOnly && (
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Icons.LifeBuoy className="size-4 text-muted-foreground" />A button
          </Button>
        </div>
      )}
    </header>
  );
}
