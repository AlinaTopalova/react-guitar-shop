import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from 'mock';
import { ModalType } from 'constants/constants';
import ModalAddSuccess from './modal-add-success';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onClose = jest.fn();


describe('Component: ModalAddSuccess', () => {

  it('should render correctly Component: ModalAddSuccess', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <ModalAddSuccess
            modalType={ModalType.ModalAddSuccess}
            onClose={onClose}
          />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Товар успешно добавлен в корзину/i))
      .toBeInTheDocument();
    expect(screen.getByText(/Перейти в корзину/i)).toBeInTheDocument();
  });
});
