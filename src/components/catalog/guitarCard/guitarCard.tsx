import { nanoid } from 'nanoid';
import { Guitar } from 'types/guitar';

const STARS_MAX_AMOUNT = 5;

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
          {stars.map((star, index) => {
            if (index < Math.floor(guitar.rating)) {
              return (
                <svg key={nanoid()} width="12" height="11" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
              );
            }
            else {
              return (
                <svg key={nanoid()} width="12" height="11" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              );
            }
          })}
          <span className="rate__count">{guitar.rating}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{guitar.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="/">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="/">Купить</a>
      </div>
    </div>
  );
}
