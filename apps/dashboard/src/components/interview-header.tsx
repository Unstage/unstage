import { OpenInterviewModal } from "./open-interview-modal";

export function InterviewHeader() {
  return (
    <div className="flex items-center justify-between">
      L
      <div className="hidden sm:flex space-x-2">
        <OpenInterviewModal />
      </div>
    </div>
  );
}
