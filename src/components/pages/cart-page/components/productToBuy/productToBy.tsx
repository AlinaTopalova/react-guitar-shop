/* eslint-disable no-console */
import {ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  AppRoute,
  GuitarTypeName,
  MAX_GUITARS_AMOUNT,
  MIN_GUITARS_AMOUNT
} from 'constants/constants';
import { Guitar, GuitarToBuy } from 'types/types';
import { useAppDispatch } from 'hooks';
import {
  decrementGuitarInCart,
  setGuitarAmount,
  setGuitarInCart
} from 'features/cartSlice/cartSlice';

type ProductToBuyProps = {
  product: GuitarToBuy,
  onClick: (guitar: Guitar) => void,
}

export default function ProductToBuy(props: ProductToBuyProps): JSX.Element {
  const { product, onClick } = props;

  const dispatch = useAppDispatch();

  const handleDecrementBtnClick = (guitar: GuitarToBuy) => {
    if (guitar.amount > 1) {
      dispatch(decrementGuitarInCart(guitar.details));
    } else {
      onClick(guitar.details);
    }
  };

  const handleAmountInputChanghe = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = (evt.currentTarget.value).substring(0,2);
    dispatch(setGuitarAmount(
      {
        amount: Number(inputValue),
        details: product.details,
      },
    ));
  };

  const handleAmountInputBlur = () => {
    if (product.amount < 1) {
      dispatch(setGuitarAmount(
        {
          amount: Number(MIN_GUITARS_AMOUNT),
          details: product.details,
        },
      ));
    }
  };

  return (
    <div key={product.details.id} className="cart-item">
      <button
        onClick={() => onClick(product.details)}
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img
          src={`/${product.details.previewImg}`}
          width="55"
          height="130"
          alt={product.details.name}
        />
      </div>
      <div className="product-info cart-item__info">
        <Link to={`${AppRoute.Guitar}/${product.details.id}`}>
          <p className="product-info__title">{product.details.name}</p>
        </Link>
        <p className="product-info__info">Артикул: {product.details.vendorCode}</p>
        <p className="product-info__info">
          {GuitarTypeName[product.details.type]}, {product.details.stringCount} струнная
        </p>
      </div>
      <div className="cart-item__price">{product.details.price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          onClick={() => handleDecrementBtnClick(product)}
          className="quantity__button"
          aria-label="Уменьшить количество"
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          onChange={handleAmountInputChanghe}
          onBlur={handleAmountInputBlur}
          className="quantity__input"
          type="number"
          placeholder={product.amount.toString()}
          min={MIN_GUITARS_AMOUNT}
          max={MAX_GUITARS_AMOUNT}
          value={product.amount.toString()}
        />
        <button
          onClick={() => dispatch(setGuitarInCart(product.details))}
          className="quantity__button"
          aria-label="Увеличить количество"
          style={{ pointerEvents: product.amount === MAX_GUITARS_AMOUNT ? 'none' : 'auto' }}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">
        {product.amount * product.details.price} ₽
      </div>
    </div>
  );
}
