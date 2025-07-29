export function assertIsSignIn(type: string): asserts type is "sign-in" {
  if (type !== "sign-in") {
    throw new Error(
      "Verification type must be 'sign-in', 'email-verification' and 'password-reset' are not supported."
    );
  }
}
