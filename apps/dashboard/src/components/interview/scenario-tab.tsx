"use client";

import { ScenarioSearchFilter } from "@components/scenario-search-filter";
import { ToggleGroup, ToggleGroupItem } from "@unstage/ui/components/toggle-group";
import { parseAsString, useQueryState } from "nuqs";
import { EditScenario } from "./edit-scenario";

export function ScenarioTab() {
  const [panel, setPanel] = useQueryState("panel", parseAsString.withDefault("edit"));
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ToggleGroup
          type="single"
          className="gap-0 rounded-none border border-input"
          value={panel}
          onValueChange={(value) => {
            if (value) {
              setPanel(value as "edit" | "library");
            }
          }}
        >
          <ToggleGroupItem
            value="edit"
            className="rounded-none data-[state=on]:bg-accent data-[state=on]:text-foreground data-[state=off]:text-muted-foreground data-[state=off]:bg-muted px-4 h-[34px]"
          >
            Edit
          </ToggleGroupItem>
          <ToggleGroupItem
            value="library"
            className="rounded-none data-[state=on]:bg-accent data-[state=on]:text-foreground data-[state=off]:text-muted-foreground data-[state=off]:bg-muted px-4 h-[34px]"
          >
            Library
          </ToggleGroupItem>
        </ToggleGroup>
        {panel === "library" && <ScenarioSearchFilter />}
      </div>
      {panel === "edit" && <EditScenario />}
    </div>
  );
}
