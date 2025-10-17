import Button from "../button/Button";
import style from "./Pagination.module.scss";

type Props = {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPage }: Props) {
  if (!totalPages) return null;

  const toPrev = () => onPage(Math.max(1, page - 1));
  const toNext = () => onPage(Math.min(totalPages, page + 1));

  return (
    <nav className={style.pagination}>
      <Button variant="secondary" onClick={toPrev} disabled={page === 1}>
        Prev
      </Button>
      <span>
        {page} / {totalPages}
      </span>
      <Button variant="secondary" onClick={toNext} disabled={page === totalPages}>
        Prev
      </Button>
    </nav>
  );
}
