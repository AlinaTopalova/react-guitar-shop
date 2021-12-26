import { Guitar } from 'types/data';
import { ThunkActionResult } from 'types/actions';
import {
  loadGuitarsComplete,
  loadGuitarsError,
  loadGuitarsStart
} from './guitars-store/actions';
import { ApiRoute } from 'constants/constants';
import { loadSimilarGuitars } from './search-store/actions';

export const fetchGuitars = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadGuitarsStart());
    try {
      const { data } = await api.get<Guitar[]>(ApiRoute.GuitarWithComments);
      dispatch(loadGuitarsComplete(data));
    }
    catch {
      dispatch(loadGuitarsError());
    }
  };

export const fetchSimilarGuitars = (searchValue: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<Guitar[]>(`${ApiRoute.SimilarGuitars}${searchValue}`);
    dispatch(loadSimilarGuitars(data));
  };

