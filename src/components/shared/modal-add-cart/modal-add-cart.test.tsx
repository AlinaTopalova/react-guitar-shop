import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { guitarMock, store } from 'mock';
import { ModalType } from 'constants/constants';
import ModalAddCart from './modal-add-cart';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onClose = jest.fn();
const onClick = jest.fn();

describe('Component: ModalAddCart', () => {

  it('should render correctly Component: ModalAddCart', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <ModalAddCart
            modalType={ModalType.ModalAddCart}
            activeGuitar={guitarMock}
            onClose={onClose}
            onClick={onClick}
          />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });
});
