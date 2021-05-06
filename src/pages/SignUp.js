import React from "react";
import Email from "./Email";
import Nickname from "./Nickname";
import Password from "./Password";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
​
class Signup extends React.Component {
  constructor(props) {
    super(props);
​
    this.state = {
      email: "",
      nickname: "",
      pw: "",
      re_pw: "",
      emailCheck: "",
      nicknameCheck: "",
      pwCheck: ""
    };
  }
  //이메일 인풋창 핸들링
  handleEmail = e => {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  };
  //이메일 중복검사
  checkEmail = e => {
    e.preventDefault();
​
    //이메일 유효성 검사 함수
    const chkEmail = function(str) {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regExp.test(str) ? true : false;
    };
​
    const inputEmail = {
      email: this.state.email
    };
    const email_info = {
      method: "POST",
      body: JSON.stringify(inputEmail),
      headers: {
        "Content-Type": "application/json"
      }
    };
​
    if (chkEmail(this.state.email) === false) {
      alert("이메일 형식이 유효하지 않습니다.");
      this.setState({
        email: ""
      });
    } else {
      fetch("http://localhost:9089/user/email", email_info)
        .then(res => res.json())
        .then(json => {
          if (json === true) {
            alert("사용가능 한 아이디입니다");
            this.setState({
              emailCheck: this.state.email
            });
          } else {
            alert("이미 존재하는 아이디입니다");
          }
        });
    }
  };
​
  //닉네임 인풋창 핸들링
  handleNickname = e => {
    e.preventDefault();
    this.setState({
      nickname: e.target.value
    });
  };
  //닉네임 중복검사
  checkNickname = e => {
    e.preventDefault();
​
    const chkNickname = function(str) {
      var regNm = /^[가-힣]{2,15}|[a-zA-Z]{2,15}\s[a-zA-Z]{2,15}$/;
      return regNm.test(str) ? true : false;
    };
​
    const inputNickname = {
      nickname: this.state.nickname
    };
​
    const nickname_info = {
      method: "POST",
      body: JSON.stringify(inputNickname),
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (chkNickname(this.state.nickname) === false) {
      alert("한글,영문 대소문자 2~15자리만 사용 가능합니다");
    } else {
      fetch("http://localhost:9089/user/nick", nickname_info)
        .then(res => res.json())
        .then(json => {
          if (json === true) {
            alert("사용 가능한 닉네임입니다.");
            this.setState({
              nicknameCheck: this.state.nickname
            });
          } else {
            alert("이미 존재하는 닉네임입니다.");
          }
        });
    }
  };
  //첫번째 패스워드 입력창 set변환
  handlePW = e => {
    e.preventDefault();
    this.setState({
      pw: e.target.value
    });
  };
  //두번째 패스워드 입력창 set변환
  handleRE_PW = e => {
    e.preventDefault();
    this.setState({
      re_pw: e.target.value
    });
  };
  //첫번 째 두번 째 패스워드 일치 확인
  checkPW = e => {
    e.preventDefault();
​
    //비밀번호 유효성검사(영문,숫자 혼합 6~20)
    const chkPwd = function(str) {
      var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      return !reg_pwd.test(str) ? false : true;
    };
​
    if (chkPwd(this.state.re_pw) === false) {
      alert("영문,숫자를 혼합하여 6~12자 이내");
      this.setState({
        pw: "",
        re_pw: ""
      });
    } else {
      if (this.state.pw === this.state.re_pw) {
        alert("일치합니다.");
        this.setState({
          pwCheck: this.state.re_pw
        });
      } else {
        alert("불일치합니다.");
      }
    }
  };
  //서버로 가입 양식 제출
  handleSubmit = e => {
    e.preventDefault();
    const {
      email,
      emailCheck,
      nickname,
      nicknameCheck,
      pwCheck,
      pw,
      re_pw
    } = this.state;
​
    const signupInfo = {
      email: this.state.emailCheck,
      pw: this.state.pwCheck,
      nickname: this.state.nicknameCheck
    };
​
    const signup_info = {
      method: "POST",
      body: JSON.stringify(signupInfo),
      headers: {
        "Content-Type": "application/json"
      }
    };
​
    if (
      email &&
      nickname &&
      pw &&
      re_pw &&
      email === emailCheck &&
      nickname === nicknameCheck &&
      pw === re_pw &&
      re_pw === pwCheck
    ) {
      fetch("http://localhost:9089/user", signup_info)
        .then(alert("가입이 완료되었습니다."))
        .then(this.props.history.push("/login"));
    } else {
      alert("입력값을 확인해주세요");
    }
  };
​
  render() {
    return (
      <div>
        <h1>Signup</h1>
        <br />
        <div>
          <Email
            handleEmail={this.handleEmail}
            checkEmail={this.checkEmail}
            value={this.state.email}
          />
          <Nickname
            handleNickname={this.handleNickname}
            checkNickname={this.checkNickname}
            value={this.state.nickname}
          />
          <Password
            handlePW={this.handlePW}
            handleRE_PW={this.handleRE_PW}
            checkPW={this.checkPW}
            value1={this.state.pw}
            value2={this.state.re_pw}
          />
          <div>
            <button onClick={this.handleSubmit}>가입하기</button>
          </div>
        </div>
      </div>
    );
  }
}
​
export default Signup;
​