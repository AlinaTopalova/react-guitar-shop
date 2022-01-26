
import { FormEvent, Fragment, useRef, useState } from 'react';
import { useAppDispatch } from 'hooks';
import { postReview } from 'features/guitarSlice/guitarSlice';
import { Guitar } from 'types/types';
import { ModalType, Ratings } from 'constants/constants';
import Modal from 'components/shared/modal/modal';

type ModalReviewsProps = {
  currentGuitar: Guitar,
  onClose: () => void,
  modalType: ModalType | null,
}

export default function ModalReview(props: ModalReviewsProps): JSX.Element {
  const { currentGuitar, onClose, modalType } = props;

  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement | null>(null);

  const [ rateCount, setRateCount ] = useState<string>('');

  const [ userName, setUserName ] = useState<string>('');

  const [ advantage, setAdvantage ] = useState<string>('-');

  const [ disadvantage, setDisadvantage ] = useState<string>('-');

  const [ comment, setComment ] = useState<string>('-');

  const handleNameInputChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setUserName(evt.target.value);

  const handleAdvantageInputChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setAdvantage(evt.target.value);

  const handleDisadvantageInputChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
    setDisadvantage(evt.target.value);

  const handleCommentInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) =>
    setComment(evt.target.value);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postReview(
      {
        guitarId: currentGuitar.id,
        userName,
        advantage,
        disadvantage,
        comment,
        rating: Number(rateCount),
      },
    ));
    onClose();
    formRef.current?.reset();
  };

  const handleCloseButtonClick = () => {
    onClose();
    formRef.current?.reset();
  };

  return (
    <div
      className={`modal modal--review ${modalType === ModalType.ModalNewReview ? 'is-active' : ''}`}
    >
      <Modal onClose={handleCloseButtonClick}>
        <h2 className="modal__header modal__header--review title title--medium">
          Оставить отзыв
        </h2>
        <h3 className="modal__product-name title title--medium-20 title--uppercase">
          {currentGuitar.name}
        </h3>
        <form ref={formRef} onSubmit={handleSubmit} className="form-review">
          <div className="form-review__wrapper">
            <div className="form-review__name-wrapper">
              <label
                className="form-review__label form-review__label--required"
                htmlFor="user-name"
              >
                Ваше Имя
              </label>
              <input
                onChange={handleNameInputChange}
                className="form-review__input form-review__input--name"
                id="user-name"
                type="text"
                autoComplete="off"
                required
              />
              {!userName && (
                <span className="form-review__warning">Заполните поле</span>
              )}
            </div>
            <div>
              <span className="form-review__label form-review__label--required">Ваша Оценка</span>
              <div className="rate rate--reverse">
                {Ratings.map(({ title, value }) => (
                  <Fragment key={value}>
                    <input
                      onChange={() => setRateCount(value)}
                      className="visually-hidden"
                      type="radio"
                      id={`star-${value}`}
                      name="rate"
                      value={value}
                      required
                    />
                    <label
                      key={title}
                      className="rate__label"
                      htmlFor={`star-${value}`}
                      title={title}
                      tabIndex={0}
                    >
                    </label>
                  </Fragment>
                ))}
                <span className="rate__count"></span>
                { !rateCount && (
                  <span className="rate__message">Поставьте оценку</span>
                )}
              </div>
            </div>
          </div>
          <label className="form-review__label" htmlFor="user-name">
            Достоинства
          </label>
          <input
            onChange={handleAdvantageInputChange}
            className="form-review__input"
            id="pros"
            type="text"
            autoComplete="off"
          />
          <label className="form-review__label" htmlFor="user-name">
            Недостатки
          </label>
          <input
            onChange={handleDisadvantageInputChange}
            className="form-review__input"
            id="user-name"
            type="text"
            autoComplete="off"
          />
          <label className="form-review__label" htmlFor="user-name">
            Комментарий
          </label>
          <textarea
            onChange={handleCommentInputChange}
            className="form-review__input form-review__input--textarea"
            id="user-name"
            rows={10}
            autoComplete="off"
          >
          </textarea>
          <button
            className="button button--medium-20 form-review__button"
            type="submit"
          >
            Отправить отзыв
          </button>
        </form>
      </Modal>
    </div>
  );
}
