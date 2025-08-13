"use client";

import { useUserQuery } from "@hooks/use-user";
import { SelectRoleForm } from "./forms/select-role-form";
import { SetupForm } from "./forms/setup-form";

export function Setup() {
  const { data: user } = useUserQuery();

  if (!user) return null;

  return !user?.role ? <SelectRoleForm /> : <SetupForm />;
}
