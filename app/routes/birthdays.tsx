import { useBirthdays } from "~/providers/BirthdayProvider";
import Button from "~/components/button/Button";
import style from "./birthdays.module.scss";

export default function Birthdays() {
  const { items, isLoading, getBirthdays } = useBirthdays();

  return (
    <section>
      <h1>{`Today's Birthdays`}</h1>

      <Button onClick={getBirthdays} disabled={isLoading}>
        Load birthdays
      </Button>

      {!items.length && <section>No birthedays to show for today.</section>}

      {isLoading ? (
        <div>Fetching birthdays</div>
      ) : (
        <ul className={style.birthdayList}>
          {items.map((birthday, idx) => (
            <li key={`${birthday.year}-${idx}`} className={style.item}>
              <div className={style.year}>{birthday.year}</div>
              <div>{birthday.text}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
