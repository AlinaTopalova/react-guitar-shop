import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCurrentReviews, postNewReview } from 'api';
import { FetchStatus } from 'constants/constants';
import { Comment, NewComment } from 'types/types';
import { RootState } from 'store';

type State = {
  commentsFetchStatus: FetchStatus,
  newCommentFetchStatus: FetchStatus,
  comments: Comment[],
};

const initialState: State = {
  commentsFetchStatus: FetchStatus.Idle,
  newCommentFetchStatus: FetchStatus.Idle,
  comments: [],
};

export const fetchReviews = createAsyncThunk(
  'guitar/fetchCurrentReviews',
  async (guitarId: number) => {
    const { data } = await fetchCurrentReviews(guitarId);
    return data;
  },
);

export const postReview = createAsyncThunk(
  'guitar/postReview',
  async ({
    guitarId,
    userName,
    advantage,
    disadvantage,
    comment,
    rating}: NewComment,
  ) => {
    await postNewReview({
      guitarId,
      userName,
      advantage,
      disadvantage,
      comment,
      rating,
    });
    const { data } = await fetchCurrentReviews(guitarId);
    return data;
  },
);

export const guitarSlice = createSlice({
  name: 'guitar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.commentsFetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.commentsFetchStatus = FetchStatus.Complete;
        state.newCommentFetchStatus = FetchStatus.Idle;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.commentsFetchStatus = FetchStatus.Error;
      })
      .addCase(postReview.pending, (state) => {
        state.commentsFetchStatus = FetchStatus.Loading;
        state.newCommentFetchStatus = FetchStatus.Loading;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.commentsFetchStatus = FetchStatus.Complete;
        state.newCommentFetchStatus = FetchStatus.Complete;
      });
  },
});

export const selectComments = (state: RootState) =>
  state.guitar.comments;

export const selectNewCommentFetchStatus = (state: RootState) =>
  state.guitar.newCommentFetchStatus;

export default guitarSlice.reducer;

