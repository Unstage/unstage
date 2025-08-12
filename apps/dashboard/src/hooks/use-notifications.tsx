"use client";

import { type Notification, Novu } from "@novu/js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUserQuery } from "./use-user";

export function useNotifications() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const novuRef = useRef<Novu | null>(null);
  const { data: user } = useUserQuery();

  const markAsRead = useCallback(async (notificationId: string) => {
    if (!novuRef.current) return;
    await novuRef.current.notifications.read({
      notificationId,
    });
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!novuRef.current) return;
    await novuRef.current.notifications.readAll();
  }, []);

  const markAsSeen = useCallback(async (notificationId: string) => {
    if (!novuRef.current) return;
    await novuRef.current.notifications.seen({
      notificationId,
    });
  }, []);

  const markAllAsSeen = useCallback(async () => {
    if (!novuRef.current) return;
    await novuRef.current.notifications.seenAll();
  }, []);

  useEffect(() => {
    const subscriberId = `${user?.organizationId}_${user?.id}`;
    if (subscriberId && !novuRef.current) {
      novuRef.current = new Novu({
        applicationIdentifier: "6GLwqy2t5xng",
        subscriber: subscriberId,
      });
    }

    const fetchNotifications = async () => {
      if (!novuRef.current) return;
      const { data } = await novuRef.current.notifications.list();
      setNotifications(data?.notifications ?? []);
      setIsLoading(false);
    };

    fetchNotifications();
  }, [user]);

  return {
    isLoading,
    markAsRead,
    markAllAsRead,
    markAsSeen,
    markAllAsSeen,
    hasUnseenNotifications: notifications.some((notification) => !notification.read),
    notifications,
  };
}
