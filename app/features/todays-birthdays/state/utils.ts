import type { Birth } from "./types";

const API_BASE_URL = "https://api.wikimedia.org/feed/v1/wikipedia";

export function getMonthAndDay(date = new Date()) {
  const month = date.toLocaleString("en-US", { month: "2-digit" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });

  return { month, day };
}

export async function fetchBirthdays(signal: AbortSignal): Promise<Birth[]> {
  const { month, day } = getMonthAndDay();
  const url = `${API_BASE_URL}/en/onthisday/births/${month}/${day}`;
  const res = await fetch(url, {
    signal,
    headers: {
      Accept: "application/json",
      "User-Agent": "LP-Homework/1.0 (email@example.com)",
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch birthdays (${res.status})`);

  const data = await res.json();

  return (data.births ?? []) as Birth[];
}
