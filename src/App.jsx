import React from "react";
// 1. react-router-dom에서 Outlet을 꼭 추가로 가져와야 합니다.
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Navbar from "./pages/Navbar";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import SearchPage from "./pages/SearchPage";
import BakeryDetail from "./pages/BakeryDetail";
import "./App.css";

// 이제 삭제해도 되나?
// 2. 임시 페이지들
// const Search = () => (
//   <div className="page-content">
//     <h2>검색 페이지</h2>
//   </div>
// );

const BakeryTour = () => (
  <div className="page-content">
    <h2>빵지순례 페이지</h2>
  </div>
);

// 3. '사이드바 + 네비바'가 있는 페이지의 "틀"을 여기서 만듭니다.
//    (새 파일 만들 필요 없이 App.jsx 안에 그냥 두세요)
const MainLayout = () => {
  return (
    <div className="app-container">
      <Sidebar /> {/* 👈 유저님의 사이드바 */}
      <main className="main-content">
        {/*  <Navbar /> 👈 유저님의 네비바 */}
        {/* 👇 'Outlet'은 '검색', '빵지순례' 페이지 등이 
              표시될 "빈 공간"이라는 뜻입니다. */}
        <Outlet />
      </main>
    </div>
  );
};

// 4. 여기가 App 본체입니다.
function App() {
  return (
    // 'Routes'가 모든걸 감쌉니다.
    <Routes>
      {/* 경로 1:
          '/' (홈페이지)로 접속하면... 
          'MainLayout' (틀) 없이 'HomePage' 컴포넌트만 보여준다.
      */}
      <Route path="/" element={<HomePage />} />

      {/* 경로 2:
          '/search', '/bakery-tour' 등 다른 페이지로 접속하면...
          'MainLayout' (틀)을 먼저 보여주고,
          그 안의 'Outlet' 자리에 해당 페이지를 보여준다.
      */}
      <Route element={<MainLayout />}>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bakery/:bakeryId" element={<BakeryDetail />} />
        <Route path="/bakery-tour" element={<BakeryTour />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
