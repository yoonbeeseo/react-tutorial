import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/index";
import Signup from "./app/signup/index";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="signup" Component={Signup} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
