import Modal from 'components/shared/modal/modal';
import { GuitarTypeName, ModalType } from 'constants/constants';
import { Guitar } from 'types/types';
import { useAppDispatch } from 'hooks';
import { setGuitarInCart } from 'features/cartSlice/cartSlice';

type ModalAddCartProps = {
  modalType: ModalType | null,
  onClose: () => void,
  activeGuitar: Guitar,
  onClick: () => void,
}

export default function ModalAddCart(props: ModalAddCartProps): JSX.Element {
  const { modalType, onClose, activeGuitar, onClick } = props;

  const dispatch = useAppDispatch();

  const handleAddCartBtnClick = () => {
    dispatch(setGuitarInCart(activeGuitar));
    onClick();
  };

  return (
    <div className={`modal ${modalType === ModalType.ModalAddCart ? 'is-active' : ''}`}>
      <Modal onClose={onClose}>
        <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
        <div className="modal__info">
          <img
            className="modal__img"
            src={`/${activeGuitar.previewImg}`}
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
            onClick={handleAddCartBtnClick}
            className="button button--red button--big modal__button modal__button--add"
          >
              Добавить в корзину
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
