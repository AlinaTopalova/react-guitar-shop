import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ThreeDots from 'react-loader-spinner/dist/loader/ThreeDots';

export default function Loader(): JSX.Element {
  return (
    <div style={{margin: 'auto'}}>
      <ThreeDots color="#aca8ac" height={50} width={50} />
    </div>
  );
}

