"use client";

import { useInterviewMutation, useInterviewQuery } from "@hooks/use-interview";
import { useZodForm } from "@hooks/use-zod-form";
import { Button } from "@unstage/ui/components/button";
import { Calendar } from "@unstage/ui/components/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@unstage/ui/components/form";
import { Input } from "@unstage/ui/components/input";
import { Popover, PopoverContent, PopoverTrigger } from "@unstage/ui/components/popover";
import { SubmitButton } from "@unstage/ui/components/submit-button";
import { cn } from "@unstage/ui/lib/utils";
import { combineDateAndTime } from "@utils/time";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { z } from "zod";

const deadlineSchema = z.object({
  deadlineDate: z.date(),
  deadlineTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Please enter a valid time"),
});

export function DeadlineForm() {
  const params = useParams();
  const interviewId = params.interviewId as string;
  const { data: interview } = useInterviewQuery(interviewId);
  const { mutate: updateInterview, isPending: isUpdatingInterview } = useInterviewMutation();

  const getDefaultValues = () => {
    if (interview.asyncInterviewDeadlineAt) {
      const deadline = new Date(interview.asyncInterviewDeadlineAt);
      return {
        deadlineDate: deadline,
        deadlineTime: deadline.toTimeString().slice(0, 5), // HH:MM format
      };
    }
    return {
      deadlineDate: undefined,
      deadlineTime: "17:00", // Default to 5 PM
    };
  };

  const form = useZodForm(deadlineSchema, {
    defaultValues: getDefaultValues(),
  });

  const onSubmit = (data: z.infer<typeof deadlineSchema>) => {
    const newDeadline = combineDateAndTime(data.deadlineDate, data.deadlineTime);

    const currentDeadline = interview.asyncInterviewDeadlineAt
      ? new Date(interview.asyncInterviewDeadlineAt).getTime()
      : null;

    if (currentDeadline === newDeadline.getTime()) return;

    updateInterview({
      interviewId,
      asyncInterviewDeadlineAt: newDeadline,
    });
  };

  return (
    <div className="border border-border max-w-2xl flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6 p-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Deadline</h3>
              <p className="text-sm text-muted-foreground">
                Set when the candidate should complete this asynchronous interview.
              </p>
            </div>

            <div className="flex gap-2 w-full items-end">
              <FormField
                control={form.control}
                name="deadlineDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormDescription>Date</FormDescription>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal justify-start w-48",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start" side="bottom">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          startMonth={new Date()}
                          disabled={{ before: new Date() }}
                          endMonth={new Date(new Date().setDate(new Date().getDate() + 365))}
                          fixedWeeks
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadlineTime"
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormDescription>Time</FormDescription>
                    <FormControl>
                      <Input {...field} type="time" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full border-t border-border p-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              The deadline can be extended after the interview is published.
            </p>
            <SubmitButton type="submit" className="w-fit" isSubmitting={isUpdatingInterview}>
              Save
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
