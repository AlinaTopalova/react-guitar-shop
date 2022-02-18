import {
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import {
  FetchStatus,
  INITIAL_DISCOUNT,
  // MAX_GUITARS_AMOUNT,
  MIN_GUITARS_AMOUNT
} from 'constants/constants';
import { Cart, Guitar, GuitarToBuy } from 'types/types';
import { RootState } from 'store';
import { postNewCoupon } from 'api';

type State = {
  goods: Cart,
  couponValue: string,
  discount: number,
  couponStatus: FetchStatus,
}

const initialState: State = {
  goods: {},
  couponValue: '',
  discount: INITIAL_DISCOUNT,
  couponStatus: FetchStatus.Idle,
};

export const postCoupon = createAsyncThunk(
  'cart/postCoupon',
  async (coupon: string) => {
    const { data } = await postNewCoupon({coupon: coupon});
    return data;
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setGuitarInCart: (state, action: PayloadAction<Guitar>) => {
      const guitarId = action.payload.id;

      if (!(guitarId in state.goods)) {
        state.goods[guitarId] = {
          amount: MIN_GUITARS_AMOUNT,
          details: action.payload,
        };
      }
      else {
        state.goods[guitarId].amount = state.goods[guitarId].amount + MIN_GUITARS_AMOUNT;
      }
    },
    decrementGuitarInCart: (state, action: PayloadAction<Guitar>) => {
      const guitarId = action.payload.id;

      if (state.goods[guitarId].amount > MIN_GUITARS_AMOUNT) {
        state.goods[guitarId].amount = state.goods[guitarId].amount - MIN_GUITARS_AMOUNT;
      } else {
        delete state.goods[guitarId];
      }
    },
    setGuitarAmount: (state, action: PayloadAction<GuitarToBuy>) => {
      const guitarId = action.payload.details.id;
      const amount = action.payload.amount;

      state.goods[guitarId].amount = amount;
    },
    deleteGuitarInCart: (state, action: PayloadAction<Guitar>) => {
      delete state.goods[action.payload.id];
    },
    setCouponValue: (state, action: PayloadAction<string>) => {
      state.couponValue = action.payload;
    },
    setCouponStatus: (state, action: PayloadAction<FetchStatus>) => {
      state.couponStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCoupon.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.couponStatus = FetchStatus.Complete;
      });
  },
});

export const {
  setGuitarInCart,
  decrementGuitarInCart,
  deleteGuitarInCart,
  setCouponValue,
  setGuitarAmount,
  setCouponStatus,
} = cartSlice.actions;

export const selectGuitarsInCart = (state: RootState) =>
  state.cart.goods;

export const selectCouponValue = (state: RootState) =>
  state.cart.couponValue;

export const selectDiscount = (state: RootState) =>
  state.cart.discount;

export const selectCouponStatus = (state: RootState) =>
  state.cart.couponStatus;

export default cartSlice.reducer;
