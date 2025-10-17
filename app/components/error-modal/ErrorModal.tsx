import type { ReactNode } from "react";
import styles from "./ErrorModal.module.scss";
import Button from "~/components/button/Button";

type Props = {
  title: string;
  message: ReactNode;
  onClose: () => void;
  onRetry: () => void;
};

export default function ErrorModal({ title, message, onClose, onRetry }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.dialog}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          {onRetry && <Button onClick={onRetry}>Retry</Button>}
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
