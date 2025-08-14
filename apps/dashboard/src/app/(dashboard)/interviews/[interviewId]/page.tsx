import type { Metadata } from "next";
import type { SearchParams } from "nuqs";

export const metadata: Metadata = {
  title: "Interview",
};

type Props = {
  params: Promise<SearchParams>;
};

export default async function InterviewPage({ params }: Props) {
  const { interviewId } = await params;

  return <div className="flex flex-col gap-6 pt-6">{interviewId}</div>;
}
