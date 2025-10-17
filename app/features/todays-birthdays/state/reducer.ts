import { initialState } from "./context";
import { type Action, type State } from "./types";

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, birthdays: action.payload, page: 1 };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "DISMISS_ERROR":
      return { ...state, error: null };
    case "TOGGLE_SORT":
      return { ...state, sortOrder: state.sortOrder === "desc" ? "asc" : "desc" };
    case "SET_PAGE":
      return { ...state, page: Math.max(1, action.payload) };
    default:
      return state;
  }
}
