import { Link } from 'react-router-dom';
import { AppRoute } from 'constants/constants';
import Footer from 'components/shared/footer/footer';
import Header from 'components/shared/header/header';
import Catalog from 'components/catalog/catalog';

export default function MainPage(): JSX.Element {

  return (
    <div className="wrapper">
      <Header isMainPage/>
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Main} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to={'/'} className="link">Каталог</Link>
            </li>
          </ul>
          <Catalog />
        </div>
      </main>
      <Footer isMainPage/>
    </div>
  );
}
