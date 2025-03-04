import { 족보 } from "./시스템";
import { useState, useEffect, PropsWithChildren } from "react";

//! 제공하는 시스템을 만들때는 무조건 감싸는 작업을 함
//! PropsWithChildren 이라는 타입으로 children 요소를 받아와서 해당 제공 시스템에 출력해야함
const 족보Provider = ({ children }: PropsWithChildren) => {
  const [성씨, set성씨] = useState("김씨네");
  const [조상들, set조상들] = useState(["김증조", "김고조", "김조상"]);

  return (
    <족보.context.Provider
      value={{
        성씨,
        조상들,
      }}
    >
      {children}
    </족보.context.Provider>
  );
};

export default 족보Provider;
