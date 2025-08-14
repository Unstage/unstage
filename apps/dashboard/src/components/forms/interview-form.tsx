"use client";

import { useZodForm } from "@hooks/use-zod-form";
import { useTRPC } from "@src/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@unstage/ui/components/button";
import { Calendar } from "@unstage/ui/components/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@unstage/ui/components/form";
import { Icons } from "@unstage/ui/components/icons";
import { Input } from "@unstage/ui/components/input";
import { Label } from "@unstage/ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@unstage/ui/components/popover";
import { RadioGroup, RadioGroupItem } from "@unstage/ui/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@unstage/ui/components/select";
import { SubmitButton } from "@unstage/ui/components/submit-button";
import { cn } from "@unstage/ui/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { z } from "zod";

const interviewSchema = z.object({
  title: z.string().min(2).max(48),
  mode: z.enum(["async", "live"]),
  deadlineDate: z.date(),
  deadlineTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  timeLimitMinutes: z.string().optional(),
  candidateEmail: z.email().optional(),
  candidateName: z.string().optional(),
});

function combineDateAndTime(date: Date, hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d;
}

export function InterviewForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const createInterviewMutation = useMutation(
    trpc.interview.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({
          queryKey: ["interviews"],
        });
        if (data) {
          router.push(`/interviews/${data.id}`);
        }
      },
    })
  );

  const onSubmit = (data: z.infer<typeof interviewSchema>) => {
    const asyncInterviewDeadlineAt = combineDateAndTime(data.deadlineDate, data.deadlineTime);

    createInterviewMutation.mutate({
      title: data.title,
      mode: data.mode,
      timeLimitMinutes: data.timeLimitMinutes ? parseInt(data.timeLimitMinutes) : undefined,
      candidateEmail: data.candidateEmail,
      candidateName: data.candidateName,
      asyncInterviewDeadlineAt: asyncInterviewDeadlineAt,
    });
  };

  const form = useZodForm(interviewSchema, {
    defaultValues: {
      title: "",
      mode: "async",
      deadlineDate: new Date(),
      deadlineTime: "17:00",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Frontend (Senior) — React state & a11y" />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-6 items-center w-full">
          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mode</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex h-9 items-center"
                    defaultValue="async"
                  >
                    <div className="flex gap-2">
                      <RadioGroupItem value="async" id="async" />
                      <Label htmlFor="async">Asynchronous</Label>
                    </div>
                    <div className="flex gap-2">
                      <RadioGroupItem value="live" id="live" />
                      <Label htmlFor="live">Live</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeLimitMinutes"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>
                  Time limit <span className="text-muted-foreground font-light">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a time limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="150">2.5 hours</SelectItem>
                      <SelectItem value="180">3 hours</SelectItem>
                      <SelectItem value="210">3.5 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 w-full items-end">
          <FormField
            control={form.control}
            name="deadlineDate"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Deadline</FormLabel>
                <FormDescription>Date</FormDescription>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal justify-start",
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

        <div className="flex gap-2 items-end w-full">
          <FormField
            control={form.control}
            name="candidateEmail"
            render={({ field }) => (
              <FormItem className="w-2/3">
                <FormLabel>
                  Candidate info{" "}
                  <span className="text-muted-foreground font-light">(optional)</span>
                </FormLabel>
                <FormDescription>Email address</FormDescription>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    value={field.value ?? ""}
                    placeholder="john.doe@example.com"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="candidateName"
            render={({ field }) => (
              <FormItem>
                <FormDescription>Name</FormDescription>
                <FormControl>
                  <Input {...field} value={field.value ?? ""} placeholder="John Doe" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 bg-accent border border-border/60 p-2">
          <Icons.Info className="w-5 h-5 text-muted-foreground" />
          <FormDescription>
            Your candidate won&apos;t receive an email with the link to begin the interview until
            you publish it.
          </FormDescription>
        </div>

        <SubmitButton type="submit" className="w-full" isSubmitting={false}>
          Create draft
        </SubmitButton>
      </form>
    </Form>
  );
}
