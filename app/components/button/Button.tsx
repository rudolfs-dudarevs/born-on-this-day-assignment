import type { ButtonHTMLAttributes, ReactNode } from "react";
import style from "./Button.module.scss";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

export default function Button({ variant = "primary", children, ...rest }: Props) {
  return (
    <button className={clsx(variant === "secondary" ? style.secondary : style.primary)} {...rest}>
      {children}
    </button>
  );
}
