import Modal from 'components/shared/modal/modal';
import { ModalType } from 'constants/constants';

type ModalSuccessReviewProps = {
  modalType: ModalType | null,
  onClose: () => void,
}

export default function ModalSuccessReview(props: ModalSuccessReviewProps): JSX.Element {
  const { modalType, onClose } = props;

  return (
    <div className={`modal modal--success ${modalType === ModalType.ModalSuccess ? 'is-active' : ''}`}>
      <Modal onClose={onClose}>
        <svg className="modal__icon" width="26" height="20" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <p className="modal__message">Спасибо за ваш отзыв!</p>
        <div className="modal__button-container modal__button-container--review">
          <button
            onClick={onClose}
            className="button button--small modal__button modal__button--review"
          >
              К покупкам!
          </button>
        </div>
      </Modal>
    </div>
  );
}


