import MainPage from 'components/pages/main-page/main-page';
import { Route, Switch } from 'react-router-dom';
import { AppRoute } from 'constants/constants';

export default function App(): JSX.Element {
  return (
    <Switch>
      <Route path={AppRoute.Main}>
        <MainPage />
      </Route>
      <Route path={AppRoute.Catalog}>
        <MainPage />
      </Route>
    </Switch>
  );
}
