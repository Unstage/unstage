"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useSearchStore } from "@store/search";
import { Dialog, DialogContent, DialogTitle } from "@unstage/ui/components/dialog";
import { useHotkeys } from "react-hotkeys-hook";
import { SearchFooter } from "../../search/search-footer";

export function SearchModal() {
  const { isOpen, setOpen } = useSearchStore();

  useHotkeys("meta+k", () => setOpen(), {
    enableOnFormTags: true,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        className="overflow-hidden p-0 max-w-full w-full md:max-w-[740px] h-[535px] m-0 select-text bg-background"
        showCloseButton={false}
      >
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>
        <SearchFooter />
      </DialogContent>
    </Dialog>
  );
}
