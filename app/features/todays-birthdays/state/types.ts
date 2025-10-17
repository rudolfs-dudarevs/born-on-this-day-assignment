export type Birth = { text: string; year: number };
export type SortOrder = "asc" | "desc";

export type State = {
  birthdays: Birth[];
  isLoading: boolean;
  error: string | null;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
};

export type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Birth[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "DISMISS_ERROR" }
  | { type: "TOGGLE_SORT" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_PAGE_SIZE"; payload: number };

export type Actions = {
  getBirthdays: () => Promise<void>;
  dismissError: () => void;
  toggleSort: () => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
};

export type Ctx = {
  state: State;
  getBirthdays: Actions["getBirthdays"];
  dismissError: Actions["dismissError"];
  toggleSort: Actions["toggleSort"];
  setPage: Actions["setPage"];
  setPageSize: Actions["setPageSize"];
};
