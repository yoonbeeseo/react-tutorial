import { Link, Outlet, useLocation } from "react-router-dom";

const RLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <header className="border m-5 p-5 rounded-xl bg-gray-50 border-gray-200 flex justify-between">
        <h1 className="text-2xl font-black">요구사항 명세서</h1>
        {pathname !== "/requirement/create" && (
          <Link
            to="/requirement/create"
            className="border w-10 h-10 flex justify-center items-center text-xl rounded bg-white"
          >
            +
          </Link>
        )}
      </header>
      <main className="m-5">
        <Outlet />
      </main>
    </>
  );
};

export default RLayout;
