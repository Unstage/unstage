"use client";

import { useTRPC } from "@src/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

export function useInterviewQuery(interviewId: string) {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.interview.getById.queryOptions({ interviewId }));
}

export function useInterviewMutation() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.interview.update.mutationOptions({
      onMutate: async (variables) => {
        const { interviewId, ...newData } = variables;
        
        // Cancel outgoing refetches
        await queryClient.cancelQueries({
          queryKey: trpc.interview.getById.queryKey({ interviewId }),
        });

        // Get current data
        const previousData = queryClient.getQueryData(
          trpc.interview.getById.queryKey({ interviewId })
        );

        // Optimistically update
        queryClient.setQueryData(
          trpc.interview.getById.queryKey({ interviewId }),
          (old: any) => ({
            ...old,
            ...newData,
          })
        );

        return { previousData, interviewId };
      },
      onError: (_, variables, context) => {
        // Rollback on error
        if (context?.previousData && context.interviewId) {
          queryClient.setQueryData(
            trpc.interview.getById.queryKey({ interviewId: context.interviewId }),
            context.previousData
          );
        }
      },
      onSettled: (_, __, variables) => {
        // Refetch after error or success
        queryClient.invalidateQueries({
          queryKey: trpc.interview.getById.queryKey({ interviewId: variables.interviewId }),
        });
      },
    })
  );
}