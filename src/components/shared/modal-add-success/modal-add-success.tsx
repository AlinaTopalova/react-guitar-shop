import { Link } from 'react-router-dom';
import { AppRoute, ModalType } from 'constants/constants';
import Modal from 'components/shared/modal/modal';

type ModalAddSuccessProps = {
  modalType: ModalType | null,
  onClose: () => void,
}

export default function ModalAddSuccess(props: ModalAddSuccessProps): JSX.Element {
  const { modalType, onClose } = props;

  return (
    <div className={`modal modal--success ${modalType === ModalType.ModalAddSuccess ? 'is-active' : ''}`}>
      <Modal onClose={onClose}>
        <svg className="modal__icon" width="26" height="20" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <p className="modal__message">Товар успешно добавлен в корзину</p>
        <div className="modal__button-container modal__button-container--add">
          <Link to={AppRoute.Cart}>
            <button className="button button--small modal__button">
              Перейти в корзину
            </button>
          </Link>
          <Link to={AppRoute.Catalog}>
            <button
              onClick={onClose}
              className="button button--black-border button--small modal__button modal__button--right"
            >
              Продолжить покупки
            </button>
          </Link>
        </div>
        <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
        </button>
      </Modal>
    </div>
  );
}
