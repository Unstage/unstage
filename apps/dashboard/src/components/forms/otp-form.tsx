"use client";

import { useZodForm } from "@hooks/use-zod-form";
import { authClient } from "@unstage/auth/client";
import { Button } from "@unstage/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@unstage/ui/components/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@unstage/ui/components/input-otp";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { z } from "zod";

type OtpFormProps = {
  email: string;
};

const otpFormSchema = z.object({
  otp: z.string().length(6),
});

export default function OtpForm({ email }: OtpFormProps) {
  const router = useRouter();
  const form = useZodForm(otpFormSchema, {
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof otpFormSchema>) => {
    const { data, error } = await authClient.signIn.emailOtp({
      email: email,
      otp: values.otp,
    });

    if (error) {
      console.error(error);
      posthog.capture("otp_sign_in_error", {
        email: email,
        error: error.message,
      });
    }

    if (data) {
      posthog.capture("otp_sign_in_success", {
        email: email,
      });
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-time password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="font-light">
                    Code sent to: <span className="font-semibold">{email}.</span>
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
