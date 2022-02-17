import 'dayjs/locale/ru';
import { useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { getFormatDate } from 'utils/utils';
import { Comment } from 'types/types';
import { STARS_MAX_AMOUNT } from 'constants/constants';

type ReviewsProps = {
  onClick: () => void,
  reviews: Comment[],
}

const MAX_REVIEWS_AMOUNT = 3;

const stars = Array.from({length: STARS_MAX_AMOUNT});

export default function Reviews(props: ReviewsProps): JSX.Element {
  const { onClick, reviews } = props;

  const [
    numberOfReviewsShown,
    setNumberOfReviewsShown,
  ] = useState<number>(MAX_REVIEWS_AMOUNT);

  const sortedReviews = useMemo(() =>
    [...reviews].sort((a, b) =>
      Date.parse(b.createAt) - Date.parse(a.createAt)),
  [reviews]);

  const handleButtonUpClick  = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    window.scrollTo(0,0);
  };

  const handleNewReviewButtonClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    onClick();
  };

  const handleButtonShowMoreClick = () => {
    if (numberOfReviewsShown + MAX_REVIEWS_AMOUNT <= reviews.length) {
      setNumberOfReviewsShown(numberOfReviewsShown + MAX_REVIEWS_AMOUNT);
    } else {
      setNumberOfReviewsShown(reviews.length);
    }
  };

  return (
    <section className="reviews" data-testid='reviews-section'>
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        onClick={handleNewReviewButtonClick}
        className="button button--red-border button--big reviews__sumbit-button"
        href="/"
      >
        Оставить отзыв
      </a>
      {sortedReviews.slice(0, numberOfReviewsShown).map((review) => (
        <div key={nanoid()} className="review">
          <div className="review__wrapper">
            <h4 className="review__title review__title--author title title--lesser">
              {review.userName}
            </h4>
            <span className="review__date">{getFormatDate(review.createAt)}</span>
          </div>
          <div className="rate review__rating-panel" aria-hidden="true">
            <span className="visually-hidden">Рейтинг:</span>
            {stars.map((_, index: number) => (
              <svg key={index.toString()} width="12" height="11" aria-hidden="true">
                <use
                  xlinkHref={index < Math.floor(review.rating)
                    ? '#icon-full-star'
                    : '#icon-star'}
                >
                </use>
              </svg>
            ))}
            <span className="rate__count"></span>
            <span className="rate__message"></span>
          </div>
          <h4 className="review__title title title--lesser">Достоинства:</h4>
          <p className="review__value">{review.advantage}</p>
          <h4 className="review__title title title--lesser">Недостатки:</h4>
          <p className="review__value">{review.disadvantage}</p>
          <h4 className="review__title title title--lesser">Комментарий:</h4>
          <p className="review__value">{review.comment}</p>
        </div>
      ))}
      {!(numberOfReviewsShown >= reviews.length) && (
        <button
          onClick={handleButtonShowMoreClick}
          className="button button--medium reviews__more-button"
        >
        Показать еще отзывы
        </button>
      )}
      <a
        onClick={handleButtonUpClick}
        className="button button--up button--red-border button--big reviews__up-button"
        href="/"
      >
        Наверх
      </a>
    </section>
  );
}
