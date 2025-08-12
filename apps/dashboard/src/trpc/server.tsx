import "server-only";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createTRPCClient, loggerLink } from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { createTRPCOptionsProxy, type TRPCQueryOptions } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@unstage/api/routers";
import { getCountryCode, getLocale, getTimezone } from "@unstage/location";
import { cookies } from "next/headers";
import { cache } from "react";
import superjson from "superjson";
import { makeQueryClient } from "./query-client";

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy<AppRouter>({
  queryClient: getQueryClient,
  client: createTRPCClient({
    links: [
      httpBatchLink({
        url: `${process.env.NEXT_PUBLIC_API_URL}/trpc`,
        transformer: superjson,
        fetch: async (url, options) => {
          return fetch(url, {
            ...options,
            credentials: "include",
          });
        },
        async headers() {
          return {
            cookie: (await cookies()).toString(),
            "x-user-timezone": await getTimezone(),
            "x-user-locale": await getLocale(),
            "x-user-country": await getCountryCode(),
            "x-trpc-source": "rsc",
          };
        },
      }),
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === "development" ||
          (opts.direction === "down" && opts.result instanceof Error),
      }),
    ],
  }),
});

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return <HydrationBoundary state={dehydrate(queryClient)}>{props.children}</HydrationBoundary>;
}

// biome-ignore lint/suspicious/noExplicitAny: <trpc doc snippet>
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(queryOptions: T) {
  const queryClient = getQueryClient();

  if (queryOptions.queryKey[1]?.type === "infinite") {
    // biome-ignore lint/suspicious/noExplicitAny: <trpc doc snippet>
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}

// biome-ignore lint/suspicious/noExplicitAny: <trpc doc snippet>
export function batchPrefetch<T extends ReturnType<TRPCQueryOptions<any>>>(queryOptionsArray: T[]) {
  const queryClient = getQueryClient();

  for (const queryOptions of queryOptionsArray) {
    if (queryOptions.queryKey[1]?.type === "infinite") {
      // biome-ignore lint/suspicious/noExplicitAny: <trpc doc snippet>
      void queryClient.prefetchInfiniteQuery(queryOptions as any);
    } else {
      void queryClient.prefetchQuery(queryOptions);
    }
  }
}
