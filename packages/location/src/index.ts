import { headers } from "next/headers";

export async function getCountryCode() {
  const headersList = await headers();

  return headersList.get("x-vercel-ip-country") || "US";
}

export async function getLocale() {
  const headersList = await headers();

  return headersList.get("x-vercel-ip-locale") || "en-US";
}

export async function getTimezone() {
  const headersList = await headers();

  return headersList.get("x-vercel-ip-timezone") || "UTC";
}
