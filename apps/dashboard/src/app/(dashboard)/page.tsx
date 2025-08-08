"use client";

import { Button } from "@unstage/ui/components/button";
import posthog from "posthog-js";

export default function Home() {
  return <Button onClick={() => posthog.capture("button_clicked")}>Click me</Button>;
}
