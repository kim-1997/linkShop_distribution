import React from 'react';
import styled from 'styled-components';
import notfoundshop from '../../assets/images/notfoundshop.png';

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #333;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  background-color: #3e45ec;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NotFoundPage = () => {
  const goHome = () => {
    window.location.href = '/'; // 홈으로 리디렉션
  };

  return (
    <Container>
      {/* <Title>404</Title> */}
      <img src={notfoundshop} style={{ width: '100px', height: '100px' }} />
      <Message>죄송합니다, 찾으시는 페이지가 없습니다.</Message>
      <Button onClick={goHome}>상점 리스트로 돌아가기</Button>
    </Container>
  );
};

export default NotFoundPage;
