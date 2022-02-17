import { FetchStatus } from 'constants/constants';
import { guitarMock } from 'mock';
import reducer, { decrementGuitarInCart, deleteGuitarInCart, postCoupon, setCouponValue, setGuitarInCart } from './cartSlice';

describe('CartSlice', () => {

  const initialState = {
    goods: {},
    couponValue: '',
    discount: 0,
    couponStatus: FetchStatus.Idle,
  };

  it('should return goods state correctly', () => {

    expect(reducer(initialState,
      setGuitarInCart(guitarMock)))
      .toEqual(
        {
          goods: {
            [guitarMock.id]: {
              amount: 1,
              details: guitarMock,
            },
          },
          couponValue: '',
          discount: 0,
          couponStatus: FetchStatus.Idle,
        },
      );
  });

  it('should return couponValue state correctly', () => {

    expect(reducer(initialState,
      setCouponValue('тратата')))
      .toEqual(
        {
          goods: {},
          couponValue: 'тратата',
          discount: 0,
          couponStatus: FetchStatus.Idle,
        },
      );
  });

  it('should delete guitar from goods', () => {
    const prevState = {
      goods: {
        [guitarMock.id]: {
          amount: 1,
          details: guitarMock,
        },
      },
      couponValue: '',
      discount: 0,
      couponStatus: FetchStatus.Idle,
    };

    expect(reducer(prevState,
      deleteGuitarInCart(guitarMock)))
      .toEqual(
        {
          goods: {},
          couponValue: '',
          discount: 0,
          couponStatus: FetchStatus.Idle,
        },
      );
  });

  it('should set guitars correctly', () => {
    const prevState = {
      goods: {
        [guitarMock.id]: {
          amount: 1,
          details: guitarMock,
        },
      },
      couponValue: '',
      discount: 0,
      couponStatus: FetchStatus.Idle,
    };

    expect(reducer(prevState,
      setGuitarInCart(guitarMock)))
      .toEqual(
        {
          goods: {
            [guitarMock.id]: {
              amount: 2,
              details: guitarMock,
            },
          },
          couponValue: '',
          discount: 0,
          couponStatus: FetchStatus.Idle,
        },
      );
  });

  it('should decrement amount guitars correctly', () => {
    const prevState = {
      goods: {
        [guitarMock.id]: {
          amount: 2,
          details: guitarMock,
        },
      },
      couponValue: '',
      discount: 0,
      couponStatus: FetchStatus.Idle,
    };

    expect(reducer(prevState,
      decrementGuitarInCart(guitarMock)))
      .toEqual(
        {
          goods: {
            [guitarMock.id]: {
              amount: 1,
              details: guitarMock,
            },
          },
          couponValue: '',
          discount: 0,
          couponStatus: FetchStatus.Idle,
        },
      );
  });
});

describe('catalogSlice', () => {
  describe('extrareducers', () => {

    const initialState = {
      goods: {},
      couponValue: '',
      discount: 0,
      couponStatus: FetchStatus.Idle,
    };

    it('sets the data and totalAmount when fetchList is fulfilled', () => {

      const action = {
        type: postCoupon.fulfilled.type,
        payload: 27,
      };
      const state = reducer(initialState, action);

      expect(state).toEqual(
        {
          goods: {},
          couponValue: '',
          discount: 27,
          couponStatus: FetchStatus.Complete,
        },
      );
    });
  });
});
