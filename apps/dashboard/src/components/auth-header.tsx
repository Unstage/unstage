import { Button } from "@unstage/ui/components/button";
import { Icons } from "@unstage/ui/components/icons";

export default function AuthHeader() {
  return (
    <header className="flex justify-between items-center mt-4 px-8 w-full">
      <Icons.LogoMark className="size-8" />
      <Button variant="outline">
        <Icons.LifeBuoy className="size-4 text-muted-foreground" />
        Support
      </Button>
    </header>
  );
}
