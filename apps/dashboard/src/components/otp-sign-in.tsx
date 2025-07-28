"use client";

import { useState } from "react";
import EmailForm from "./forms/email-form";
import OtpForm from "./forms/otp-form";

export default function OtpSignIn() {
  const [email, setEmail] = useState<string>("");

  if (email) {
    return <OtpForm email={email} />;
  }

  return <EmailForm onSubmit={setEmail} />;
}
