import { useMemo } from "react";
import { useBirthdays } from "~/features/todays-birthdays/state/context";
import { selectPageItems, selectSortedBirthdays, selectTotalPages } from "~/features/todays-birthdays/state/selectors";
import Button from "~/components/button/Button";
import Pagination from "~/components/pagination/Pagination";
import ErrorModal from "~/components/error-modal/ErrorModal";
import styles from "./TodaysBirthdays.module.scss";
import Spinner from "~/components/spinner/Spinner";

export default function Birthdays() {
  const { state, getBirthdays, dismissError, toggleSort, setPage } = useBirthdays();

  const sorted = useMemo(() => selectSortedBirthdays(state), [state.birthdays, state.sortOrder]);
  const items = useMemo(() => selectPageItems(state), [state.birthdays, state.sortOrder, state.page, state.pageSize]);
  const totalPages = useMemo(() => selectTotalPages(state), [state.birthdays, state.pageSize]);

  const todayLabel = useMemo(() => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: "Europe/Riga" }).format(new Date()), []);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{`Born this day - ${todayLabel}`}</h1>

      {!sorted.length ? (
        state.isLoading ? (
          <Spinner />
        ) : (
          <Button onClick={getBirthdays}>Get birthdays</Button>
        )
      ) : (
        <div className={styles.controls}>
          <Button onClick={toggleSort} variant="secondary">
            Sort: {state.sortOrder === "desc" ? "Newest" : "Oldest"}
          </Button>
          <Button onClick={getBirthdays} disabled={state.isLoading}>
            {state.isLoading ? <Spinner variant="sm" /> : "Reload"}
          </Button>
        </div>
      )}

      {!!sorted.length && (
        <>
          <ul className={styles.birthdayList}>
            {items.map((birthday, idx) => (
              <li key={`${birthday.year}-${idx}`} className={styles.item}>
                <div className={styles.year}>{birthday.year}</div>
                <div>{birthday.text}</div>
              </li>
            ))}
          </ul>
          <Pagination page={state.page} totalPages={totalPages} onPage={setPage} />
        </>
      )}

      {state.error && (
        <ErrorModal
          title="Something went wrong"
          message={state.error}
          onClose={dismissError}
          onRetry={() => {
            dismissError();
            getBirthdays();
          }}
        />
      )}
    </section>
  );
}
