import { BirthdaysProvider } from "~/providers/BirthdayProvider";
import Birthdays from "./birthdays";

export default function Index() {
  return (
    <BirthdaysProvider>
      <Birthdays />
    </BirthdaysProvider>
  );
}
