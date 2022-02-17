import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { guitarMock, store } from 'mock';
import { ModalType } from 'constants/constants';
import ModalDeleteGuitar from './modal-delete-guitar';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onClose = jest.fn();
const onDelete = jest.fn();

describe('Component: ModalDeleteGuitar', () => {

  it('should render correctly Component: ModalDeleteGuitar', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <ModalDeleteGuitar
            modalType={ModalType.ModalDeleteGuitar}
            activeGuitar={guitarMock}
            onClose={onClose}
            onDelete={onDelete}
          />
        </Router>,
      </Provider>,
    );

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();
  });
});
