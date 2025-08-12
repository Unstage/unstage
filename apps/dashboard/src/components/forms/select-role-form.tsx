"use client";

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
  const form = useZodForm(selectRoleSchema, {
    defaultValues: {
      role: "recruiter",
    },
  });

  const onSubmit = (values: z.infer<typeof selectRoleSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  className="flex gap-6 font-display"
                >
                  <div
                    className={cn(
                      "flex flex-col gap-2 border border-border p-6 w-[250px]",
                      field.value === "recruiter" && "border-input bg-muted/40"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="recruiter" id="recruiter" />
                      <Label htmlFor="recruiter" className="text-lg">
                        Hiring manager
                      </Label>
                    </div>
                    <FormDescription className="text-muted-foreground">
                      I'm a hiring manager looking to improve my hiring process.
                    </FormDescription>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col gap-2 border border-border p-6 w-[250px]",
                      field.value === "candidate" && "border-input bg-muted/40"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="candidate" id="candidate" />
                      <Label htmlFor="candidate" className="text-lg">
                        Software engineer
                      </Label>
                    </div>
                    <FormDescription className="text-muted-foreground">
                      I'm a software engineer looking to sharpen my skills.
                    </FormDescription>
                  </div>
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
