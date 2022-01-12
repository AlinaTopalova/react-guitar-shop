import { guitarsList } from 'mock';
import reducer,
{
  setSearchValue,
  loadSimilarGuitars,
  clearSimilarGuitars,
  fetchGuitars
} from './searchSlice';

describe('PriceSlice', () => {

  const initialState = {
    searchValue: '',
    similarGuitars: [],
  };

  it('should set searchValue', () => {

    expect(reducer(initialState, setSearchValue('testValue')))
      .toEqual(
        {
          searchValue: 'testValue',
          similarGuitars: [],
        },
      );
  });

  it('should return similarGuitars', () => {

    expect(reducer(initialState, loadSimilarGuitars(guitarsList)))
      .toEqual(
        {
          searchValue: '',
          similarGuitars: guitarsList,
        },
      );
  });

  it('should clear similar guitars', () => {

    expect(reducer(initialState, clearSimilarGuitars()))
      .toEqual(
        {
          searchValue: '',
          similarGuitars: [],
        },
      );
  });
});


describe('searchSlice', () => {
  describe('extraReducers', () => {

    const initialState = {
      searchValue: '',
      similarGuitars: [],
    };

    it('sets similarGuitars when fetchGuitars is fulfilled', () => {

      const action = {
        type: fetchGuitars.fulfilled.type,
        payload: guitarsList,
      };
      const state = reducer(initialState, action);

      expect(state).toEqual({
        searchValue: '',
        similarGuitars: guitarsList,
      });
    });
  });
});
