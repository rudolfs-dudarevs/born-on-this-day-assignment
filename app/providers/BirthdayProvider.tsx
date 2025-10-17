import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Birth = { text: string; year: number };

const BASE_URL = "https://api.wikimedia.org/feed/v1/wikipedia";

type SortOrder = "asc" | "desc";

type BirthdaysContextValue = {
  birthdays: Birth[];
  isLoading: boolean;
  getBirthdays: () => Promise<void>;
  sortOrder: SortOrder;
  toggleSort: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
};

const BirthdaysContext = createContext<BirthdaysContextValue | undefined>(undefined);

export function BirthdaysProvider({ children }: { children: ReactNode }) {
  const [birthdays, setBirthdays] = useState<Birth[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  function toggleSort() {
    setSortOrder((state) => (state === "desc" ? "asc" : "desc"));
  }

  async function getBirthdays() {
    setIsLoading(true);
    try {
      const data = await fetchBirthdays();
      setBirthdays(data);
    } finally {
      setIsLoading(false);
    }
  }

  const value = useMemo(
    () => ({
      birthdays,
      isLoading,
      getBirthdays,
      sortOrder,
      toggleSort,
      currentPage,
      pageSize,
      setCurrentPage,
      setPageSize,
    }),
    [birthdays, isLoading, sortOrder, currentPage, pageSize]
  );

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
