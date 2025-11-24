/*
photo1	빵집 사진
photo2	빵집 사진
name	빵집 이름 
-> 보여진 다음에 (위의 변수명으로 데이터를 가져와야됨)

홈 메뉴가 보여지고 
address	빵집 주소
phone	빵집 연락처
URL	빵집 사이트
이것들이 보여져야 됨  사진처럼

id	빵집 ID
name	빵집 이름
address	빵집 주소
phone	빵집 연락처
latitude	빵집의 위도 (y좌표)
longitude	빵집의 경도 (x좌표)
URL	빵집 사이트
photo1	빵집 사진
photo2	빵집 사진
name	빵집 이름 
rating	빵집 평균 별점
favorite_count	빵집 좋아요 수
review_count	빵집 리뷰 수
 */
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BakeryDetail.css";

export default function BakeryDetail() {
  const { bakeryId } = useParams();
  const navigate = useNavigate();
  const [bakery, setBakery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [mapError, setMapError] = useState(null);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  // 빵집 상세 정보 불러오기
  useEffect(() => {
    const fetchBakeryDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `http://localhost:8000/api/bakeries/${bakeryId}`
        );
        setBakery(res.data.data);
      } catch (err) {
        console.error("빵집 상세 정보 불러오기 실패:", err);
        setError("빵집 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBakeryDetail();
  }, [bakeryId]);

  // 카카오맵 초기화
  useEffect(() => {
    if (!bakery) return;

    const loadMap = () => {
      if (!window.kakao || !window.kakao.maps || !mapRef.current) {
        setMapError("카카오 지도 객체를 불러오지 못했습니다.");
        return;
      }

      const position = new window.kakao.maps.LatLng(
        bakery.latitude,
        bakery.longitude
      );

      const options = {
        center: position,
        level: 3,
      };

      mapInstance.current = new window.kakao.maps.Map(mapRef.current, options);

      // 마커 추가
      const marker = new window.kakao.maps.Marker({
        position: position,
        map: mapInstance.current,
      });

      setMapError(null);
    };

    const kakaoMapKey = import.meta.env.VITE_KAKAO_MAP_KEY;

    if (!kakaoMapKey) {
      setMapError("카카오맵 API 키가 필요합니다.");
      return;
    }

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(loadMap);
      return;
    }

    const existingScript = document.querySelector("script[data-kakao-maps]");
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        window.kakao.maps.load(loadMap);
      });
      return;
    }

    const script = document.createElement("script");
    const kakaoSdkUrl = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;
    script.src = kakaoSdkUrl;
    script.async = true;
    script.dataset.kakaoMaps = "true";
    script.onload = () => {
      window.kakao.maps.load(loadMap);
    };
    script.onerror = () => {
      setMapError("카카오 지도 스크립트를 불러오지 못했습니다.");
    };
    document.head.appendChild(script);
  }, [bakery]);

  // 뒤로 가기
  const handleGoBack = () => {
    navigate(-1);
  };

  // 사진 슬라이드
  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 1 ? 0 : 1));
  };

  if (loading) {
    return <div className="loading-container">로딩 중...</div>;
  }

  if (error) {
    return (
      <div className="loading-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleGoBack} className="back-button">
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (!bakery) {
    return (
      <div className="loading-container">빵집 정보를 찾을 수 없습니다.</div>
    );
  }

  const photos = [bakery.photo1, bakery.photo2].filter(Boolean);

  return (
    <div className="bakery-detail-page">
      {/* 왼쪽: 상세 정보 */}
      <div className="detail-left-panel">
        {/* 사진 갤러리 */}
        <div className="photo-gallery">
          <button className="photo-nav-btn prev" onClick={handlePrevPhoto}>
            ‹
          </button>
          <img
            src={photos[currentPhotoIndex]}
            alt={bakery.name}
            className="main-photo"
          />
          <button className="photo-nav-btn next" onClick={handleNextPhoto}>
            ›
          </button>
          <button className="close-btn" onClick={handleGoBack}>
            ✕
          </button>
        </div>

        {/* 빵집 기본 정보 */}
        <div className="bakery-header">
          <h1 className="bakery-title">{bakery.name}</h1>
          <button className="favorite-btn">
            <span className="heart">🤍</span>
          </button>
        </div>

        {/* 탭 메뉴 */}
        <div className="tab-menu">
          <button
            className={`tab-btn ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            홈
          </button>
          <button
            className={`tab-btn ${activeTab === "menu" ? "active" : ""}`}
            onClick={() => setActiveTab("menu")}
          >
            메뉴
          </button>
          <button
            className={`tab-btn ${activeTab === "review" ? "active" : ""}`}
            onClick={() => setActiveTab("review")}
          >
            리뷰
          </button>
          <button
            className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            제보
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="tab-content">
          {activeTab === "home" && (
            <div className="home-tab">
              {/* 주소 */}
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div className="info-text">
                  <div className="info-label">{bakery.address}</div>
                  <div className="info-sub">사월역 2번 출구에서 452m</div>
                </div>
              </div>

              {/* 영업 시간 */}
              <div className="info-item">
                <span className="info-icon">🕐</span>
                <div className="info-text">
                  <div className="info-label">영업 종료</div>
                  <div className="info-sub">10:00에 영업 시작</div>
                </div>
              </div>

              {/* 전화번호 */}
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div className="info-text">
                  <a href={`tel:${bakery.phone}`} className="info-link">
                    {bakery.phone}
                  </a>
                  <span className="copy-text">복사</span>
                </div>
              </div>

              {/* 웹사이트 */}
              {bakery.URL && (
                <div className="info-item">
                  <span className="info-icon">🌐</span>
                  <div className="info-text">
                    <a
                      href={bakery.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-link"
                    >
                      {bakery.URL}
                    </a>
                  </div>
                </div>
              )}

              {/* 통계 */}
              <div className="stats-section">
                <div className="stat-item">
                  <span className="stat-icon">⭐</span>
                  <span className="stat-value">{bakery.rating}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">❤️</span>
                  <span className="stat-value">{bakery.favorite_count}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">💬</span>
                  <span className="stat-value">{bakery.review_count}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "menu" && (
            <div className="menu-tab">
              <p className="empty-message">메뉴 정보가 없습니다.</p>
            </div>
          )}

          {activeTab === "review" && (
            <div className="review-tab">
              <p className="empty-message">리뷰가 없습니다.</p>
            </div>
          )}

          {activeTab === "info" && (
            <div className="info-tab">
              <p className="empty-message">제보 정보가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽: 지도 */}
      <div className="detail-right-panel">
        <div className="detail-map-container">
          {mapError ? (
            <div className="map-error">{mapError}</div>
          ) : (
            <div ref={mapRef} className="kakao-map"></div>
          )}
        </div>
      </div>
    </div>
  );
}
