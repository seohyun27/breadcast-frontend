import { useNavigate } from "react-router-dom";
import signinImg from "../assets/signin.png";
import "./Signin.css";

export default function Signin() {
  const navigate = useNavigate();

  const Logo = () => {
    navigate("/");
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
          <input type="text" placeholder="아이디" className="signin-input" />
          <input
            type="password"
            placeholder="비밀번호"
            className="signin-input"
          />
          <button className="signin-button">로그인</button>
          <button className="signup-button">회원가입</button>
        </div>
      </div>
    </div>
  );
}
