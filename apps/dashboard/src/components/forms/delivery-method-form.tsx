"use client";

import { useInterviewMutation, useInterviewQuery } from "@hooks/use-interview";
import { useZodForm } from "@hooks/use-zod-form";
import { Form, FormControl, FormField, FormItem } from "@unstage/ui/components/form";
import { Label } from "@unstage/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@unstage/ui/components/radio-group";
import { SubmitButton } from "@unstage/ui/components/submit-button";
import { useParams } from "next/navigation";
import { z } from "zod";

const deliveryMethodSchema = z.object({
  mode: z.enum(["async", "live"]),
});

export function DeliveryMethodForm() {
  const params = useParams();
  const interviewId = params.interviewId as string;
  const { data: interview } = useInterviewQuery(interviewId);
  const { mutate: updateInterview, isPending: isUpdatingInterview } = useInterviewMutation();

  const form = useZodForm(deliveryMethodSchema, {
    defaultValues: {
      mode: interview.mode || "async",
    },
  });

  const onSubmit = (data: z.infer<typeof deliveryMethodSchema>) => {
    if (data.mode === interview.mode) return;

    updateInterview({
      interviewId,
      mode: data.mode,
    });
  };

  return (
    <div className="border border-border max-w-3xl flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6 p-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Delivery method</h3>
              <p className="text-sm text-muted-foreground">
                Choose how you want to conduct this interview.
              </p>
            </div>

            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-3"
                    >
                      <div className="flex space-x-2">
                        <RadioGroupItem value="async" id="async" />
                        <Label htmlFor="async" className="font-normal cursor-pointer">
                          <div className="flex flex-col gap-1">
                            <div className="font-medium">Asynchronous</div>
                            <div className="text-sm text-muted-foreground">
                              Candidate completes the interview on their own time.
                            </div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex space-x-2">
                        <RadioGroupItem value="live" id="live" />
                        <Label htmlFor="live" className="font-normal cursor-pointer">
                          <div className="flex flex-col gap-1">
                            <div className="font-medium">Live</div>
                            <div className="text-sm text-muted-foreground">
                              Schedule a specific time for the interview.
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full border-t border-border p-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              You can change these settings anytime before publishing.
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
