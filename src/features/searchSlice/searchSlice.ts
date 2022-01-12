import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSimilarGuitars } from 'api';
import { RootState } from 'store';
import { Guitar } from 'types/types';

type State = {
  searchValue: string,
  similarGuitars: Guitar[],
};

const initialState: State = {
  searchValue: '',
  similarGuitars: [],
};

export const fetchGuitars = createAsyncThunk(
  'search/fetchSimilarGuitars',
  async (searchValue: string) => {
    const { data } = await fetchSimilarGuitars(searchValue);
    return data;
  },
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    loadSimilarGuitars: (state, action: PayloadAction<Guitar[]>) => {
      state.similarGuitars = action.payload;
    },
    clearSimilarGuitars: (state) => {
      state.similarGuitars = initialState.similarGuitars;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuitars.fulfilled, (state, action) => {
        const data = action.payload;
        state.similarGuitars = data;
      });
  },
});

export const {
  setSearchValue,
  loadSimilarGuitars,
  clearSimilarGuitars,
} = searchSlice.actions;

export const selectSearchValue = (state: RootState) => state.search.searchValue;

export const selectSimilarGuitars = (state: RootState) => state.search.similarGuitars;

export default searchSlice.reducer;
