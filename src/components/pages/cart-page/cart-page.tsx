import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, ModalType } from 'constants/constants';
import { Guitar } from 'types/types';
import {useAppDispatch, useAppSelector } from 'hooks';
import {
  deleteGuitarInCart,
  selectGuitarsInCart
} from 'features/cartSlice/cartSlice';
import Footer from 'components/shared/footer/footer';
import Header from 'components/shared/header/header';
import ProductToBuy from './components/productToBuy/productToBy';
import ModalDeleteGuitar from './components/modal-delete-guitar/modal-delete-guitar';
import CartCoupon from './components/cart-coupon/cart-coupon';
import CartTotalPrice from './components/cart-total-price/cart-total-price';

export default function CartPage(): JSX.Element {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const [activeGuitar, setActiveGuitar] = useState<Guitar | null>(null);

  const guitars = useAppSelector(selectGuitarsInCart);

  const dispatch = useAppDispatch();

  const handleCloseBtnClick = () => {
    setActiveModal(null);
  };

  const handleDeleteBtnClick = (guitar: Guitar) => {
    setActiveModal(ModalType.ModalDeleteGuitar);
    setActiveGuitar(guitar);
  };

  const handleDeleteProductClick = (product: Guitar) => {
    dispatch(deleteGuitarInCart(product));
    setActiveModal(null);
  };

  useEffect(() => {
    document.body.style.overflow = (activeModal !== null) ? 'hidden' : 'auto';
  }, [activeModal]);

  return (
    <div className="wrapper">
      {activeGuitar && (
        <ModalDeleteGuitar
          modalType={activeModal}
          onClose={handleCloseBtnClick}
          onDelete={() => handleDeleteProductClick(activeGuitar)}
          activeGuitar={activeGuitar}
        />
      )}
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item">
              <Link className="link" to={AppRoute.Main}>Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to={'/'}>Корзина</Link>
            </li>
          </ul>
          {Object.values(guitars).length === 0 && (
            <h3 style={{color: '#c90606', padding: '30px'}}>
              В вашей корзине нет товаров
            </h3>
          )}
          <div className="cart">
            {Object.values(guitars).map((guitar) => (
              <ProductToBuy
                key={guitar.details.id}
                product={guitar}
                onClick={handleDeleteBtnClick}
              />
            ))}
            <div className="cart__footer">
              <CartCoupon />
              <CartTotalPrice guitars={guitars} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
