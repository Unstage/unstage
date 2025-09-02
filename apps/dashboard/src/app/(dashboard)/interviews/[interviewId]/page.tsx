import { EditableInterviewHeader } from "@components/interview/editable-interview-header";
import { InterviewTabs } from "@components/interview/interview-tabs";
import { SetupChecklist } from "@components/interview/setup-checklist";
import { getQueryClient, HydrateClient, trpc } from "@src/trpc/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Interview",
};

type Props = {
  params: Promise<{ interviewId: string }>;
};

export default async function InterviewPage({ params }: Props) {
  const { interviewId } = await params;

  if (!interviewId || typeof interviewId !== "string") {
    redirect("/not-found");
  }

  const queryClient = getQueryClient();

  const interview = await queryClient.fetchQuery(
    trpc.interview.getById.queryOptions({
      interviewId,
    })
  );

  if (!interview) {
    redirect("/not-found");
  }

  return (
    <div className="flex gap-6 pt-6">
      <HydrateClient>
        <div className="flex flex-col gap-8 flex-1">
          <EditableInterviewHeader />
          <InterviewTabs />
        </div>
        {interview.status === "draft" && <SetupChecklist />}
      </HydrateClient>
    </div>
  );
}
