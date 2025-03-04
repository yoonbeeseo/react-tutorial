import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./index";
import SigninPage from "./signin";

//! routes => 경로
//! appRouter는 웹의 모든 경로를 관리하는 곳
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 
                //! Route 태그의  path 속성이 주소의 경로가 됨 
                //! element속성에서는 리액트 컴포넌트르 < /> 형태로 담아주면 됨
                // */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
