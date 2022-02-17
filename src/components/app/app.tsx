import { Redirect, Route, Switch } from 'react-router-dom';
import { AppRoute } from 'constants/constants';
import MainPage from 'components/pages/main-page/main-page';
import NotFoundPage from 'components/pages/not-found-page/not-found-page';
import GuitarPage from 'components/pages/guitar-page/guitar-page';
import CartPage from 'components/pages/cart-page/cart-page';

export default function App(): JSX.Element {

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Redirect to={AppRoute.Catalog} />
      </Route>
      <Route exact path={AppRoute.Catalog}>
        <MainPage />
      </Route>
      <Route exact path={`${AppRoute.Guitar}/:guitarId`}>
        <GuitarPage />
      </Route>
      <Route exact path={AppRoute.Cart}>
        <CartPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}
