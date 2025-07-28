"use client";

import { useZodForm } from "@hooks/use-zod-form";
import { authClient } from "@unstage/auth/client";
import { Button } from "@unstage/ui/components/button";
import { Form, FormControl, FormField, FormItem } from "@unstage/ui/components/form";
import { Icons } from "@unstage/ui/components/icons";
import { Input } from "@unstage/ui/components/input";
import { Label } from "@unstage/ui/components/label";
import { cn } from "@unstage/ui/lib/utils";
import { z } from "zod";

const formSchema = z.object({
  email: z.email(),
});

export default function SignInForm({ className, ...props }: React.ComponentProps<"div">) {
  const form = useZodForm(formSchema, {
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email: values.email,
      type: "sign-in",
    });

    if (error) {
      console.error(error);
    }

    if (data) {
      console.log(data);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 max-w-md", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-semibold font-display">Sign in to Unstage.</h1>
              <p className="text-muted-foreground text-lg font-light">
                Go beyond resumes and puzzles—assess engineers with job-relevant scenarios.
              </p>
            </div>
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
                Sign in
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">Or</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button variant="outline" type="button" className="w-full">
                <Icons.Apple />
                Continue with Apple
              </Button>
              <Button variant="outline" type="button" className="w-full">
                <Icons.Google />
                Continue with Google
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-xs *:[a]:underline *:[a]:underline-offset-2">
        By clicking continue, you acknowledge that you have read and agree to Unstage&apos;s{" "}
        <a href="https://unstage.dev/terms">Terms of Service</a> and{" "}
        <a href="https://unstage.dev/privacy">Privacy Policy</a>.
      </div>
    </div>
  );
}
