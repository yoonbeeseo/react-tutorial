import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/index";
import Signup from "./app/signup/index";
import { AlertComponent } from "./components";
// import AdminPage from "./app/admin";

const AppRouter = () => {
  return (
    <>
      <AlertComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="signup" Component={Signup} />
          <Route path="admin">
            {/* <Route index Component={AdminPage} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
