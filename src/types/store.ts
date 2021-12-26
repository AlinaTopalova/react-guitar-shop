import { RootStore } from 'store/root-reducer';
import { Guitar } from './data';

export type GuitarsStore = {
  guitars: Guitar[],
  isGuitarsLoading: boolean,
  isGuitarsLoaded: boolean,
};

export type SearchStore = {
  searchValue: string,
  similarGuitars: Guitar[],
};

export type Store = RootStore;

