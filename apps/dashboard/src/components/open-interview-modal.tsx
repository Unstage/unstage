"use client";

import { useInterviewParams } from "@hooks/use-interview-params";
import { Button } from "@unstage/ui/components/button";
import { Icons } from "@unstage/ui/components/icons";

export function OpenInterviewModal() {
  const { setParams } = useInterviewParams();

  return (
    <div>
      <Button variant="outline" size="icon" onClick={() => setParams({ type: "create" })}>
        <Icons.Add />
      </Button>
    </div>
  );
}
