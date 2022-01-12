import { SortOrder, SortType } from 'constants/constants';
import { selectSorting } from 'features/catalogSlice/catalogSlice';
import { useAppSelector } from 'hooks';
import { SortState } from 'types/types';

type SortProps = {
  onSortingChange: (sorting: SortState) => void;
}

export default function Sorting(props: SortProps): JSX.Element {
  const { onSortingChange } = props;

  const sort = useAppSelector(selectSorting);

  const handleSortTypeChange = (sortType: SortType) => {
    onSortingChange({ type: sortType });
  };

  const handleSortOrderChange = (sortOrder: SortOrder) => {
    if (!sort?.type) {
      onSortingChange({ type: SortType.Price });
    }
    onSortingChange({ order: sortOrder });
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          onClick={() => handleSortTypeChange(SortType.Price)}
          className={
            `catalog-sort__type-button
            ${sort?.type===SortType.Price ? 'catalog-sort__type-button--active' : ''}`
          }
          aria-label="по цене"
          tabIndex={0}
          data-testid={SortType.Price}
        >
          по цене
        </button>
        <button
          onClick={() => handleSortTypeChange(SortType.Rating)}
          className={`catalog-sort__type-button ${sort?.type===SortType.Rating
            ? 'catalog-sort__type-button--active'
            : ''
          }`}
          tabIndex={0}
          aria-label="по популярности"
          data-testid={SortType.Rating}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={() => handleSortOrderChange(SortOrder.Asc)}
          className={`catalog-sort__order-button catalog-sort__order-button--up
          ${sort?.order===SortOrder.Asc ? 'catalog-sort__order-button--active' : ''}
          `}
          aria-label="По возрастанию"
          tabIndex={0}
          data-testid={SortOrder.Asc}
        >
        </button>
        <button
          onClick={() => handleSortOrderChange(SortOrder.Desc)}
          className={`catalog-sort__order-button catalog-sort__order-button--down
          ${sort?.order===SortOrder.Desc ? 'catalog-sort__order-button--active' : ''}
          `}
          aria-label="По убыванию"
          tabIndex={0}
          data-testid={SortOrder.Desc}
        >
        </button>
      </div>
    </div>
  );
}
