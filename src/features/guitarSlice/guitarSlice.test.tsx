import { FetchStatus } from 'constants/constants';
import { CommentsMock } from 'mock';
import reducer, { fetchReviews, postReview } from './guitarSlice';

describe('GuitarSlice', () => {

  describe('extrareducers', () => {
    const initialState = {
      commentsFetchStatus: FetchStatus.Idle,
      newCommentFetchStatus: FetchStatus.Idle,
      comments: [],
    };

    it('sets fetchStatus loading when fetchReviews is pending', () => {

      const action = { type: fetchReviews.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        commentsFetchStatus: FetchStatus.Loading,
        newCommentFetchStatus: FetchStatus.Idle,
        comments: [],
      });
    });

    it('sets the data when fetchReviews is fulfilled', () => {

      const action = {
        type: fetchReviews.fulfilled.type,
        payload: { data: CommentsMock },
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        commentsFetchStatus: FetchStatus.Complete,
        newCommentFetchStatus: FetchStatus.Idle,
        comments: action.payload,
      });
    });

    it('sets fetchStatus Error when fetchReviews is rejected', () => {

      const action = {
        type: fetchReviews.rejected.type,
        payload: { error: 'some error' },
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        commentsFetchStatus: FetchStatus.Error,
        newCommentFetchStatus: FetchStatus.Idle,
        comments: [],
      });
    });

    it('sets fetchStatus loading when postReview is pending', () => {

      const action = { type: postReview.pending.type };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        commentsFetchStatus: FetchStatus.Loading,
        newCommentFetchStatus: FetchStatus.Loading,
        comments: [],
      });
    });

    it('sets comments when postReview is fullfield', () => {
      const action = {
        type: postReview.fulfilled.type,
        payload: { data: CommentsMock },
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        commentsFetchStatus: FetchStatus.Complete,
        newCommentFetchStatus: FetchStatus.Complete,
        comments: action.payload,
      });
    });
  });
});
