export function combineDateAndTime(date: Date, hhmm: string) {
  const [hStr, mStr] = hhmm.split(":");
  const h = Number(hStr);
  const m = Number(mStr);

  if (!Number.isInteger(h) || h < 0 || h > 23) throw new Error("Invalid hour");
  if (!Number.isInteger(m) || m < 0 || m > 59) throw new Error("Invalid minute");

  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d;
}
