import Modal from 'components/shared/modal/modal';
import { GuitarTypeName, ModalType } from 'constants/constants';
import { Guitar } from 'types/types';

type ModalDeleteGuitarProps = {
  modalType: ModalType | null,
  activeGuitar: Guitar,
  onClose: () => void,
  onDelete: (guitar: Guitar) => void,
}

export default function ModalDeleteGuitar(props: ModalDeleteGuitarProps): JSX.Element {
  const { modalType, activeGuitar, onClose, onDelete } = props;

  return(
    <div className={`modal ${modalType === ModalType.ModalDeleteGuitar ? 'is-active' : ''}`}>
      <Modal onClose={onClose}>
        <h2 className="modal__header title title--medium title--red">
          Удалить этот товар?
        </h2>
        <div className="modal__info">
          <img
            className="modal__img"
            src={activeGuitar.previewImg}
            width="67"
            height="137"
            alt={activeGuitar.name}
          />
          <div className="modal__info-wrapper">
            <h3 className="modal__product-name title title--little title--uppercase">
              Гитара {activeGuitar.name}
            </h3>
            <p className="modal__product-params modal__product-params--margin-11">
              Артикул: {activeGuitar.vendorCode}
            </p>
            <p className="modal__product-params">
              {GuitarTypeName[activeGuitar.type]}, {activeGuitar.stringCount} струнная
            </p>
            <p className="modal__price-wrapper">
              <span className="modal__price">Цена:</span>
              <span className="modal__price">{activeGuitar.price} ₽</span>
            </p>
          </div>
        </div>
        <div className="modal__button-container">
          <button
            onClick={() => onDelete(activeGuitar)}
            className="button button--small modal__button"
          >
            Удалить товар
          </button>
          <button
            onClick={onClose}
            className="button button--black-border button--small modal__button modal__button--right"
          >
            Продолжить покупки
          </button>
        </div>
        <button
          className="modal__close-btn button-cross"
          type="button"
          aria-label="Закрыть"
        >
          <span className="button-cross__icon"></span>
          <span className="modal__close-btn-interactive-area"></span>
        </button>
      </Modal>
    </div>
  );
}
