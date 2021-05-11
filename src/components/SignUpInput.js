import React, { useState } from "react";

const SignUpInput = () => {
       const [id, setId] = useState("");
       const [pw, setPw] = useState("");
       const [pwC, setPwC] = useState("");

       const submitHandler = () => {

       }

       const idChangeHandler = (e) => {
              setId(e.currentTarget.value);
       }
       const pwChangeHandler = (e) => {
              setPw(e.currentTarget.value);
       }
              
       const pwCChangeHandler = (e) => {
              setPwC(e.currentTarget.value);
       }

       return (
              <form onSubmit={submitHandler}>
                     <label>
                            아이디
                     </label>
                     <input type="text" value={id} onChange={idChangeHandler} />
                     <label>
                            비밀번호
                     </label>
                     <input type="password" value={pw} onChange={pwChangeHandler} />
                     <label>
                            비밀번호 확인
                     </label>
                     <input type="password" value={pwC} onChange={pwCChangeHandler} />
                     <button>SIGN UP</button>
              </form>
       );
}


export default SignUpInput