import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import {
  AppRoute,
  FetchStatus,
  ModalType,
  STARS_MAX_AMOUNT
} from 'constants/constants';
import { Guitar } from 'types/types';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  fetchReviews,
  selectNewCommentFetchStatus
} from 'features/guitarSlice/guitarSlice';
import Footer from 'components/shared/footer/footer';
import Header from 'components/shared/header/header';
import { fetchCurrentGuitar } from 'api';
import Loader from 'components/shared/loader/loader';
import Reviews from './components/reviews/reviews';
import ModalReview from './components/modal-review/modal-review';
import ModalSuccessReview from './components/modal-success-review/modal-success-review';
import Description from './components/description/description';

const stars = Array.from({length: STARS_MAX_AMOUNT});

export default function GuitarPage(): JSX.Element {
  const { guitarId } = useParams<{ guitarId: string }>();

  const [currentGuitar, setCurrentGuitar] = useState<Guitar>();

  const [fetchStatusGuitar, setFetchStatusGuitar] = useState<FetchStatus>(FetchStatus.Idle);

  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const newCommentFetchStatus = useAppSelector(selectNewCommentFetchStatus);

  const dispatch = useAppDispatch();

  const handleModalNewReviewClick = useCallback(() => {
    setActiveModal(ModalType.ModalNewReview);
  }, []);

  const handleCloseButtonClick = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    dispatch(fetchReviews(Number(guitarId)));
  }, [dispatch, guitarId]);

  useEffect(() => {
    const fetchGuitar = async() => {
      setFetchStatusGuitar(FetchStatus.Loading);
      try {
        const guitar = await fetchCurrentGuitar(Number(guitarId));
        setCurrentGuitar(guitar);
        setFetchStatusGuitar(FetchStatus.Complete);
      } catch {
        setFetchStatusGuitar(FetchStatus.Error);
      }
    };

    fetchGuitar();
  }, [guitarId]);

  useEffect(() => {
    if (newCommentFetchStatus === FetchStatus.Complete) {
      setActiveModal(ModalType.ModalSuccess);
    }
    else {
      setActiveModal(null);
    }
  }, [newCommentFetchStatus]);

  useEffect(() => {
    document.body.style.overflow = (activeModal !== null) ? 'hidden' : 'auto';
  }, [activeModal]);

  const renderPageContent = () => {
    if (fetchStatusGuitar === FetchStatus.Error) {
      return (
        <div style={{margin: 'auto'}}>
          <h2>К сожалению такой гитары у нас нет...</h2>
        </div>
      );
    }

    if (fetchStatusGuitar === FetchStatus.Loading) {
      return <Loader />;
    }

    if (currentGuitar) {
      return (
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">
              {currentGuitar.name}
            </h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Main}>Главная</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={'/'}>{currentGuitar.name}</Link>
              </li>
            </ul>
            <div className="product-container">
              <img
                className="product-container__img"
                src={`/${currentGuitar.previewImg}`}
                width="90"
                height="235"
                alt={currentGuitar.name}
              />
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">
                  {currentGuitar?.name}
                </h2>
                <div className="rate product-container__rating" aria-hidden="true">
                  <span className="visually-hidden">Рейтинг:</span>
                  {currentGuitar && (
                    stars.map((_, index: number) => (
                      <svg key={nanoid()} width="12" height="11" aria-hidden="true">
                        <use xlinkHref={index < Math.floor(currentGuitar.rating) ? '#icon-full-star' : '#icon-star'}></use>
                      </svg>
                    ))
                  )}
                  <span className="rate__count"></span>
                  <span className="rate__message"></span>
                </div>
                <Description currentGuitar={currentGuitar} />
              </div>
              <div className="product-container__price-wrapper">
                <p className="product-container__price-info product-container__price-info--title">
                  Цена:
                </p>
                <p className="product-container__price-info product-container__price-info--value">
                  {currentGuitar.price}
                </p>
                <a
                  className="button button--red button--big product-container__button"
                  href="/"
                >
                  Добавить в корзину
                </a>
              </div>
            </div>
            <Reviews
              onClick={handleModalNewReviewClick}
            />
          </div>
        </main>
      );
    }
  };

  return (
    <div className="wrapper">
      {currentGuitar && (
        <>
          <ModalReview
            currentGuitar={currentGuitar}
            onClose={handleCloseButtonClick}
            modalType={activeModal}
          />
          <ModalSuccessReview
            onClose={handleCloseButtonClick}
            modalType={activeModal}
          />
        </>
      )}
      <Header />
      {renderPageContent()}
      <Footer />
    </div>
  );
}
