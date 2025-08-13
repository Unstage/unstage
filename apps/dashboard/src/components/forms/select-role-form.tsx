"use client";

import { useUserMutation } from "@hooks/use-user";
import { useZodForm } from "@hooks/use-zod-form";
import { Button } from "@unstage/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@unstage/ui/components/form";
import { Label } from "@unstage/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@unstage/ui/components/radio-group";
import { cn } from "@unstage/ui/lib/utils";
import { z } from "zod";

const selectRoleSchema = z.object({
  role: z.enum(["recruiter", "candidate"]),
});

export function SelectRoleForm() {
  const updateUserMutation = useUserMutation();

  const onSubmit = (values: z.infer<typeof selectRoleSchema>) => {
    updateUserMutation.mutate({
      role: values.role,
    });
  };

  const form = useZodForm(selectRoleSchema, {
    defaultValues: {
      role: "recruiter",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl font-display">Select your role</FormLabel>
              <FormDescription className="text-muted-foreground mb-6">
                Choose the role that best describes you.
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex gap-6 font-display md:flex-row flex-col"
                >
                  <Label
                    className={cn(
                      "flex flex-col gap-2 border border-border p-6 md:w-[250px] w-full cursor-pointer",
                      field.value === "recruiter" && "border-input bg-muted/40"
                    )}
                    htmlFor="recruiter"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <RadioGroupItem value="recruiter" id="recruiter" />
                      <p className="text-lg">Hiring manager</p>
                    </div>
                    <FormDescription className="text-muted-foreground">
                      I'm a hiring manager looking to improve my hiring process.
                    </FormDescription>
                  </Label>
                  <Label
                    className={cn(
                      "flex flex-col gap-2 border border-border p-6 md:w-[250px] w-full cursor-pointer",
                      field.value === "candidate" && "border-input bg-muted/40"
                    )}
                    htmlFor="candidate"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <RadioGroupItem value="candidate" id="candidate" />
                      <p className="text-lg">Software engineer</p>
                    </div>
                    <FormDescription className="text-muted-foreground">
                      I'm a software engineer looking to sharpen my skills.
                    </FormDescription>
                  </Label>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
}
