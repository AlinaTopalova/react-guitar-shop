import { FetchStatus } from 'constants/constants';
import reducer, { fetchPrice } from './priceSlice';

describe('priceSlice', () => {
  describe('extraReducers', () => {

    const initialState = {
      priceFetchStatus: FetchStatus.Idle,
      minPrice: 0,
      maxPrice: 0,
    };

    it('sets fetchStatus loading when fetchPrice is pending', () => {

      const action = { type: fetchPrice.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        priceFetchStatus: FetchStatus.Loading,
        minPrice: 0,
        maxPrice: 0,
      });
    });

    it('sets the minPrice and maxPrice when fetchPrice is fulfilled', () => {

      const action = {
        type: fetchPrice.fulfilled.type,
        payload: { maxPrice: 30000, minPrice: 8000 },
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        priceFetchStatus: FetchStatus.Complete,
        maxPrice: 30000,
        minPrice: 8000,
      });
    });

    it('sets fetchStatus Error when fetchPrice is rejected', () => {

      const action = {
        type: fetchPrice.rejected.type,
        payload: { error: 'some error' },
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        priceFetchStatus: FetchStatus.Error,
        maxPrice: 0,
        minPrice: 0,
      });
    });
  });
});
