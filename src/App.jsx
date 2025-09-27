// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import './App.css';

// 각 페이지에 해당하는 간단한 컴포넌트를 임시로 만듦
const Home = () => <div className="page-content"><h2>홈 페이지</h2></div>;
const Search = () => <div className="page-content"><h2>검색 페이지</h2></div>;
const BakeryTour = () => <div className="page-content"><h2>빵지순례 페이지</h2></div>;
const MyPage = () => <div className="page-content"><h2>마이페이지</h2></div>;

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        {/* 👇 페이지 이동을 관리하는 Routes와 Route를 여기에 추가 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/bakery-tour" element={<BakeryTour />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;