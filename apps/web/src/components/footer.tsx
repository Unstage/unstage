import Link from "next/link";

export function Footer() {
  return (
    <footer className="my-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
