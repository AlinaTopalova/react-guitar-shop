import { SortByOrder } from 'constants/constants';
import { selectSorting } from 'features/catalog/catalogSlice';
import { useAppSelector } from 'hooks';
import { SortState } from 'types/data';
import { SortByType } from 'types/sorting';

type SortProps = {
  onSortingChange: (sorting: SortState) => void;
}

export default function Sorting(props: SortProps): JSX.Element {
  const { onSortingChange } = props;

  const sort = useAppSelector(selectSorting);

  const handleSortTypeChange = (sortType: SortByType) => {
    onSortingChange({ type: sortType });
  };

  const handleSortOrderChange = (sortOrder: SortByOrder) => {
    if (!sort?.type) {
      onSortingChange({ type: SortByType.Price });
    }
    onSortingChange({ order: sortOrder });
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          onClick={() => handleSortTypeChange(SortByType.Price)}
          className={
            `catalog-sort__type-button
            ${sort?.type===SortByType.Price ? 'catalog-sort__type-button--active' : ''}`
          }
          aria-label="по цене"
          tabIndex={0}
        >
          по цене
        </button>
        <button
          onClick={() => handleSortTypeChange(SortByType.Rating)}
          className={`catalog-sort__type-button ${sort?.type===SortByType.Rating
            ? 'catalog-sort__type-button--active'
            : ''
          }`}
          tabIndex={0}
          aria-label="по популярности"
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          onClick={() => handleSortOrderChange(SortByOrder.Asc)}
          className={`catalog-sort__order-button catalog-sort__order-button--up
          ${sort?.order===SortByOrder.Asc ? 'catalog-sort__order-button--active' : ''}
          `}
          aria-label="По возрастанию"
          tabIndex={0}
        >
        </button>
        <button
          onClick={() => handleSortOrderChange(SortByOrder.Desc)}
          className={`catalog-sort__order-button catalog-sort__order-button--down
          ${sort?.order===SortByOrder.Desc ? 'catalog-sort__order-button--active' : ''}
          `}
          aria-label="По убыванию"
          tabIndex={0}
        >
        </button>
      </div>
    </div>
  );
}
