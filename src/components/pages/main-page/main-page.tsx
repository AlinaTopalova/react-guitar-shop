import Catalog from 'components/catalog/catalog';
import Footer from 'components/shared/footer/footer';
import Header from 'components/shared/header/header';

export default function MainPage(): JSX.Element {

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <a className="link" href="./main.html">Главная</a>
            </li>
            <li className="breadcrumbs__item">
              <a href="/" className="link">Каталог</a>
            </li>
          </ul>
          <Catalog />
        </div>
      </main>
      <Footer />
    </div>
  );
}
