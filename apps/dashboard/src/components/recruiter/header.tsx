// import { ConnectionStatus } from "@/components/connection-status";

// import { MobileMenu } from "./mobile-menu";
import { NotificationCenter } from "@components/notification-center";
import { OpenSearchButton } from "@components/search/open-search-button";
import { Trial } from "@components/trial";
import { UserMenu } from "@components/user-menu";

export function Header() {
  return (
    <header className="md:m-0 z-50 px-6 md:border-b border-border h-[70px] flex justify-between items-center desktop:sticky desktop:top-0 desktop:bg-background sticky md:static top-0 backdrop-filter backdrop-blur-xl md:backdrop-filter md:backdrop-blur-none desktop:rounded-t-[10px]">
      {/* <MobileMenu /> */}

      <OpenSearchButton />

      <div className="flex space-x-2 ml-auto">
        <Trial />
        {/*<ConnectionStatus /> */}
        <NotificationCenter />
        <UserMenu />
      </div>
    </header>
  );
}
