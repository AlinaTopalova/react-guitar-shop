import { Redirect, Route, Switch } from 'react-router-dom';
import { AppRoute } from 'constants/constants';
import MainPage from 'components/pages/main-page/main-page';
import NotFoundPage from 'components/pages/not-found-page/not-found-page';

export default function App(): JSX.Element {

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Redirect to={AppRoute.Catalog} />
      </Route>
      <Route exact path={AppRoute.Catalog}>
        <MainPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}
