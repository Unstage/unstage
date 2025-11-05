"use client";

import { DeadlineForm } from "@components/forms/deadline-form";
import { DeliveryMethodForm } from "@components/forms/delivery-method-form";
import { useInterviewQuery } from "@hooks/use-interview";
import { useParams } from "next/navigation";

export function DeliveryTab() {
  const params = useParams();
  const interviewId = params.interviewId as string;
  const { data: interview } = useInterviewQuery(interviewId);

  return (
    <div className="space-y-6">
      <DeliveryMethodForm />

      {interview.mode === "async" && <DeadlineForm />}
    </div>
  );
}
