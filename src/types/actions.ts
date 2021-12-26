import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { Guitar } from './data';
import { Store } from './store';

export enum ActionType {
  LoadGuitarsStart = 'data/loadGuitarsStart',
  LoadGuitarsComplete = 'data/loadGuitarsComplete',
  LoadGuitarsError = 'data/loadGuitarsError',
  SetSearchValue = 'search/setSearchValue',
  LoadSimilarGuitars = 'data/similarGuitars',
  ClearSimilarGuitars = 'search/clearSimilarGuitars',
}

export type LoadGuitarsStartAction = {
  type: ActionType.LoadGuitarsStart;
}

export type LoadGuitarsCompleteAction  = {
  type: ActionType.LoadGuitarsComplete;
  payload: Guitar[];
}

export type LoadGuitarsErrorAction = {
  type: ActionType.LoadGuitarsError;
}

export type SetSearchValueAction = {
  type: ActionType.SetSearchValue;
  payload: string;
}

export type LoadSimilarGuitarsAction = {
  type: ActionType.LoadSimilarGuitars;
  payload: Guitar[];
}

export type ClearSimilarGuitarsAction = {
  type: ActionType.ClearSimilarGuitars;
}

export type Actions =
  | LoadGuitarsCompleteAction
  | LoadGuitarsErrorAction
  | LoadGuitarsStartAction
  | SetSearchValueAction
  | LoadSimilarGuitarsAction
  | ClearSimilarGuitarsAction

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, Store, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<Store, AxiosInstance, Actions>;
