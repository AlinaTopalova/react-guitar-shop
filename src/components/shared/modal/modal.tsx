import { useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import { isEscEvent } from 'utils/utils';

type ModalProps = {
  onClose: () => void,
  children: React.ReactNode,
}

export default function Modal(props: ModalProps): JSX.Element {
  const { onClose, children } = props;

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      if (overlayRef.current?.contains(evt.target as Element)) {
        onClose();
      }
    };

    const handleEscKeyDown = (evt: KeyboardEvent) => {
      if (!isEscEvent(evt)) {
        return;
      }
      onClose();
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscKeyDown);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [onClose]);


  return (
    <div className="modal__wrapper">
      <FocusLock group='modal'>
        <div
          ref={overlayRef}
          className="modal__overlay"
          data-close-modal
          data-testid='modal__overlay'
        >
        </div>

        <div className="modal__content">
          {children}
          <button
            onClick={onClose}
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </FocusLock>
    </div>
  );
}
