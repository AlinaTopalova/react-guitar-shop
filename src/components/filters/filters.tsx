/* eslint-disable no-console */
import { ChangeEvent, useEffect, useState } from 'react';
import { CordNumberLabel, GuitarTypeLabel } from 'constants/constants';
import {
  CordNumber,
  FetchStatus,
  FilterSetAction,
  FilterState,
  FilterType,
  GuitarType,
  OperatorQuery
} from 'types/types';
import { fetchPrice, selectMaxPrice, selectMinPrice, selectPriceFetchStatus } from 'features/price/priceSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import PriceFilter from './components/priceFilter/priceFilter';

type FiltersProps = {
  catalogFilter?: FilterState;
  onFilterChange: (filterState: FilterSetAction) => void;
}

const GuitarCordCount = {
  [GuitarType.Acoustic]: [CordNumber.Six, CordNumber.Seven, CordNumber.Twelve],
  [GuitarType.Electric]: [CordNumber.Four, CordNumber.Six, CordNumber.Seven],
  [GuitarType.Ukulele]: [CordNumber.Four],
};

const getAvailableCords = (guitarTypes: GuitarType[]): CordNumber[] => {
  if (guitarTypes.length === 0) {
    return Object.values(CordNumber);
  }

  const result = guitarTypes.reduce<CordNumber[]>((acc, value) => [...acc, ...GuitarCordCount[value]], []);
  console.log('result', result);

  return Array.from(new Set(result));
};

export default function Filters(props: FiltersProps): JSX.Element {
  const { catalogFilter, onFilterChange } = props;

  const dispatch = useAppDispatch();

  const priceStatsFetchStatus = useAppSelector(selectPriceFetchStatus);

  const maxPriceLimit = useAppSelector(selectMaxPrice);

  const minPriceLimit = useAppSelector(selectMinPrice);

  const [availableCords, setAvailabelCords] = useState<CordNumber[]>(
    () => {
      const selectedTypes = catalogFilter?.type?.value as
        | GuitarType[]
        | undefined;
      if (selectedTypes) {
        return getAvailableCords(selectedTypes);
      }
      return Object.values(CordNumber);
    },
  );

  const [guitarTypeFilter, setGuitarTypeFilter] = useState<GuitarType[]>(
    () => (catalogFilter?.type?.value as GuitarType[]) || [],
  );

  const [cordNumFilter, setCordNumFilter] = useState<CordNumber[]>(
    () => (catalogFilter?.stringCount?.value as CordNumber[]) || [],
  );

  const [priceFilter, setPriceFilter] = useState<[string, string]>(() => {
    const from =
      (catalogFilter?.[`price${OperatorQuery.Gte}`]?.value as string) || '';
    const to =
      (catalogFilter?.[`price${OperatorQuery.Lte}`]?.value as string) || '';
    return [from, to];
  });

  const handleGuitarTypeFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = evt.target;
    let resultValue: GuitarType[];

    if (checked) {
      resultValue = [...guitarTypeFilter, value as GuitarType];
    } else {
      resultValue = guitarTypeFilter.filter((item) => item !== value);
    }

    const newAvailableCords = getAvailableCords(resultValue);

    const newCordNumFilter = cordNumFilter.filter((cordNum) =>
      newAvailableCords.includes(cordNum),
    );

    setAvailabelCords(newAvailableCords);
    setCordNumFilter(newCordNumFilter);
    setGuitarTypeFilter(resultValue);

    onFilterChange({
      field: 'stringCount',
      type: FilterType.Equals,
      value: newCordNumFilter,
    });

    onFilterChange({
      field: 'type',
      type: FilterType.Equals,
      value: resultValue,
    });
  };

  const handleCordNumFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = evt.target;
    let resultValue: CordNumber[];

    if (checked) {
      resultValue = [...cordNumFilter, value as CordNumber];
    } else {
      resultValue = cordNumFilter.filter((item) => item !== value);
    }
    setCordNumFilter(resultValue);


    onFilterChange({
      field: 'stringCount',
      type: FilterType.Equals,
      value: resultValue,
    });
  };

  const handlePriceFilterChange = (value: [string, string]) => {
    const [from, to] = value;

    setPriceFilter(value);

    onFilterChange({
      field: 'price',
      type: FilterType.RangeFrom,
      value: from,
    });

    onFilterChange({
      field: 'price',
      type: FilterType.RangeTo,
      value: to,
    });
  };

  useEffect(() => {
    dispatch(fetchPrice());
  }, [dispatch]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          {priceStatsFetchStatus === FetchStatus.Loading && <div>Загрука</div>}
          {priceStatsFetchStatus === FetchStatus.Complete && (
            <PriceFilter
              onChange={handlePriceFilterChange}
              maxPriceLimit={maxPriceLimit as number}
              minPriceLimit={minPriceLimit as number}
              priceValue={priceFilter}
            />
          )}
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {Object.values(GuitarType).map((guitarType) => (
          <div
            key={guitarType}
            className="form-checkbox catalog-filter__block-item"
          >
            <input
              checked={guitarTypeFilter.includes(guitarType)}
              onChange={handleGuitarTypeFilterChange}
              className="visually-hidden"
              type="checkbox"
              id={guitarType}
              name={guitarType}
              value={guitarType}
            />
            <label htmlFor={guitarType}>
              {GuitarTypeLabel[guitarType]}
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {Object.values(CordNumber).map((cordNumber) => (
          <div
            key={cordNumber}
            className="form-checkbox catalog-filter__block-item"
          >
            <input
              checked={cordNumFilter.includes(cordNumber)}
              disabled={!availableCords.includes(cordNumber)}
              onChange={handleCordNumFilterChange}
              className="visually-hidden"
              type="checkbox"
              id={cordNumber}
              name={cordNumber}
              value={cordNumber}
            />
            <label htmlFor={cordNumber}>
              {CordNumberLabel[cordNumber]}
            </label>
          </div>
        ))}
      </fieldset>
    </form>
  );
}
