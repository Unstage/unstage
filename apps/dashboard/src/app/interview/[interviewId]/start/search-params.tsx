import { createLoader, parseAsString } from "nuqs/server";

export const startInterviewSearchParams = {
  email: parseAsString,
  otp: parseAsString,
};

export const loadSearchParams = createLoader(startInterviewSearchParams);
