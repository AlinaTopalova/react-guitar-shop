import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchGuitars } from 'api';
import { RootState } from 'store';
import { FetchStatus, PaginationQuery, SortOrder, SortQuery } from 'types/types';

type State = {
  priceFetchStatus: FetchStatus,
  minPrice: number,
  maxPrice: number,
}

const initialState: State = {
  priceFetchStatus: FetchStatus.Idle,
  minPrice: 0,
  maxPrice: 0,
};

export const fetchPrice = createAsyncThunk(
  'price/fetchPrice',
  async () => {
    const maxPriceQuery = new URLSearchParams({
      [SortQuery.Sort]: 'price',
      [SortQuery.Order]: SortOrder.Desc,
      [PaginationQuery.Start]: '0',
      [PaginationQuery.End]: '1',
    });
    const minPriceQuery = new URLSearchParams({
      [SortQuery.Sort]: 'price',
      [SortQuery.Order]: SortOrder.Asc,
      [PaginationQuery.Start]: '0',
      [PaginationQuery.End]: '1',
    });

    const [maxPriceRes, minPriceRes] = await Promise.all([
      fetchGuitars(maxPriceQuery),
      fetchGuitars(minPriceQuery),
    ]);

    const [{ price: maxPrice }] = maxPriceRes.data;

    const [{ price: minPrice }] = minPriceRes.data;

    return { maxPrice, minPrice };
  },
);

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrice.pending, (state) => {
        state.priceFetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchPrice.fulfilled, (state, action) => {
        const { maxPrice, minPrice } = action.payload;
        state.priceFetchStatus = FetchStatus.Complete;
        state.maxPrice = maxPrice;
        state.minPrice = minPrice;
      })
      .addCase(fetchPrice.rejected, (state) => {
        state.priceFetchStatus = FetchStatus.Error;
      });
  },
});

export const selectPriceFetchStatus = (state: RootState) => state.price.priceFetchStatus;

export const selectMaxPrice = (state: RootState) => state.price.maxPrice;

export const selectMinPrice = (state: RootState) => state.price.minPrice;

export default priceSlice.reducer;
