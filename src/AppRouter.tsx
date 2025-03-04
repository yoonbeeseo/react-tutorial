import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Requirement from "./Requirement";
import RequirementForm from "./RequirementForm";
import RequirementDetail from "./RequirementDetail";
import CustomAlert from "./components/CustomAlert";

export default function AppRouter() {
  return (
    <>
      <CustomAlert />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* path값만 넣고 element속성이 없게 한 뒤 self-closing 이 아니라 오프닝 + 클로징 태그가 존재하면 그 안의 Route에서는 해당 경로를 공유할 수 있다.  */}
          <Route path="/requirement">
            {/* index = 제일 중요한 파일, 위 경로의 페이지를 출력 */}
            <Route index element={<Requirement />} />

            <Route path="create" element={<RequirementForm />} />

            {/* dynamic routing */}
            <Route path=":id">
              <Route index element={<RequirementDetail />} />

              <Route path="edit" element={<RequirementForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
