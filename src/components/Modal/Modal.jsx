import React from 'react';
import { useShopContext } from '../../contexts/ShopContext';
import './Modal.scss';
import close from '../../assets/images/close.png';

const Modal = () => {
  const { isModalOpen, toggleModal, setOrderBy, orderBy } = useShopContext();

  if (!isModalOpen) return null; // 모달이 열려있지 않으면 렌더링하지 않음

  const handleSort = (order) => {
    setOrderBy(order);
    toggleModal();
  };

  return (
    <>
      <div className="modal__overlay">
        <div className="modal__box">
          <div className="modal__detail">
            <p className="modal__sorting">정렬</p>
            <ul>
              <li
                className={`sort__button ${orderBy === 'recent' ? 'selected' : ''}`}
                onClick={() => handleSort('recent')}
              >
                최신순
              </li>
              <li
                className={`sort__button ${orderBy === 'likes' ? 'selected' : ''}`}
                onClick={() => handleSort('likes')}
              >
                좋아요순
              </li>
              <li
                className={`sort__button ${orderBy === 'productsCount' ? 'selected' : ''}`}
                onClick={() => handleSort('productsCount')}
              >
                등록된 상품순
              </li>
            </ul>
            <button className="modal__closeButton" onClick={toggleModal}>
              <img src={close} alt="close"></img>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
