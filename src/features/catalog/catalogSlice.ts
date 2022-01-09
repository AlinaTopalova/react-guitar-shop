import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import qs from 'qs';
import { fetchGuitars } from 'api';
import { PAGE_SIZE, PAGINATION_START, SortQuery } from 'constants/constants';
import { RootState } from 'store';
import {
  FetchStatus,
  FilterSetAction,
  FilterState,
  FilterType,
  Guitar,
  OperatorQuery,
  PaginationQuery,
  PaginationState,
  SortState
} from 'types/types';
import { browserHistory } from 'browser-history';

type State = {
  data: Guitar[];
  fetchStatus: FetchStatus;
  filterState?: FilterState;
  sortingState: SortState;
  isEmpty: boolean;
  paginationState: PaginationState;
  totalAmount?: number;
};

const { filter: initialFilter, pagination: initialPagination } = qs.parse(
  browserHistory.location.search,
  {
    ignoreQueryPrefix: true,
  },
);

const defaultPagination = {
  start: PAGINATION_START,
  end: PAGINATION_START + PAGE_SIZE,
};

const initialState: State = {
  data: [],
  fetchStatus: FetchStatus.Idle,
  filterState: initialFilter as FilterState | undefined,
  sortingState: undefined,
  isEmpty: false,
  paginationState: (initialPagination as PaginationState | undefined) || defaultPagination,
  totalAmount: undefined,
};

export const fetchCatalog = createAsyncThunk(
  'catalog/fetchCatalog',
  async (params: { filter?: FilterState; sorting?: SortState; pagination: PaginationState }) => {
    const { filter, sorting, pagination } = params;

    browserHistory.replace({ search: qs.stringify(params) });

    const query = new URLSearchParams({
      [PaginationQuery.Start]: pagination.start.toString(),
      [PaginationQuery.End]: pagination.end.toString(),
    });

    if (filter) {
      Object.entries(filter).forEach(([field, { value }]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => query.append(field, val));
          return;
        }
        query.append(field, value);
      });
    }

    if (sorting?.type) {
      query.append(SortQuery.Sort, sorting.type);
    }

    if (sorting?.order) {
      query.append(SortQuery.Order, sorting.order);
    }

    const { data, headers } = await fetchGuitars(query);

    return { data, total: Number(headers['x-total-count']) };
  },
);

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterSetAction>) => {
      const { field, type, value } = action.payload;
      const newFilterState = { ...state.filterState };
      let fieldName: string;

      switch (type) {
        case FilterType.RangeFrom:
          fieldName = `${field}${OperatorQuery.Gte}`;
          break;
        case FilterType.RangeTo:
          fieldName = `${field}${OperatorQuery.Lte}`;
          break;
        default:
          fieldName = field;
      }

      if (value.length === 0) {
        delete newFilterState[fieldName];
      } else {
        newFilterState[fieldName] = { type, value };
      }

      state.filterState = newFilterState;
      state.paginationState = defaultPagination;
    },
    setPagination: (state, action: PayloadAction<PaginationState>) => {
      state.paginationState = action.payload;
    },
    setSorting: (state, action: PayloadAction<SortState>) => {
      state.sortingState = {...state.sortingState, ...action.payload};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.fetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        const { data, total } = action.payload;
        state.data = data;
        state.fetchStatus = FetchStatus.Complete;
        state.totalAmount = total;
        state.isEmpty = data.length === 0;
      })
      .addCase(fetchCatalog.rejected, (state) => {
        state.fetchStatus = FetchStatus.Error;
      });
  },
});

export const {
  setFilter,
  setPagination,
  setSorting,
} = catalogSlice.actions;

export const selectData = (state: RootState) => state.catalog.data;

export const selectFetchStatus = (state: RootState) =>
  state.catalog.fetchStatus;

export const selectFilter = (state: RootState) => state.catalog.filterState;

export const selectIsEmpty = (state: RootState) => state.catalog.isEmpty;

export const selectPagination = (state: RootState) =>
  state.catalog.paginationState;

export const selectSorting = (state: RootState) =>
  state.catalog.sortingState;

export const selectTotalAmount = (state: RootState) =>
  state.catalog.totalAmount;

export default catalogSlice.reducer;
