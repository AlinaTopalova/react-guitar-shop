import { Link } from 'react-router-dom';
import { AppRoute } from 'constants/constants';

function NotFoundPage(): JSX.Element {

  return (
    <div style={
      {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }
    }
    >
      <div>
        <h2 className='title title--bigger'>404</h2>
      </div>
      <h2 className='title title--bigger'>
        We are sorry, Page not found!
      </h2>
      <Link
        style={{color: 'black'}}
        to={AppRoute.Catalog}
      >
        Back To Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
