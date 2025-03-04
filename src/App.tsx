import React, { useState, useEffect } from "react";
import 족보Provider from "./AppProvider/족보Provider";
import { 족보, 유저 } from "./AppProvider/시스템";

interface Family {
  dad: string;
  families: Family[];
}

interface 조상 {
  name: string;
  items: string[];
}

const App = () => {
  const { user } = 유저.use();
  const [families, setFamilies] = useState<Family[]>([
    {
      dad: "김씨네 할아버지",
      families: [
        {
          dad: "김씨네 첫째 아빠",
          families: [
            { dad: "김씨네 첫째 아들", families: [] },
            { dad: "김씨네 둘째 아들", families: [] },
            { dad: "김씨네 셋째 아들", families: [] },
          ],
        },
        {
          dad: "김씨네 둘째 아빠",
          families: [
            { dad: "김씨네 첫째 아들", families: [] },
            { dad: "김씨네 둘째 아들", families: [] },
            { dad: "김씨네 셋째 아들", families: [] },
          ],
        },
      ],
    },
    {
      dad: "박씨네 할아버지",
      families: [
        {
          dad: "박씨네 첫째 아빠",
          families: [
            { dad: "박씨네 첫째 아들", families: [] },
            { dad: "박씨네 둘째 아들", families: [] },
            { dad: "박씨네 셋째 아들", families: [] },
          ],
        },
        {
          dad: "박씨네 둘째 아빠",
          families: [
            { dad: "박씨네 첫째 아들", families: [] },
            { dad: "박씨네 둘째 아들", families: [] },
            { dad: "박씨네 셋째 아들", families: [] },
          ],
        },
      ],
    },
  ]);

  const [조상들, set조상들] = useState<조상[]>([
    { name: "김씨네", items: ["김증조", "김고조", "김조상"] },
    { name: "박씨네", items: ["박증조", "박고조", "박조상"] },
  ]);

  const 조상확인 = (할아버지이름: string) => {
    if (할아버지이름 === "김씨네 할아버지") {
      alert(
        `김씨네 조상은 ${조상들[0].items[0]}, ${조상들[0].items[1]}, ${조상들[0].items[2]}`
      );
    } else {
      alert(
        `박씨네 조상은 ${조상들[1].items[0]}, ${조상들[1].items[1]}, ${조상들[1].items[2]}`
      );
    }
  };

  //! 시스템 제공 시점과 같은 선상에서 시스템 데이터를 사용할 수 없음
  //! 데이터를 사용하려면 제공 시섬 한 단계 아래 레이어 에서 자녀 컴포넌트 속에서 써야 함
  const { 성씨, 조상들: 족보조상들 } = 족보.use();

  return !user ? (
    <h1>로그인하세요</h1>
  ) : (
    <>
      <button onClick={() => console.log({ 성씨, 족보조상들 })}>
        족보출력
      </button>
      <족보Provider>
        <ul>
          {families.map((family, index) => {
            // const { 성씨, 조상들: 족보조상들 } = 족보.use();
            //! map 함수 안에서 리액트 훅 못씀
            //! 별도의 리액트 컴포넌트 만들어서 그 안에서 사용해야 함

            return (
              <자녀
                {...family}
                key={index}
                조상확인={() => 조상확인(family.dad)}
              />
            );
          })}
        </ul>
      </족보Provider>
    </>
  );
};

export default App;

const 자녀 = ({
  dad,
  families,
  조상확인,
}: Family & { 조상확인: () => void }) => {
  const { 성씨, 조상들 } = 족보.use();
  return (
    <li>
      <p>{dad}</p>
      <button onClick={조상확인}>조상확인</button>
      <button onClick={() => console.log({ 성씨, 조상들 })}>족보확인</button>
      <ul>
        {families.map((child, index) => (
          <자녀 {...child} key={index} 조상확인={조상확인} />
        ))}
      </ul>
    </li>
  );
};
