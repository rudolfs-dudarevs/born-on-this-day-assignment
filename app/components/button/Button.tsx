import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

export default function Button({ variant = "primary", children, ...rest }: Props) {
  return (
    <button className={clsx(variant === "secondary" ? styles.secondary : styles.primary)} {...rest}>
      {children}
    </button>
  );
}
