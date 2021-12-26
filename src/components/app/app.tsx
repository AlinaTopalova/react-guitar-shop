import MainPage from 'components/pages/main-page/main-page';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppRoute } from 'constants/constants';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchGuitars } from 'store/api-actions';

export default function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuitars());
  },[dispatch]);

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <Redirect to={AppRoute.Catalog} />
      </Route>
      <Route path={AppRoute.Catalog}>
        <MainPage />
      </Route>
    </Switch>
  );
}
