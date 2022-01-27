import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { CommentsMock, store } from 'mock';
import Reviews from './reviews';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onClose = jest.fn();

describe('Component: Reviews', () => {

  it('should render correctly Component: Reviews', () => {

    render(
      <Provider store={mockStore(store)}>
        <Router history={history}>
          <Reviews onClick={onClose} reviews={CommentsMock}/>
        </Router>,
      </Provider>,
    );

    expect(screen.getByTestId('reviews-section')).toBeInTheDocument();
  });
});
