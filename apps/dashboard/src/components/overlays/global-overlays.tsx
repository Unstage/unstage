import { InterviewModal } from "@components/overlays/modals/interview-modal";
import { SearchModal } from "@components/overlays/modals/search-modal";

export function GlobalOverlays() {
  return (
    <>
      <SearchModal />
      <InterviewModal />
    </>
  );
}
