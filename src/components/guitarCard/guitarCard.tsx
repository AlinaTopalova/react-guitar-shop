import { AppRoute, STARS_MAX_AMOUNT } from 'constants/constants';
import { selectGuitarsInCart } from 'features/cartSlice/cartSlice';
import { useAppSelector } from 'hooks';
import { Link } from 'react-router-dom';
import { Guitar } from 'types/types';

const stars = Array.from({length: STARS_MAX_AMOUNT});

type GuitarCardProps = {
  guitar: Guitar,
  onClick: (guitar: Guitar) => void,
}

export default function GuitarCard(props: GuitarCardProps): JSX.Element {
  const { guitar, onClick } = props;

  const guitarsInCart = useAppSelector(selectGuitarsInCart);

  const isGuitarInCart = (guitar.id in guitarsInCart);

  return (
    <div className="product-card">
      <img src={guitar.previewImg} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          {stars.map((_, index) => (
            <svg key={index.toString()} width="12" height="11" aria-hidden="true">
              <use xlinkHref={index < Math.floor(guitar.rating)
                ? '#icon-full-star'
                : '#icon-star'}
              >
              </use>
            </svg>
          ))}
          <span className="rate__count">{guitar.comments?.length}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link
          to={`${AppRoute.Guitar}/${guitar.id}`}
          className="button button--mini"
        >
          Подробнее
        </Link>
        {!isGuitarInCart ? (
          <a
            onClick={(evt) => {
              evt.preventDefault();
              onClick(guitar);
            }}
            className="button button--red button--mini button--add-to-cart"
            href="/"
          >
            Купить
          </a>
        ) : (
          <Link to={AppRoute.Cart}
            className="button button--red-border button--mini button--in-cart"
            href="/"
          >
            В Корзине
          </Link>
        )}
      </div>
    </div>
  );
}
