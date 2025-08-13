"use client";

import { useZodForm } from "@hooks/use-zod-form";
import { useTRPC } from "@src/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { z } from "zod";

const createTeamSchema = z.object({
  name: z.string().min(2).max(48),
});

export function CreateTeamForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const trpc = useTRPC();

  const createTeamMutation = useMutation(
    trpc.organization.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries();
        router.push(`/`);
      },
    })
  );

  const onSubmit = (data: z.infer<typeof createTeamSchema>) => {
    createTeamMutation.mutate({
      name: data.name,
    });
  };

  const form = useZodForm(createTeamSchema, {
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-[400px]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl font-display">Create your team</FormLabel>
              <FormDescription className="text-muted-foreground mb-6">
                This will be the name of your Unstage workspace – choose something your team will
                recognize.
              </FormDescription>
              <FormLabel>Team name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <SubmitButton type="submit" className="w-full" isSubmitting={createTeamMutation.isPending}>
          Create
        </SubmitButton>
      </form>
    </Form>
  );
}
