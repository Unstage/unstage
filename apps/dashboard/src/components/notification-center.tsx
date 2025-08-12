"use client";

import { useNotifications } from "@hooks/use-notifications";
import { Button } from "@unstage/ui/components/button";
// import { EmptyState } from "@unstage/ui/components/empty-state";
import { Icons } from "@unstage/ui/components/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@unstage/ui/components/popover";
import { ScrollArea } from "@unstage/ui/components/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@unstage/ui/components/tabs";
import Link from "next/link";
import { useEffect, useState } from "react";

function EmptyState({ description }: { description: string }) {
  return (
    <div className="h-[460px] flex items-center justify-center flex-col space-y-4">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <Icons.Inbox />
      </div>
      <p className="text-[#606060] text-sm">{description}</p>
    </div>
  );
}

export function NotificationCenter() {
  const [isOpen, setOpen] = useState(false);
  const { hasUnseenNotifications, notifications, markAsRead, markAllAsSeen, markAllAsRead } =
    useNotifications();

  console.log(notifications);
  const unreadNotifications = notifications.filter((notification) => !notification.read);

  const archivedNotifications = notifications.filter((notification) => notification.read);

  console.log("unreadNotifications", unreadNotifications);
  console.log("archivedNotifications", archivedNotifications);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Hook function
  useEffect(() => {
    if (isOpen && hasUnseenNotifications) {
      markAllAsSeen();
    }
  }, [hasUnseenNotifications, isOpen]);

  return (
    <Popover onOpenChange={setOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-8 h-8 flex items-center relative"
        >
          {hasUnseenNotifications && (
            <div className="w-1.5 h-1.5 bg-[#FFD02B] rounded-full absolute top-0 right-0" />
          )}
          <Icons.Notifications size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="h-[535px] w-screen md:w-[400px] p-0 overflow-hidden relative"
        align="end"
        sideOffset={10}
      >
        <Tabs defaultValue="inbox">
          <TabsList className="w-full justify-start bg-transparent border-b-[1px] rounded-none py-6">
            <TabsTrigger value="inbox" className="font-normal">
              Inbox
            </TabsTrigger>
            <TabsTrigger value="archive" className="font-normal">
              Archive
            </TabsTrigger>
          </TabsList>

          <Link href="/settings/notifications" className="absolute right-[11px] top-1.5">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-ransparent hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              <Icons.Settings className="text-[#606060]" size={16} />
            </Button>
          </Link>

          <TabsContent value="inbox" className="relative mt-0">
            {!unreadNotifications.length && <EmptyState description="No new notifications" />}

            {unreadNotifications.length > 0 && (
              <ScrollArea className="pb-12 h-[485px]">
                <div className="divide-y">
                  {unreadNotifications.map((notification) => {
                    return "Hello";
                    //   <NotificationItem
                    //     key={notification.id}
                    //     id={notification.id}
                    //     markMessageAsRead={markAsRead}
                    //     setOpen={setOpen}
                    //     description={notification.payload.description}
                    //     createdAt={notification.createdAt}
                    //     recordId={notification.payload.recordId}
                    //     type={notification.payload.type}
                    //     from={notification.payload?.from}
                    //     to={notification.payload?.to}
                    //   />
                  })}
                </div>
              </ScrollArea>
            )}

            {unreadNotifications.length > 0 && (
              <div className="h-12 w-full absolute bottom-0 flex items-center justify-center border-t-[1px]">
                <Button variant="secondary" className="bg-transparent" onClick={markAllAsRead}>
                  Archive all
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="archive" className="mt-0">
            {!archivedNotifications.length && (
              <EmptyState description="No archived notifications" />
            )}

            {archivedNotifications.length > 0 && (
              <ScrollArea className="h-[490px]">
                <div className="divide-y">
                  {archivedNotifications.map((notification) => {
                    return "Hi";
                    //   <NotificationItem
                    //     key={notification.id}
                    //     id={notification.id}
                    //     setOpen={setOpen}
                    //     description={notification.payload.description}
                    //     createdAt={notification.createdAt}
                    //     recordId={notification.payload.recordId}
                    //     type={notification.payload.type}
                    //     from={notification.payload?.from}
                    //     to={notification.payload?.to}
                    //   />
                  })}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
