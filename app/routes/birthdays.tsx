import { useBirthdays } from "~/providers/BirthdayProvider";
import Button from "~/components/button/Button";
import style from "./birthdays.module.scss";
import { useMemo } from "react";
import Pagination from "~/components/pagination/Pagination";

export default function Birthdays() {
  const { birthdays, isLoading, getBirthdays, sortOrder, toggleSort, currentPage, pageSize, setCurrentPage } = useBirthdays();

  const sortedBirthdays = useMemo(() => {
    const copy = [...birthdays];
    copy.sort((a, b) => (sortOrder === "desc" ? b.year - a.year : a.year - b.year));

    return copy;
  }, [birthdays, sortOrder]);

  const todayLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        timeZone: "Europe/Riga",
      }).format(new Date()),
    []
  );

  const total = sortedBirthdays.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (currentPage - 1) * pageSize;
  const pageItems = sortedBirthdays.slice(start, start + pageSize);

  return (
    <section className={style.container}>
      <h1 className={style.title}>{`Born this day - ${todayLabel}`}</h1>

      {!sortedBirthdays.length ? (
        <Button onClick={getBirthdays} disabled={isLoading}>
          Get birthdays
        </Button>
      ) : (
        <div className={style.controls}>
          <Button onClick={toggleSort} variant="secondary">
            Sort: {sortOrder === "desc" ? "Newest" : "Oldest"}
          </Button>
          <Button onClick={getBirthdays} disabled={isLoading}>
            Reload
          </Button>
        </div>
      )}

      {isLoading && <p>Fetching birthdays…</p>}

      {!!sortedBirthdays.length && (
        <>
          <ul className={style.birthdayList}>
            {pageItems.map((birthday, idx) => (
              <li key={`${birthday.year}-${idx}`} className={style.item}>
                <div className={style.year}>{birthday.year}</div>
                <div>{birthday.text}</div>
              </li>
            ))}
          </ul>
          <Pagination page={currentPage} totalPages={totalPages} onPage={setCurrentPage} />
        </>
      )}
    </section>
  );
}
