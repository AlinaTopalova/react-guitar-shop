import { v4 as uuidv4 } from 'uuid';
import { PaginationState } from 'types/types';

type PaginationProps = {
  onPageChange: (paginationState: PaginationState) => void,
  pagination: PaginationState,
  size: number,
  total: number,
}

export default function Pagination(props: PaginationProps): JSX.Element {
  const { onPageChange, pagination, size, total } = props;

  const totalPages = Math.ceil(total / size);

  const currentPage = Math.ceil(pagination.end / size);

  const handlePageChange = (pageNum: number) => {
    onPageChange({
      end: size * (pageNum - 1) + size,
      start: size * (pageNum - 1),
    });
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage !== 1 && (
          <li
            onClick={(evt) => {
              evt.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            className="pagination__page pagination__page--prev"
          >
            <a className="link pagination__page-link" href="1">Назад</a>
          </li>
        )}
        {Array.from({length: totalPages}).map((_, idx) => {
          const pageNum = idx + 1;
          const isActive =currentPage === pageNum;
          return (
            <li
              key={uuidv4()}
              className={`pagination__page ${isActive ? 'pagination__page--active' : ''}`}
              onClick={(evt) => {
                evt.preventDefault();
                handlePageChange(pageNum);
              }}
            >
              <a className="link pagination__page-link" href="1">{pageNum}</a>
            </li>
          );
        })}
        {currentPage !== totalPages && (
          <li
            onClick={(evt) => {
              evt.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            className="pagination__page pagination__page--next"
            id="next"
          >
            <a className="link pagination__page-link" href="2">Далее</a>
          </li>
        )}
      </ul>
    </div>
  );
}
