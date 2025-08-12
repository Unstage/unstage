"use client";

import { useZodForm } from "@hooks/use-zod-form";
import { Button } from "@unstage/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@unstage/ui/components/form";
import { Popover, PopoverContent, PopoverTrigger } from "@unstage/ui/components/popover";
import { Textarea } from "@unstage/ui/components/textarea";
import { useState } from "react";
import { z } from "zod";

const feedbackFormSchema = z.object({
  feedback: z.string().min(1, { message: "Feedback is required" }),
});

export function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useZodForm(feedbackFormSchema, {
    defaultValues: {
      feedback: "",
    },
  });

  const handleSubmit = () => {
    console.log("submitted");
    setSubmitted(true);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="hidden md:block">
        <Button
          variant="outline"
          className="rounded-full font-normal h-[32px] p-0 px-3 text-xs text-[#878787]"
        >
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px]" sideOffset={10} align="end">
        {submitted ? (
          <div className="flex items-center justify-center flex-col space-y-1 text-center">
            <p className="font-medium text-sm">Thank you for your feedback!</p>
            <p className="text-sm text-[#4C4C4C]">We will be back with you as soon as possible</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        required
                        autoFocus
                        placeholder="Ideas to improve this page or issues you are experiencing."
                        className="resize-none h-[120px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="mt-1 flex items-center justify-end">
                <Button size="sm" type="submit">
                  Send
                </Button>
              </div>
            </form>
          </Form>
        )}
      </PopoverContent>
    </Popover>
  );
}
