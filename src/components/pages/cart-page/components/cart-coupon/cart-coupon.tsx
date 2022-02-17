import {
  ChangeEvent,
  FormEvent,
  useMemo,
  useRef
} from 'react';
import { Coupon, FetchStatus } from 'constants/constants';
import { deleteSpaces } from 'utils/utils';
import {useAppDispatch, useAppSelector } from 'hooks';
import {
  postCoupon,
  selectCouponStatus,
  selectCouponValue,
  setCouponStatus,
  setCouponValue
} from 'features/cartSlice/cartSlice';

export default function CartCoupon(): JSX.Element {

  const couponStatus = useAppSelector(selectCouponStatus);

  const couponValue = useAppSelector(selectCouponValue);

  const couponRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const isCouponValueValid = useMemo(() => Object.values(Coupon)
    .some((coupon) => coupon === couponValue),
  [couponValue],
  );

  const handleCouponInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = deleteSpaces((evt.currentTarget.value).toLowerCase());
    dispatch(setCouponStatus(FetchStatus.Idle));
    dispatch(setCouponValue(inputValue));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isCouponValueValid) {
      dispatch(postCoupon(couponValue));
    }
    else {
      dispatch(setCouponStatus(FetchStatus.Error));
    }
  };

  const renderCouponStatusMessage = () => {
    if (couponStatus === FetchStatus.Idle || !couponValue) {
      return;
    }
    if (couponStatus === FetchStatus.Error) {
      return (
        <p className="form-input__message form-input__message--error">
          неверный промокод
        </p>
      );
    }
    if (couponStatus === FetchStatus.Complete) {
      return (
        <p className="form-input__message form-input__message--success">
            Промокод принят
        </p>
      );
    }
  };

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form
        onSubmit={handleSubmit}
        className="coupon__form"
        id="coupon-form"
        method="post"
        action="/"
      >
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            onChange={handleCouponInputChange}
            ref={couponRef}
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
            value={couponValue}
          />
          {renderCouponStatusMessage()}
        </div>
        <button className="button button--big coupon__button">
            Применить
        </button>
      </form>
    </div>
  );
}
