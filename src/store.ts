import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from 'features/catalog/catalogSlice';
import searchReducer from 'features/search/searchSlice';
import priceReducer from 'features/price/priceSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    price: priceReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
