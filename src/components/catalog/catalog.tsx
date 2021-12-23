/* eslint-disable no-console */
import { getGuitars } from 'api';
import { useEffect, useState } from 'react';
import { Guitar } from 'types/guitar';
import Filters from './filters/filters';
import GuitarCard from './guitarCard/guitarCard';
import Pagination from './pagination/pagination';
import Sorting from './sorting/sorting';

const CARD_MAX_AMOUNT = 9;

export default function Catalog(): JSX.Element {
  const [guitars, setGuitars] = useState<Guitar[]>([]);

  useEffect(() => {
    const fetchGuitars = async() => {
      const guitarsData = await getGuitars();
      setGuitars(guitarsData);
    };
    fetchGuitars();
  }, []);

  return (
    <div className="catalog">
      <Filters />
      <Sorting />
      <div className="cards catalog__cards">
        {guitars.slice(0, CARD_MAX_AMOUNT).map((guitar) => (
          <GuitarCard key={guitar.id} guitar={guitar} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
