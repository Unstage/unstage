import { CreatePersonaForm } from "@components/forms/create-persona-form";
import { Button } from "@unstage/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@unstage/ui/components/dialog";

export function CreatePersona() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-lg">Create persona</DialogTitle>
          <DialogDescription>
            Add the persona name, role, voice, and avatar that will be used during this scenario.
          </DialogDescription>
        </DialogHeader>

        <CreatePersonaForm />
      </DialogContent>

      <DialogTrigger asChild>
        <Button>Create persona</Button>
      </DialogTrigger>
    </Dialog>
  );
}
