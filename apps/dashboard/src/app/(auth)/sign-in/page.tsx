import { OtpSignIn } from "@components/otp-sign-in";
import { SignInFooter } from "@components/sign-in-footer";
import { SocialSignIn } from "@components/social-sign-in";

export default function SignIn() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold font-display">Sign in to Unstage.</h1>
        <p className="text-muted-foreground text-lg font-light">
          Go beyond resumes and puzzles—assess engineers with job-relevant scenarios.
        </p>
      </div>
      <OtpSignIn />
      <SocialSignIn />
      <SignInFooter />
    </div>
  );
}
