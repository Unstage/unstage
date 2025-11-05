// @ts-nocheck

import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormProps, useForm } from "react-hook-form";
import type { z } from "zod";

// biome-ignore lint/suspicious/noExplicitAny: Generic type constraint for any zod schema
export const useZodForm = <T extends z.ZodType<any, any>>(
  schema: T,
  options?: Omit<UseFormProps, "resolver">
) => {
  return useForm({
    resolver: zodResolver(schema),
    ...options,
  });
};
