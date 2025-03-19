import React, { memo } from 'react';
import Card from './Card';
import './CardList.scss';
import ioadingImg from '../../assets/images/loadingImg.gif';

const CardList = memo(({ data, loading }) => {
  return (
    <div className="card">
      {loading ? (
        <div className="loading">
          <img src={ioadingImg} alt="loading" />
        </div>
      ) : (
        <ul className="card__list">
          <Card data={data} />
        </ul>
      )}
    </div>
  );
});

export default CardList;
