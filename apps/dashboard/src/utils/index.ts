export function isNonEmpty(v: unknown) {
  return typeof v === "string" ? v.trim().length > 0 : !!v;
}
