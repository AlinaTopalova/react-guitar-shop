import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  FilterSetAction,
  Guitar,
  PaginationState,
  SortState
} from 'types/types';
import {
  FetchStatus,
  ModalType,
  PAGE_SIZE
} from 'constants/constants';
import {
  fetchCatalog,
  selectData,
  selectFetchStatus,
  selectFilter,
  selectIsEmpty,
  selectPagination,
  selectSorting,
  selectTotalAmount,
  setFilter,
  setPagination,
  setSorting
} from 'features/catalogSlice/catalogSlice';
import Filters from 'components/filters/filters';
import GuitarCard from 'components/guitarCard/guitarCard';
import Pagination from 'components/pagination/pagination';
import Sorting from 'components/sorting/sorting';
import Loader from 'components/shared/loader/loader';
import ModalAddCart from 'components/shared/modal-add-cart/modal-add-cart';
import ModalAddSuccess from 'components/shared/modal-add-success/modal-add-success';

const CARDS_MAX_AMOUNT = 9;

export default function Catalog(): JSX.Element {

  const [activeGuitar, setActiveGuitar] = useState<Guitar | null>(null);

  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const catalogData = useAppSelector(selectData);

  const catalogFetchStatus = useAppSelector(selectFetchStatus);

  const catalogFilter = useAppSelector(selectFilter);

  const isCatalogEmpty = useAppSelector(selectIsEmpty);

  const catalogSorting = useAppSelector(selectSorting);

  const catalogPagination = useAppSelector(selectPagination);

  const totalCatalogItems = useAppSelector(selectTotalAmount);

  const dispatch = useAppDispatch();

  const handleBuyBtnClick = (guitar: Guitar) => {
    setActiveGuitar(guitar);
    setActiveModal(ModalType.ModalAddCart);
  };

  const handleAddCartBtnClick = () => {
    setActiveModal(ModalType.ModalAddSuccess);
  };

  const handleCloseBtnClick = () => {
    setActiveModal(null);
  };

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
  },
  [
    catalogFilter,
    catalogPagination,
    catalogSorting,
    dispatch,
  ],
  );

  useEffect(() => {
    document.body.style.overflow = (activeModal !== null) ? 'hidden' : 'auto';
  }, [activeModal]);

  return (
    <div className="catalog">
      {activeGuitar && (
        <>
          <ModalAddCart
            activeGuitar={activeGuitar}
            onClose={handleCloseBtnClick}
            modalType={activeModal}
            onClick={handleAddCartBtnClick}
          />
          <ModalAddSuccess
            modalType={activeModal}
            onClose={handleCloseBtnClick}
          />
        </>
      )}
      <Filters
        catalogFilter={catalogFilter}
        onFilterChange={handleFilterChange}
      />
      <Sorting
        onSortingChange={handleSortingChange}
      />
      {catalogFetchStatus === FetchStatus.Loading && <Loader />}
      {catalogFetchStatus === FetchStatus.Error && (
        <div>Произошла ошибка при загрузке каталога</div>
      )}
      {catalogFetchStatus === FetchStatus.Complete &&
      (isCatalogEmpty ? (
        <p>Нет подходящих по фильтрам гитар</p>
      ) : (
        <>
          <div className="cards catalog__cards">
            {catalogData.slice(0, CARDS_MAX_AMOUNT).map((guitar) => (
              <GuitarCard
                key={guitar.id}
                guitar={guitar}
                onClick={handleBuyBtnClick}
              />
            ))}
          </div>
          <Pagination
            onPageChange={handlePageChange}
            pagination={catalogPagination}
            size={PAGE_SIZE}
            total={totalCatalogItems}
          />
        </>
      ))}
    </div>
  );
}
