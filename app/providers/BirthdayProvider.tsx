import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Birth = { text: string; year: number };
const BASE_URL = "https://api.wikimedia.org/feed/v1/wikipedia";

type BirthdaysContextValue = {
  items: Birth[];
  isLoading: boolean;
  getBirthdays: () => Promise<void>;
};

const BirthdaysContext = createContext<BirthdaysContextValue | undefined>(undefined);

export function BirthdaysProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Birth[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getBirthdays() {
    setIsLoading(true);
    try {
      const data = await fetchBirthdays();
      setItems(data);
    } finally {
      setIsLoading(false);
    }
  }

  const value = useMemo(() => ({ items, isLoading, getBirthdays }), [items, isLoading]);

  return <BirthdaysContext.Provider value={value}>{children}</BirthdaysContext.Provider>;
}

export function useBirthdays() {
  const ctx = useContext(BirthdaysContext);

  if (!ctx) throw new Error("useBirthdays must be used within BirthdaysProvider");

  return ctx;
}

function getMonthAndDay(date = new Date()) {
  const month = date.toLocaleString("en-US", { month: "2-digit" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });

  return { month, day };
}

async function fetchBirthdays(): Promise<Birth[]> {
  const { month, day } = getMonthAndDay();
  const url = `${BASE_URL}/en/onthisday/births/${month}/${day}`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch birthdays from Wiki");

  const data = await res.json();

  const birthdays: Birth[] = data.births ?? [];

  return birthdays;
}
