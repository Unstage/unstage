"use client";

import { useUserMutation } from "@hooks/use-user";
import { useZodForm } from "@hooks/use-zod-form";
import { useTRPC } from "@src/trpc/client";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@unstage/ui/components/form";
import { Input } from "@unstage/ui/components/input";
import { SubmitButton } from "@unstage/ui/components/submit-button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const setupSchema = z.object({
  name: z.string().min(2).max(48),
});

export function SetupForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const trpc = useTRPC();
  const { data: user } = useSuspenseQuery(trpc.user.me.queryOptions());

  const updateUserMutation = useUserMutation();

  const onSubmit = (data: z.infer<typeof setupSchema>) => {
    updateUserMutation.mutate(
      {
        ...data,
        isOnboarded: true,
      },
      {
        onSuccess: async () => {
          setIsRedirecting(true);
          await queryClient.invalidateQueries();
          router.push(user?.role === "recruiter" ? "/teams/create" : "/");
        },
        onError: () => {
          setIsRedirecting(false);
        },
      }
    );
  };

  const form = useZodForm(setupSchema, {
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-[400px]">
        <div className="flex justify-between items-end gap-4">
          {/* <AvatarUpload
            userId={user?.id ?? ""}
            avatarUrl={user?.avatarUrl}
            size={80}
            ref={uploadRef}
          /> */}
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl font-display">Update your account</FormLabel>
              <FormDescription className="text-muted-foreground mb-6">
                Add your name and an optional avatar.
              </FormDescription>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your first and last name.</FormDescription>
            </FormItem>
          )}
        />
        <SubmitButton
          type="submit"
          className="w-full"
          isSubmitting={updateUserMutation.isPending || isRedirecting}
        >
          Save
        </SubmitButton>
      </form>
    </Form>
  );
}
