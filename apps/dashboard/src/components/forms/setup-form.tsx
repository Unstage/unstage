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
import { Input } from "@unstage/ui/components/input";
import { z } from "zod";

const setupSchema = z.object({
  fullName: z.string().min(1),
});

export default function SetupForm() {
  const form = useZodForm(setupSchema, {
    defaultValues: {
      fullName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof setupSchema>) => {
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your first and last name.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
