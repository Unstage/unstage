import { CreatePersona } from "./create-persona";

export function EditScenario() {
  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Personas</h3>
          <p className="text-sm text-muted-foreground">Add or remove personas for the scenario.</p>
        </div>
        <CreatePersona />
      </div>
      <PersonaEmptyState />
    </div>
  );
}

function PersonaEmptyState() {
  return (
    <div className="flex flex-col gap-1 py-20 border border-border justify-center items-center">
      <h6 className="font-semibold text-sm">No personas added yet</h6>
      <p className="text-sm text-muted-foreground">
        Use the button above to add a persona to the scenario.
      </p>
    </div>
  );
}
