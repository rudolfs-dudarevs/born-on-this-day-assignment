import clsx from "clsx";
import styles from "./Spinner.module.scss";

type Props = {
  variant?: string;
  className?: string;
};

export default function Spinner({ variant = "md", className }: Props) {
  return (
    <div className={clsx(variant === "md" ? styles.md : styles.sm, className)}>
      <div className={styles.spinner} />
    </div>
  );
}
