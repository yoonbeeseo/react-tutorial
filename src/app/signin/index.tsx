import React, { useState, FormEvent, useEffect } from "react";
import { 유저 } from "../../AppProvider/시스템";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const navi = useNavigate();
  const { login } = 유저.use();

  const [loginProps, setLoginProps] = useState({
    email: "test@test.com",
    password: "123123",
  });

  const onSubmit = () => {
    const res = login(loginProps.email, loginProps.password);
    if (typeof res === "string") {
      return alert(res);
    }
    alert(`안녕하세요, ${res.email} 님!`);
    navi("/");
  };

  return (
    <form
      className="flex flex-col gap-y-2.5 max-w-75 mx-auto p-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={div}>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          className={input}
          type="email"
          id="email"
          placeholder="sample@sample.com"
          value={loginProps.email}
          onChange={(e) =>
            setLoginProps((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <div className={div}>
        <label htmlFor="password" className={label}>
          Password
        </label>
        <input
          className={input}
          type="password"
          id="password"
          placeholder="********"
          value={loginProps.password}
          onChange={(e) =>
            setLoginProps((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>
      <button className="bg-teal-500 h-10 rounded text-white cursor-pointer">
        로그인
      </button>
    </form>
  );
};

export default SigninPage;

const div = "flex flex-col gap-y-1";
const label = "text-gray-500 text-xs";
const input =
  "bg-gray-100 focus:bg-gray-50 border-none outline-none h-10 rounded px-2.5";
