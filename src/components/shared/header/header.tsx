import HeaderSearch from 'components/shared/header-search/header-search';
import { useAppSelector } from 'hooks';
import { AppRoute } from 'constants/constants';
import { selectGuitarsInCart } from 'features/cartSlice/cartSlice';
import { Link } from 'react-router-dom';

type HeaderProps = {
  isMainPage?: boolean,
}

export default function Header(props: HeaderProps): JSX.Element {
  const { isMainPage = false } = props;

  const guitarsInCart = useAppSelector(selectGuitarsInCart);

  const guitarsInCartAmount = Object.values(guitarsInCart).reduce((acc, guitar) => acc + guitar.amount, 0);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link
          className="header__logo logo"
          style={{ pointerEvents: isMainPage ? 'none' : 'auto' }}
          to={AppRoute.Main}
        >
          <img
            className="logo__img"
            width="70"
            height="70"
            src="/img/svg/logo.svg"
            alt="Логотип"
          />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link
                className={`link main-nav__link ${isMainPage ? 'link--current' : ''}`}
                to={AppRoute.Catalog}
              >
                  Каталог
              </Link>
            </li>
            <li>
              <Link className="link main-nav__link" to={'/'}>Где купить?</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to={'/'}>О компании</Link>
            </li>
          </ul>
        </nav>
        <HeaderSearch />
        <Link
          className="header__cart-link"
          to={AppRoute.Cart}
          aria-label="Корзина"
        >
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          <span className={`header__cart-count ${guitarsInCartAmount < 1 ? 'visually-hidden': ''}`}>
            {guitarsInCartAmount}
          </span>
        </Link>
      </div>
    </header>
  );
}

