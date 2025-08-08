import type { SearchParams } from "nuqs/server";
import { loadSearchParams } from "./search-params";

interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{ interviewId: string }>;
}

export default async function StartInterviewPage({ searchParams, params }: Props) {
  const { email, otp } = await loadSearchParams(searchParams);
  const { interviewId } = await params;

  // TODO: If there is a signed in user, check if a valid invite exists for this user and interview
  // If not, display a message to the user that the invite is invalid
  // If there is a valid invite, display the start interview page
  // If there is no signed in user, prompt the user to enter their email and OTP
  // Once the user has entered their email and OTP, check if a valid invite exists for this user and interview
  return (
    <div>
      Email: {email} OTP: {otp} Interview ID: {interviewId}
    </div>
  );
}
