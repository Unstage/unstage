"use client";

import { useInterviewMutation, useInterviewQuery } from "@hooks/use-interview";
import { useZodForm } from "@hooks/use-zod-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@unstage/ui/components/form";
import { Input } from "@unstage/ui/components/input";
import { SubmitButton } from "@unstage/ui/components/submit-button";
import { useParams } from "next/navigation";
import { z } from "zod";

const candidateSchema = z.object({
  candidateName: z.string(),
  candidateEmail: z.email(),
});

export function CandidateTab() {
  const params = useParams();
  const interviewId = params.interviewId as string;
  const { data: interview } = useInterviewQuery(interviewId);
  const { mutate: updateInterview, isPending: isUpdatingInterview } = useInterviewMutation();

  const form = useZodForm(candidateSchema, {
    defaultValues: {
      candidateName: interview.candidateName || "",
      candidateEmail: interview.candidateEmail || "",
    },
  });

  const onSubmit = (data: z.infer<typeof candidateSchema>) => {
    if (
      data.candidateName === interview.candidateName &&
      data.candidateEmail === interview.candidateEmail
    ) {
      return;
    }

    updateInterview({
      interviewId,
      candidateName: data.candidateName,
      candidateEmail: data.candidateEmail,
    });
  };

  return (
    <div className="border border-border max-w-3xl flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6 p-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Candidate info</h3>
              <p className="text-sm text-muted-foreground">
                Please provide the candidate's full name and email address.
              </p>
            </div>

            <FormField
              control={form.control}
              name="candidateName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter candidate's full name"
                      className="max-w-xs"
                    />
                  </FormControl>
                  <FormDescription>Full name</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="candidateEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter candidate's email address"
                      className="max-w-xs"
                    />
                  </FormControl>
                  <FormDescription>Email address</FormDescription>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full border-t border-border p-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              This user will be automatically added to your candidate list.
            </p>
            <SubmitButton
              type="submit"
              className="w-fit"
              isSubmitting={isUpdatingInterview}
              disabled={interview.status !== "draft"}
            >
              Save
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
