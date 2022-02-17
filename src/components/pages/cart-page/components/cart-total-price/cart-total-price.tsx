import { selectDiscount } from 'features/cartSlice/cartSlice';
import { Cart } from 'types/types';
import { useAppSelector } from 'hooks';
import { getDiscountPercent, getSumOfGoods } from 'utils/utils';

type CartTotalPriceProps = {
  guitars: Cart,
}

export default function CartTotalPrice(props: CartTotalPriceProps): JSX.Element {
  const { guitars } = props;

  const sumOfGoods = getSumOfGoods(guitars);

  const discount = useAppSelector(selectDiscount);

  const discountPersent = getDiscountPercent(discount);

  return (
    <div className="cart__total-info">
      <p className="cart__total-item">
        <span className="cart__total-value-name">Всего:</span>
        <span className="cart__total-value">{sumOfGoods} ₽</span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">Скидка:</span>
        {(sumOfGoods && discount) > 0 ? (
          <span className="cart__total-value cart__total-value--bonus">
              - {Math.round(sumOfGoods * discountPersent)} ₽
          </span>
        ) : (
          <span className="cart__total-value">0 ₽</span>
        )}
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">К оплате:</span>
        <span className="cart__total-value cart__total-value--payment">
          {sumOfGoods - Math.round(sumOfGoods * discountPersent)} ₽
        </span>
      </p>
      <button className="button button--red button--big cart__order-button">
          Оформить заказ
      </button>
    </div>
  );
}
