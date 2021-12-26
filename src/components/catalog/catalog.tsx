/* eslint-disable no-console */
import { useSelector } from 'react-redux';
import Filters from 'components/filters/filters';
import GuitarCard from 'components/guitarCard/guitarCard';
import Pagination from 'components/pagination/pagination';
import Sorting from 'components/sorting/sorting';
import { getGuitars } from 'store/guitars-store/selectors';

const CARDS_MAX_AMOUNT = 9;

export default function Catalog(): JSX.Element {
  const guitars = useSelector(getGuitars);
  console.log(guitars);

  return (
    <div className="catalog">
      <Filters />
      <Sorting />
      <div className="cards catalog__cards">
        {guitars.slice(0, CARDS_MAX_AMOUNT).map((guitar) => (
          <GuitarCard key={guitar.id} guitar={guitar} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
