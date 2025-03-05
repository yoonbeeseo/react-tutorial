import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Requirement from "./Requirement";
import RequirementForm from "./RequirementForm";
import CustomAlert from "./components/CustomAlert";
import { Auth } from "./contextApi";
import NotFound from "./NotFound";
import RLayout from "./RLayout";

export default function AppRouter() {
  const { initialized, user } = Auth.use();
  return (
    <>
      <CustomAlert />
      {!initialized ? (
        <div className="w-full h-screen bg-sky-500 text-white text-6xl font-black flex justify-center items-center">
          <h1>요구사항 명세서</h1>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="*" Component={NotFound} />
            <Route path="/" element={<Home />} />

            {/* path값만 넣고 element속성이 없게 한 뒤 self-closing 이 아니라 오프닝 + 클로징 태그가 존재하면 그 안의 Route에서는 해당 경로를 공유할 수 있다.  */}
            {user && (
              <Route path="/requirement" Component={RLayout}>
                {/* index = 제일 중요한 파일, 위 경로의 페이지를 출력 */}
                <Route index element={<Requirement />} />

                <Route path="create" element={<RequirementForm />} />

                {/* dynamic routing */}
                <Route path=":id" Component={RequirementForm} />
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
