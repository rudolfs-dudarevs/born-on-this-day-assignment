import type { ReactNode } from "react";
import style from "./ErrorModal.module.scss";
import Button from "~/components/button/Button";

type Props = {
  title: string;
  message: ReactNode;
  onClose: () => void;
  onRetry: () => void;
};

export default function ErrorModal({ title, message, onClose, onRetry }: Props) {
  return (
    <div className={style.overlay} onClick={onClose}>
      <div
        className={style.dialog}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className={style.title}>{title}</h2>
        <p className={style.message}>{message}</p>
        <div className={style.actions}>
          {onRetry && <Button onClick={onRetry}>Retry</Button>}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
