import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImg from "../assets/signup.png";
//  import { useSatate } from "react"; -> 오타!! 주의
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate("/");
  };

  //  상태 관리
  const [id, setId] = useState("");
  const handleId = (e) => {
    setId(e.target.value);
  };

  const [nickname, setNickname] = useState("");
  const handleNickname = (e) => {
    setId(e.target.value);
  };

  const [pw1, setPw1] = useState("");
  const handlePw1 = (e) => {
    setPw(e.target.value);
  };

  const [pw2, setPw2] = useState("");
  const handlePw2 = (e) => {
    setPw(e.target.value);
  };

  //규칙
  const id_valid = /^[a-zA-Z0-9]{5,20}$/;
  const pw1_valid =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

  // 회원가입 처리 함수
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        {
          LoginId: id,
          password: pw1,
          nickname: nickname,
        },
        { withCredentials: true }
      );
      console.log("로그인 성공:", response.data);
      navigate("/signin"); //로그인 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    }
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
              value={id}
              onChange={handleId}
              type="text"
              placeholder="아이디 (영문+숫자 5~20자)"
              className="signup-input"
            />
          </div>
          {id !== "" && !id_valid.test(id) && (
            <p className="error-message">
              아이디는 영문+숫자 5~20자여야 합니다.
            </p>
          )}
          <div className="input-with-button">
            <input
              type="text"
              value={nickname}
              onChange={handleNickname}
              placeholder="닉네임"
              className="signup-input"
            />
          </div>
          <input
            type="password"
            placeholder="비밀번호 : 영문 소+대 특수문자 부호 8~20자로 입력해주세요"
            className="signup-input-full"
          />
          {pw1 !== "" && !pw1_valid.test(id) && (
            <p className="error-message">
              아이디는 영문+숫자 5~20자여야 합니다.
            </p>
          )}
          <input
            type="password"
            placeholder="비밀번호 재확인"
            className="signup-input-full"
          />{" "}
          {pw1 !== "" && pw2 !== "" && pw1 !== pw2 && (
            <p className="error-message">비밀번호가 일치하지 않습니다.</p>
          )}
          <button className="signup-button" onClick={handleSignup}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

/* : api 정보
기능	HTTP Method	API 경로
회원가입하기	POST	/auth/signup


loninId	String	private	유저 로그인 ID
password	String	private	유저 패스워드
nickname	String	private	유저 닉네임
*/
// import { useSatate } from "react"; -> 오타!! 주의
