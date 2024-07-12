import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import ScreensPage from 'components/ScreensPage';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="home"
      style={{ display: 'flex', width: '100%', height: '100%' }}
    >
      <Sidebar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <div
        className="screen-page"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<ScreensPage />} />
          <Route path="/:boardName" element={<ScreensPage />} />
        </Routes>
      </div>
    </div>
  );
};
export default HomePage;
