import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./app/index";
import Signup from "./app/signup/index";
import Signin from "./app/signin/index";
import CRUD from "./app/crud/index";
import { AlertComponent } from "./components";
import AdminPage from "./app/admin/index";
import AdminStatsPage from "./app/admin/stats/index";
import SurveyPage from "./app/survey/index";
import CreateAdminPage from "./app/admin/create/index";
import { Auth } from "./contexts";

const AppRouter = () => {
  const { isInitialAdmin, user, admin } = Auth.use();
  return (
    <>
      <AlertComponent />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<h1>Page Not Found return home</h1>} />
          <Route path="/" Component={Home} />
          <Route path="signup" Component={Signup} />
          <Route path="signin" Component={Signin} />
          <Route path="crud" Component={CRUD} />
          {user && <Route path="survey" Component={SurveyPage} />}

          <Route path="admin">
            <Route index Component={AdminPage} />
            {admin && <Route path="stats" Component={AdminStatsPage} />}
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
