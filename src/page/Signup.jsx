import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImg from "../assets/signup.png";

import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [idAvailable, setIdAvailable] = useState(null);
  const [nicknameAvailable, setNicknameAvailable] = useState(null);

  const handleLogo = () => {
    navigate("/");
  };

  const handleIdCheck = () => {
    // 중복확인 로직
    console.log("아이디 중복확인");
  };

  const handleNicknameCheck = () => {
    // 중복확인 로직
    console.log("닉네임 중복확인");
  };

  const handleSignup = () => {
    // 회원가입 로직
    console.log("회원가입");
  };

  return (
    <div className="signup-container">
      <div className="signup-page-left">
        <button className="logo-button" onClick={handleLogo}>
          BreadCast
        </button>
        <div className="left-content">
          <h2>쉽게 하나로 모여있는 빵맛집 정보</h2>
          <p>숨은 빵집을 찾아다니는 빵지순례</p>
          <div className="bread-illustration">
            <img src={signupImg} alt="BreadCast" className="bread-img" />
          </div>
        </div>
      </div>

      <div className="signup-page-right">
        <div className="signup-page-right-top">
          <h1>
            sign-up
            <br />
            BreadCast
          </h1>
        </div>
        <div className="signup-form">
          <div className="input-with-button">
            <input
              type="text"
              placeholder="아이디 (영문+숫자 5~20자)"
              className="signup-input"
            />
            <button className="check-button" onClick={handleIdCheck}>
              중복확인
            </button>
          </div>

          <div className="input-with-button">
            <input type="text" placeholder="닉네임" className="signup-input" />
            <button className="check-button" onClick={handleNicknameCheck}>
              중복확인
            </button>
          </div>

          <input
            type="password"
            placeholder="비밀번호 : 영문 소+대 특수문자 부호 8~20자로 입력해주세요"
            className="signup-input-full"
          />

          <input
            type="password"
            placeholder="비밀번호 재확인"
            className="signup-input-full"
          />

          <button className="signup-button" onClick={handleSignup}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
