import { 유저, 족보 } from "../AppProvider/시스템";
import { Link } from "react-router-dom";
import { 박씨족보 } from "../store";
import { useState } from "react";

//! context를 사용하려면 무조건 상위 태그에 Provider가 감싸져 있어야 함

//Todo: React - rrd AppRouter를 Provider로 감싸서 작업하는 방법
//Todo: React - main.tsx에서 App 또는 AppRouter를 Provider로 감싸서 작업하는 방법

const HomePage = () => {
  const { user, logout } = 유저.use();
  const { 성씨, 조상들 } = 족보.use();
  const 박씨네 = 박씨족보.use();

  return !user ? (
    <Link to="/signin" className={button}>
      로그인하세요
    </Link>
  ) : (
    <div>
      <h1 className="text-xl font-bold">{user.email}</h1>
      <p>{user.uid}</p>

      <div>
        <h2>{성씨} 조상</h2>
        <ul>
          {조상들.map((조상, index) => (
            <li key={index}>{조상}</li>
          ))}
        </ul>
      </div>

      <button className={button} onClick={logout}>
        로그아웃
      </button>
    </div>
  );
};

export default HomePage;

const button =
  "h-10 bg-teal-500 text-white px-2.5 flex justify-center items-center rounded cursor-pointer";
