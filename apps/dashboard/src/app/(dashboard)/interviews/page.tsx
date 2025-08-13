import { InterviewHeader } from "@components/interview-header";
import type { Metadata } from "next";
import type { SearchParams } from "nuqs";

export const metadata: Metadata = {
  title: "Interviews",
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default function InterviewsPage({ searchParams }: Props) {
  return (
    <div className="flex flex-col gap-6 pt-6">
      <InterviewHeader />
    </div>
  );
}
