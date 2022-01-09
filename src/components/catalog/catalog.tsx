/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useEffect } from 'react';
import { FilterSetAction, PaginationState, SortState } from 'types/types';
import { PAGE_SIZE } from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks';
import Filters from 'components/filters/filters';
import GuitarCard from 'components/guitarCard/guitarCard';
import Pagination from 'components/pagination/pagination';
import Sorting from 'components/sorting/sorting';
import {
  fetchCatalog,
  selectData,
  selectFilter,
  selectPagination,
  selectSorting,
  selectTotalAmount,
  setFilter,
  setPagination,
  setSorting
} from 'features/catalog/catalogSlice';

const CARDS_MAX_AMOUNT = 9;

export default function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();

  const catalogData = useAppSelector(selectData);

  //const catalogFetchStatus = useAppSelector(selectFetchStatus);

  const catalogFilter = useAppSelector(selectFilter);

  const catalogSorting = useAppSelector(selectSorting);

  const catalogPagination = useAppSelector(selectPagination);

  const totalCatalogItems = useAppSelector(selectTotalAmount);

  const handleSortingChange = useCallback(
    (newSorting: SortState) => {
      dispatch(setSorting(newSorting));
    },
    [dispatch],
  );

  const handleFilterChange = useCallback(
    (newFilter: FilterSetAction) => {
      dispatch(setFilter(newFilter));
    },
    [dispatch],
  );

  const handlePageChange = useCallback(
    (newPagination: PaginationState) => {
      dispatch(setPagination(newPagination));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(
      fetchCatalog({
        filter: catalogFilter,
        sorting: catalogSorting,
        pagination: catalogPagination,
      }),
    );
  }, [catalogFilter, catalogPagination, catalogSorting, dispatch]);

  return (
    <div className="catalog">
      <Filters
        catalogFilter={catalogFilter}
        onFilterChange={handleFilterChange}
      />
      <Sorting onSortingChange={handleSortingChange}/>
      <div className="cards catalog__cards">
        {catalogData.slice(0, CARDS_MAX_AMOUNT).map((guitar) => (
          <GuitarCard key={guitar.id} guitar={guitar} />
        ))}
      </div>
      <Pagination
        onPageChange={handlePageChange}
        pagination={catalogPagination}
        size={PAGE_SIZE}
        total={totalCatalogItems!}
      />
    </div>
  );
}
