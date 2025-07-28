export function getAppUrl() {
  if (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production") {
    return "https://app.unstage.dev";
  }

  if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3001";
}

export function getEmailUrl() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://unstage.dev";
}

export function getWebsiteUrl() {
  if (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production") {
    return "https://unstage.dev";
  }

  if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export function getCdnUrl() {
  return "https://cdn.unstage.dev";
}
