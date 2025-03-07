import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/index";
import Signup from "./app/signup/index";
import CRUD from "./app/crud/index";
import { AlertComponent } from "./components";
import AdminPage from "./app/admin/index";
import CreateAdminPage from "./app/admin/create/index";
import { Auth } from "./contexts";

const AppRouter = () => {
  const { isInitialAdmin } = Auth.use();
  return (
    <>
      <AlertComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="signup" Component={Signup} />
          <Route path="crud" Component={CRUD} />

          <Route path="admin">
            <Route index Component={AdminPage} />
            {isInitialAdmin && (
              <Route path="create" Component={CreateAdminPage} />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
