import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ShopListPage from './pages/ListPage/ShopListPage';
import ShopCreatePage from './pages/CreateUpdatePage/ShopCreatePage';
import Header from './components/headers/Header';
import Container from './components/BaseContainer/Container';
import ShopDetailPage from './pages/DetailPage/ShopDetailPage';
import DetailHeader from './components/headers/DetailHeader';
import ShopEditPage from './pages/CreateUpdatePage/ShopEditPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  const showHeader =
    currentPath === '/' ||
    currentPath.startsWith('/list') ||
    currentPath.startsWith('/link') ||
    currentPath.startsWith('/linkpost');

  const isDetailPage = currentPath.startsWith('/link/');

  return (
    <>
      {showHeader && (isDetailPage ? <DetailHeader /> : <Header />)}{' '}
      <Container>
        <Routes>
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/list" element={<ShopListPage />} />
          <Route path="/link/:id" element={<ShopDetailPage />} />
          <Route path="/linkpost" element={<ShopCreatePage />} />
          <Route path="/linkpost/:id/edit" element={<ShopEditPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
