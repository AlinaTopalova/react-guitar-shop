import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from 'features/catalogSlice/catalogSlice';
import searchReducer from 'features/searchSlice/searchSlice';
import priceReducer from 'features/priceSlice/priceSlice';
import guitarSlice from 'features/guitarSlice/guitarSlice';
import cartSlice from 'features/cartSlice/cartSlice';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    price: priceReducer,
    search: searchReducer,
    guitar: guitarSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
