import { FetchStatus, FilterType } from 'constants/constants';
import
reducer,
{
  setFilter,
  setSorting,
  setPagination,
  fetchCatalog
} from './catalogSlice';
import { guitarsList } from 'mock';

describe('CatalogSlice', () => {

  const defaultPagination = {start: 0, end: 9};
  const previousState = {
    data: [],
    fetchStatus: FetchStatus.Idle,
    filterState: undefined,
    sortingState: undefined,
    isEmpty: false,
    paginationState: defaultPagination,
    totalAmount: undefined,
  };

  it('should return filters state', () => {

    expect(reducer(previousState,
      setFilter({field: 'type', type: FilterType.Equals, value: '4'})))
      .toEqual(
        {
          data: [],
          fetchStatus: FetchStatus.Idle,
          filterState: {
            'type': {
              type: FilterType.Equals,
              value: '4',
            },
          },
          sortingState: undefined,
          isEmpty: false,
          paginationState: defaultPagination,
          totalAmount: undefined,
        },
      );
  });

  it('should return sort state', () => {

    expect(reducer(previousState, setSorting({type: 'price', order: 'asc'})))
      .toEqual(
        {
          data: [],
          fetchStatus: FetchStatus.Idle,
          filterState: undefined,
          sortingState: {type: 'price', order: 'asc'},
          isEmpty: false,
          paginationState: defaultPagination,
          totalAmount: undefined,
        },
      );
  });

  it('should return pagination state', () => {

    expect(reducer(previousState, setPagination({start: 10, end: 16})))
      .toEqual(
        {
          data: [],
          fetchStatus: FetchStatus.Idle,
          filterState: undefined,
          sortingState: undefined,
          isEmpty: false,
          paginationState: {start: 10, end: 16},
          totalAmount: undefined,
        },
      );
  });
});

describe('catalogSlice', () => {
  describe('extrareducers', () => {

    const defaultPagination = {start: 0, end: 9};
    const initialState = {
      data: [],
      fetchStatus: FetchStatus.Idle,
      filterState: undefined,
      sortingState: undefined,
      isEmpty: false,
      paginationState: defaultPagination,
      totalAmount: undefined,
    };

    it('sets fetchStatus loading when fetchList is pending', () => {

      const action = { type: fetchCatalog.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        data: [],
        fetchStatus: FetchStatus.Loading,
        filterState: undefined,
        sortingState: undefined,
        isEmpty: false,
        paginationState: defaultPagination,
        totalAmount: undefined,
      });
    });

    it('sets the data and totalAmount when fetchList is fulfilled', () => {

      const action = {
        type: fetchCatalog.fulfilled.type,
        payload: { data: guitarsList, total: 27},
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        data: guitarsList,
        fetchStatus: FetchStatus.Complete,
        filterState: undefined,
        sortingState: undefined,
        isEmpty: false,
        paginationState: defaultPagination,
        totalAmount: 27,
      });
    });

    it('sets fetchStatus Error when fetchCatalog is rejected', () => {

      const action = {
        type: fetchCatalog.rejected.type,
        payload: { error: 'some error' },
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        data: [],
        fetchStatus: FetchStatus.Error,
        filterState: undefined,
        sortingState: undefined,
        isEmpty: false,
        paginationState: defaultPagination,
        totalAmount: undefined,
      });
    });
  });
});
