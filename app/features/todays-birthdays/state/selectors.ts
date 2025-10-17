import type { State } from "./types";

export const selectSortedBirthdays = (state: State) => [...state.birthdays].sort((a, b) => (state.sortOrder === "desc" ? b.year - a.year : a.year - b.year));

export const selectTotalPages = (state: State) => Math.max(1, Math.ceil(state.birthdays.length / state.pageSize));

export const selectPageItems = (state: State) => {
  const sorted = selectSortedBirthdays(state);
  const start = (state.page - 1) * state.pageSize;

  return sorted.slice(start, start + state.pageSize);
};
