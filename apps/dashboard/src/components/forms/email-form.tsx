"use client";

import { useZodForm } from "@hooks/use-zod-form";
import { authClient } from "@unstage/auth/client";
import { Button } from "@unstage/ui/components/button";
import { Form, FormControl, FormField, FormItem } from "@unstage/ui/components/form";
import { Input } from "@unstage/ui/components/input";
import { Label } from "@unstage/ui/components/label";
import posthog from "posthog-js";

import { z } from "zod";

const emailFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
});

export default function EmailForm({ onSubmit }: { onSubmit: (email: string) => void }) {
  const form = useZodForm(emailFormSchema, {
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof emailFormSchema>) => {
    posthog.capture("sign_in_email_submitted", {
      email: values.email,
    });

    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email: values.email,
      type: "sign-in",
    });

    if (error) {
      console.error(error);
      posthog.capture("sign_in_email_send_error", {
        email: values.email,
        error: error.message,
      });
    }

    if (data) {
      posthog.capture("sign_in_email_send_success", {
        email: values.email,
      });
      onSubmit(values.email);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      autoFocus
                      autoCapitalize="none"
                      autoCorrect="off"
                      id="email"
                      type="email"
                      placeholder="me@example.com"
                      required
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
