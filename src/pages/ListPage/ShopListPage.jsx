import React, { useCallback, useEffect, useState } from 'react';
import CardList from '../../components/Card/CardList.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import { getShop } from '../../service/api.js';
import searchNull from '../../assets/images/Img_search_null.png';
import Modal from '../../components/Modal/Modal.jsx';
import { useShopContext } from '../../contexts/ShopContext.jsx';
import ioadingImg from '../../assets/images/loadingImg.gif';

export default function ShopListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [cursor, setCursor] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const { toggleModal, orderBy, setOrderBy } = useShopContext();

  useEffect(() => {
    const fetchData = async (options) => {
      setLoading(true);
      const { list, nextCursor } = await getShop(options);
      setData(list);
      setFilteredData(list);
      setCursor(nextCursor);
      setLoading(false);
    };
    fetchData({ orderBy });
  }, [orderBy]);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight - 10;

      if (scrollPosition >= scrollHeight && !isFetching && cursor) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, cursor]);

  // 더보기 기능
  const loadMore = async () => {
    setIsFetching(true);
    const { list, nextCursor } = await getShop({ orderBy, cursor });
    setFilteredData((prevData) => [...prevData, ...list]);
    setCursor(nextCursor);
    setIsFetching(false);
  };

  const handleSearchChange = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (keyword) {
        const filtered = data.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase()),
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    },
    [keyword, data],
  );

  return (
    <div className="shop">
      <SearchBar
        keyword={keyword}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
      />
      <span>
        {orderBy === 'recent'
          ? '최신순 ▼'
          : orderBy === 'likes'
            ? '좋아요순 ▼'
            : orderBy === 'productsCount'
              ? '등록된 상품순 ▼'
              : '상세필터 ▼'}
      </span>
      <button className="sort" onClick={toggleModal}>
        상세필터 ▼
      </button>
      <Modal />

      {!loading && filteredData.length === 0 ? (
        <div className="card__null">
          <img src={searchNull} alt="검색 결과 없음" />
          <p>
            검색 결과가 없어요
            <br />
            지금 프로필을 만들고 내 상품을 소개해보세요.
          </p>
        </div>
      ) : (
        <>
          <CardList data={filteredData} loading={loading} />
        </>
      )}
      {isFetching && (
        <div className="loading loading--more">
          <img src={ioadingImg} alt="loading" />
        </div>
      )}
    </div>
  );
}
