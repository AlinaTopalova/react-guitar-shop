import { AppRoute, STARS_MAX_AMOUNT } from 'constants/constants';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { Guitar } from 'types/types';

const stars = Array.from({length: STARS_MAX_AMOUNT});

type GuitarCardProps = {
  guitar: Guitar,
}

export default function GuitarCard(props: GuitarCardProps): JSX.Element {
  const { guitar } = props;

  return (
    <div className="product-card">
      <img src={guitar.previewImg} width="75" height="190" alt={guitar.name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          {stars.map((star, index) => (
            <svg key={nanoid()} width="12" height="11" aria-hidden="true">
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
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link
          to={`${AppRoute.Guitar}/${guitar.id}`}
          className="button button--mini"
        >
          Подробнее
        </Link>
        <a
          className="button button--red button--mini button--add-to-cart"
          href="/"
        >
          Купить
        </a>
      </div>
    </div>
  );
}
