import { createContext, useContext, useMemo, useReducer, useRef, type Dispatch, type ReactNode } from "react";
import { reducer } from "./reducer";
import { type State } from "./types";
import { fetchBirthdays } from "./utils";

export const initialState: State = {
  birthdays: [],
  isLoading: false,
  error: null,
  sortOrder: "desc",
  page: 1,
  pageSize: 7,
};

type BirthdaysContextValue = {
  state: State;
  getBirthdays: () => Promise<void>;
  dismissError: () => void;
  toggleSort: () => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
};

const BirthdaysContext = createContext<BirthdaysContextValue | undefined>(undefined);

export function BirthdaysProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inFlight = useRef<AbortController | null>(null);

  async function getBirthdays() {
    inFlight.current?.abort();
    const abortSignal = new AbortController();
    inFlight.current = abortSignal;

    dispatch({ type: "FETCH_START" });

    try {
      const data = await fetchBirthdays(abortSignal.signal);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      if ((error as any).name === "AbortError") return;
      const msg = error instanceof Error ? error.message : "Unknown error";

      dispatch({ type: "FETCH_ERROR", payload: msg });
    } finally {
      inFlight.current = null;
    }
  }

  const value: BirthdaysContextValue = useMemo(
    () => ({
      state,
      getBirthdays,
      dismissError: () => dispatch({ type: "DISMISS_ERROR" }),
      toggleSort: () => dispatch({ type: "TOGGLE_SORT" }),
      setPage: (page) => dispatch({ type: "SET_PAGE", payload: page }),
      setPageSize: (size) => dispatch({ type: "SET_PAGE_SIZE", payload: size }),
    }),
    [state]
  );

  return <BirthdaysContext.Provider value={value}>{children}</BirthdaysContext.Provider>;
}

export function useBirthdays() {
  const ctx = useContext(BirthdaysContext);

  if (!ctx) throw new Error("useBirthdays must be used within BirthdaysProvider");

  return ctx;
}
