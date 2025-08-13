"use client";

import { useInterviewParams } from "@hooks/use-interview-params";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@unstage/ui/components/dialog";

export function InterviewModal() {
  const { setParams, type, interviewId } = useInterviewParams();
  const isOpen = type === "create" || type === "edit" || type === "details";
  console.log(type, interviewId);

  return (
    <Dialog open={isOpen} onOpenChange={() => setParams(null)}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {type === "create" && "Create interview"}
            {type === "edit" && "Edit interview"}
            {type === "details" && "Interview details"}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
