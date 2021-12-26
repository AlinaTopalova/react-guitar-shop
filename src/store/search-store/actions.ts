import {
  ActionType,
  ClearSimilarGuitarsAction,
  LoadSimilarGuitarsAction,
  SetSearchValueAction
} from 'types/actions';
import { Guitar } from 'types/data';

const setSearchValue = (searchValue: string): SetSearchValueAction => ({
  type: ActionType.SetSearchValue,
  payload: searchValue,
});

const loadSimilarGuitars = (similarGuitars: Guitar[]): LoadSimilarGuitarsAction => ({
  type: ActionType.LoadSimilarGuitars,
  payload: similarGuitars,
});

const clearSimilarGuitars = (): ClearSimilarGuitarsAction => ({
  type: ActionType.ClearSimilarGuitars,
});

export {
  clearSimilarGuitars,
  loadSimilarGuitars,
  setSearchValue
};
