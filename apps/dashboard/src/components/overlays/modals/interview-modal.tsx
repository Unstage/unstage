"use client";

import { CreateInterviewForm } from "@components/forms/create-interview-form";
import { useInterviewParams } from "@hooks/use-interview-params";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@unstage/ui/components/dialog";

export function InterviewModal() {
  const { setParams, create } = useInterviewParams();

  return (
    <Dialog open={create ?? false} onOpenChange={() => setParams(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-lg">Create interview</DialogTitle>
          <DialogDescription>
            Add the basics—title, mode, timing, and candidate info. You&apos;ll choose the scenario
            and fine-tune details on the next screen.
          </DialogDescription>
        </DialogHeader>

        <CreateInterviewForm />
      </DialogContent>
    </Dialog>
  );
}
