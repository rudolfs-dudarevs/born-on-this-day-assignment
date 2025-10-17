import { BirthdaysProvider } from "~/features/todays-birthdays/state/context";
import TodaysBirthdays from "~/features/todays-birthdays/TodaysBirthdays";

export default function Birthdays() {
  return (
    <BirthdaysProvider>
      <TodaysBirthdays />
    </BirthdaysProvider>
  );
}
