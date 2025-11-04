import { useZodForm } from "@hooks/use-zod-form";
import { Button } from "@unstage/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@unstage/ui/components/form";
import { Input } from "@unstage/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@unstage/ui/components/select";
import { Textarea } from "@unstage/ui/components/textarea";
import { z } from "zod";

const personaRoles = [
  "product_manager",
  "tech_lead",
  "senior_engineer",
  "designer",
  "qa_engineer",
  "devops",
  "stakeholder",
] as const;

const personaAvatars = [
  "avatar_professional_1",
  "avatar_professional_2",
  "avatar_professional_3",
  "avatar_casual_1",
  "avatar_casual_2",
  "avatar_casual_3",
  "avatar_diverse_1",
  "avatar_diverse_2",
  "avatar_diverse_3",
] as const;

const ttsVoices = [
  "voice_sarah_professional",
  "voice_mike_friendly",
  "voice_emma_authoritative",
  "voice_david_calm",
  "voice_lisa_energetic",
  "voice_alex_technical",
] as const;

const createPersonaSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.enum(personaRoles),
  avatar: z.enum(personaAvatars).optional(),
  ttsVoiceId: z.enum(ttsVoices).optional(),
});

export function CreatePersonaForm() {
  const form = useZodForm(createPersonaSchema, {
    defaultValues: {
      name: "",
      role: "senior_engineer",
      avatar: undefined,
      ttsVoiceId: undefined,
    },
  });

  const onSubmit = (value: z.infer<typeof createPersonaSchema>) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter persona name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {personaRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an avatar" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {personaAvatars.map((avatar) => (
                    <SelectItem key={avatar} value={avatar}>
                      {avatar.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ttsVoiceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ttsVoices.map((voice) => (
                    <SelectItem key={voice} value={voice}>
                      {voice.replace(/voice_|_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
}
