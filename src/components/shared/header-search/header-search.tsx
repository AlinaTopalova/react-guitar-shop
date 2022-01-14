import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  clearSimilarGuitars,
  fetchGuitars,
  selectSearchValue,
  selectSimilarGuitars,
  setSearchValue
} from 'features/searchSlice/searchSlice';
import { sortSimilarGuitars } from 'utils.ts/sort';

export default function HeaderSearch(): JSX.Element {
  const [isSelectListOpen, setIsSelectListOpen] = useState<boolean>(false);

  const similarGuitars = useAppSelector(selectSimilarGuitars);

  const inputValue = useAppSelector(selectSearchValue);

  const dispatch = useAppDispatch();

  const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleSearchInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(evt.target.value));
    if (evt.target.value) {
      setIsSelectListOpen(true);
      dispatch(fetchGuitars(evt.target.value));
    } else {
      setIsSelectListOpen(false);
      dispatch(clearSimilarGuitars());
    }
  };

  useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      if (searchRef.current?.contains(evt.target as Node)) {
        return;
      }
      setIsSelectListOpen(false);
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dispatch]);

  const sortedGuitars = useMemo(
    () => (similarGuitars ? sortSimilarGuitars(similarGuitars, inputValue) : similarGuitars),
    [inputValue, similarGuitars],
  );

  return (
    <div
      ref={searchRef}
      className="form-search"
    >
      <form
        className="form-search__form"
      >
        <button
          className="form-search__submit"
          type="submit"
        >
          <svg
            className="form-search__icon"
            width="14"
            height="15"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          onChange={handleSearchInputChange}
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul
        className={`form-search__select-list ${isSelectListOpen ? '' : 'hidden'}`}
        style={{zIndex: 1}}
        tabIndex={0}
      >
        {sortedGuitars.map((similarGuitar) => (
          <li
            key={similarGuitar.id}
            className="form-search__select-item"
            tabIndex={1}
          >
            <Link
              to='/'
              className="form-search__select-item"
            >
              {similarGuitar.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


