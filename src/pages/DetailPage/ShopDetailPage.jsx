import React, { memo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ShopDetail.scss';
import { deleteShop, detailShop, updateShop } from '../../service/api.js';
import LikeButton from '../../components/Likes/LikeButton.jsx';
import PasswordModal from '../../components/PasswordModal/PasswordModal.jsx';
import share from '../../assets/images/share.png';
import more from '../../assets/images/more.png';

const DetailStyle = {
  top: '20px',
  left: '24px',
};

const DetailItem = memo(({ detailData }) => {
  return detailData.products.map((it) => (
    <li key={it.id} className="detail__item">
      <div className="detail__productImage">
        <img src={it.imageUrl} alt={it.name} />
      </div>
      <div className="detail__info">
        <div className="detail__productName">{it.name}</div>
        <div className="detail__productPrice">
          ￦{it.price.toLocaleString()}원
        </div>
      </div>
    </li>
  ));
});

export default function ShopDetailPage() {
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    window.location.href = '/list';
  };

  const handlePasswordSubmit = async (password, type) => {
    setLoading(true);
    try {
      if (type === 'edit') {
        // 비밀번호 검증 후 수정 페이지로 이동
        const updatedData = {
          shop: {
            imageUrl: detailData.shop.imageUrl,
            urlName: detailData.shop.urlName || 'string',
            shopUrl: detailData.shop.shopUrl,
          },
          products: detailData.products.map((product) => ({
            price: product.price,
            imageUrl: product.imageUrl,
            name: product.name,
          })),
          userId: detailData.userId,
          name: detailData.name,
        };
        const response = await updateShop(id, password, updatedData);

        if (response && response.id) {
          setShowPasswordModal(false);
          navigate(`/linkpost/${id}/edit`);
        } else {
          alert('비밀번호가 일치하지 않습니다.');
        }
      } else if (type === 'delete') {
        // 비밀번호 검증 후 스토어 삭제 및 초기 화면 이동
        const response = await deleteShop(id, password);

        if (response && response.id) {
          setShowPasswordModal(false);
          alert('삭제가 완료되었습니다.');
          navigate(`/list`);
        } else {
          alert('비밀번호가 일치하지 않습니다.');
        }
      }
    } catch (error) {
      if (error.message === 'Bad Request') {
        alert('비밀번호를 확인해 주세요');
      } else {
        alert('서버 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await detailShop(id);
      setDetailData(data);
    };
    fetchData();
  }, [id]);

  if (!detailData) {
    return <div className="loading">로딩 중...</div>;
  }

  // URL 복사
  const handleCopyUrl = async (text) => {
    await navigator.clipboard.writeText(text);

    alert('URL을 복사했습니다.');
  };

  const handleMoreClick = (e) => {
    const $button = e.target.closest('.detail__more');
    if ($button.classList.contains('active')) {
      $button.classList.remove('active');
    } else {
      $button.classList.add('active');
    }
  };

  return (
    <div className="detail">
      <div className="detail__back" onClick={handleBackClick}>
        &lt; 돌아가기
      </div>

      <div className="detail__kv">
        <LikeButton
          heartStyle={DetailStyle}
          cardId={detailData.id}
          initialLikes={detailData.likes}
        />
        <div className="detail__buttonWrap">
          <button>
            <img
              src={share}
              alt="공유"
              onClick={() => handleCopyUrl(detailData.shop.shopUrl)}
            />
          </button>
          <button className="detail__more" onClick={handleMoreClick}>
            <img src={more} alt="더보기" />
          </button>
          <div className="detail__moreBox">
            <button
              onClick={() => {
                setModalType('edit');
                setShowPasswordModal(true);
              }}
            >
              수정하기
            </button>
            <button
              onClick={() => {
                setModalType('delete');
                setShowPasswordModal(true);
              }}
            >
              삭제하기
            </button>
          </div>
        </div>
        <div className="detail__profile">
          <div className="detail__profileImage">
            <img src={detailData.shop.imageUrl} alt={detailData.shop.urlName} />
          </div>
          <h2 className="detail__shopName">{detailData.name}</h2>
          <div className="detail__shopId">@{detailData.userId}</div>
        </div>
      </div>

      <div className="detail__feature">대표 상품</div>
      <div className="detail__products">
        <ul className="detail__list">
          <DetailItem detailData={detailData} />
        </ul>
      </div>
      {showPasswordModal && (
        <PasswordModal
          onSubmit={handlePasswordSubmit}
          onClose={setShowPasswordModal}
          type={modalType}
        />
      )}
      {loading && (
        <div className="loading-spinner">
          <p>비밀번호 확인 중...</p>
        </div>
      )}
    </div>
  );
}
