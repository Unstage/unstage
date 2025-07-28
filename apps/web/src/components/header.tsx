import { Button } from "@unstage/ui/components/button";
import { Icons } from "@unstage/ui/components/icons";

import Link from "next/link";

const links = [
  {
    title: "Features",
    path: "/features",
    // cover: (
    //   <Link href="/#assistant" onClick={handleOnClick}>
    //     <DynamicImage alt="Assistant" darkSrc={menuAssistantDark} lightSrc={menuAssistantLight} />
    //   </Link>
    // ),
    // children: [
    //   {
    //     path: "/overview",
    //     title: "Overview",
    //     icon: <Icons.Overview size={20} />,
    //   },
    //   {
    //     path: "/inbox",
    //     title: "Inbox",
    //     icon: <Icons.Inbox2 size={20} />,
    //   },
    //   {
    //     path: "/vault",
    //     title: "Vault",
    //     icon: <Icons.Files size={20} />,
    //   },
    //   {
    //     path: "/tracker",
    //     title: "Tracker",
    //     icon: <Icons.Tracker size={20} />,
    //   },
    //   {
    //     path: "/invoice",
    //     title: "Invoice",
    //     icon: <Icons.Invoice size={20} />,
    //   },
    // ],
  },
  {
    title: "Pricing",
    path: "/pricing",
  },
  {
    title: "Updates",
    path: "/updates",
  },
  {
    title: "Team",
    path: "/team",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  //   {
  //     title: "Developers",
  //     cover: (
  //       <Link href="/engine" onClick={handleOnClick}>
  //         <DynamicImage alt="Engine" darkSrc={menuEngineDark} lightSrc={menuEngineLight} />
  //       </Link>
  //     ),
  //     children: [
  //       {
  //         path: "https://docs.midday.ai",
  //         title: "Documentation",
  //         icon: <MdOutlineDescription size={20} />,
  //       },
  //       {
  //         path: "/engine",
  //         title: "Engine",
  //         icon: <MdOutlineMemory size={20} />,
  //       },
  //       {
  //         title: "Join the community",
  //         path: "https://go.midday.ai/anPiuRx",
  //         icon: <FaDiscord size={19} />,
  //       },
  //       {
  //         title: "Apps & Integrations",
  //         path: "https://docs.midday.ai/integrations",
  //         icon: <MdOutlineIntegrationInstructions size={20} />,
  //       },
  //       {
  //         path: "/components",
  //         title: "Components",
  //         icon: <MdOutlineDashboardCustomize size={20} />,
  //       },
  //     ],
  //   },
];

export function Header() {
  return (
    <header className="sticky mt-4 md:mt-6 md:top-6 z-50 px-4 container mx-auto">
      <div className="relative flex justify-between items-center">
        <Link href="/">
          <Icons.Logo className="w-32 md:w-36 h-auto" />
        </Link>

        <nav className="absolute left-1/2 transform -translate-x-1/2 border border-border px-4 md:flex hidden items-center backdrop-filter backdrop-blur-xl dark:bg-card/50 h-[48px] z-20">
          <ul className="space-x-2 text-sm hidden md:flex mx-3">
            {links.map((link) => (
              <Link
                href={link.path}
                key={link.title}
                className="h-8 items-center justify-center text-sm font-medium px-3 py-2 inline-flex text-secondary-foreground transition-opacity hover:opacity-70 duration-200"
              >
                {link.title}
              </Link>
            ))}
          </ul>
        </nav>

        <Button className="hidden md:block">Book a demo</Button>
        <Button className="md:hidden" variant="outline" size="icon">
          <Icons.Menu className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
