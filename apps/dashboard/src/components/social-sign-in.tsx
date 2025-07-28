import { Button } from "@unstage/ui/components/button";
import { Icons } from "@unstage/ui/components/icons";

export default function SocialSignIn() {
  return (
    <>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">Or</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Button variant="outline" type="button" className="w-full">
          <Icons.Apple />
          Continue with Apple
        </Button>
        <Button variant="outline" type="button" className="w-full">
          <Icons.Google />
          Continue with Google
        </Button>
      </div>
    </>
  );
}
