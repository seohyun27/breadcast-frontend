import { useNavigate, Link } from "react-router-dom";
import signinImg from "../assets/signin.png";
import "./Signin.css";
import { useState } from "react";
import axios from "axios";

export default function Signin() {
  const navigate = useNavigate();

  const Logo = () => {
    navigate("/");
  };

  // 아이디, 비밀번호 상태 관리
  const [id, setId] = useState("");
  const handleId = (e) => {
    setId(e.target.value);
  };

  const [pw, setPw] = useState("");
  const handlePw = (e) => {
    setPw(e.target.value);
  };

  //규칙
  //영문 숫자 포함 5~20자로 입력해주세요
  const id_valid = /^[a-zA-Z0-9]{5,20}$/;
  //영문 숫자 특수문자 포함 8~20자로 입력해주세요
  const pw_valid =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

  // 로그인 토큰 함수 : 세션 방식
  const loginToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          LoginId: id,
          password: pw,
        },
        { withCredentials: true } // 쿠키 주고받기 위해 설정
      );
      console.log("로그인 성공:", response.data);
      navigate(-1); //또는 홈 화면?
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-page-left">
        <button className="logo-button" onClick={Logo}>
          BreadCast
        </button>
        <div className="left-content">
          <h2>쉽게 하나로 모여있는 빵맛집 정보</h2>
          <p>숨은 빵집을 찾아다니는 빵지순례</p>
          <div className="bread-illustration">
            <img src={signinImg} alt="BreadCast" className="bread-img" />
          </div>
        </div>
      </div>

      <div className="signin-page-right">
        <div className="signin-page-right-top">
          <h1>
            Sign-in
            <br />
            BreadCast
          </h1>
          <p>반갑습니다! 로그인하여 참여해보세요</p>
        </div>
        <div className="signin-form">
          <input
            type="text"
            value={id}
            onChange={handleId}
            placeholder="아이디"
            className="signin-input"
          />
          {id !== "" && !id_valid.test(id) && (
            <p className="error-message">
              아이디는 영문+숫자 5~20자여야 합니다.
            </p>
          )}

          <input
            value={pw}
            onChange={handlePw}
            type="password"
            placeholder="비밀번호"
            className="signin-input"
          />
          {pw !== "" && !pw_valid.test(pw) && (
            <p className="error-message">
              비밀번호는 영문, 숫자, 특수문자 포함 8~20자여야 합니다.
            </p>
          )}
          <button
            className="signin-button"
            disabled={!id_valid.test(id) || !pw_valid.test(pw)}
            onClick={loginToken}
          >
            로그인
          </button>
          <Link to="/signup">
            <button className="signup-button"> 회원가입</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* : api 정보
기능	HTTP Method	API 경로
회원가입하기	POST	/auth/signup
로그인하기	POST	/auth/login
로그아웃하기	POST	/auth/logout



1. 로그인하기
LoginId	String	 로그인 ID
password	String		패스워드
*/
