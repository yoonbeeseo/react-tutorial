import { useNavigate } from "react-router-dom";
import { Alert, Item } from "./store";
import { useCallback } from "react";

const Requirement = () => {
  const { items, remove, setPayload } = Item.use();
  const { alert } = Alert.use();
  const navi = useNavigate();

  //! 리액트 컴포넌트 안에서 또 다른 리액트 컴포넌트를 만들어 쓰지 마세요!
  //! useCallback에 감싸서 만들면 허용해줌

  //? 리액트 컴포넌트에서 불러온 함수를 손 쉽게 props-drilling 없이 공유할 수 있음
  //? 멀리 안나가도 맵으로 뿌릴 컴포넌트 확인이 빠름
  const RItem = useCallback(
    ({
      descs,
      id,
      index,
      manager,
      status,
      title,
    }: Item.Item & { index: number }) => {
      return (
        <div className="border p-5 border-gray-200 bg-gray-50 hover:bg-orange-50 rounded-xl">
          <div className="flex justify-between">
            <div className="flex gap-x-2.5 items-center">
              <p className="font-bold">
                {index + 1}. {title}
              </p>
              <p className="text-xs text-gray-500">{manager}</p>
            </div>
            <p
              className={
                status === "완료"
                  ? "text-blue-500"
                  : status === "계획중"
                  ? "text-red-500"
                  : "text-orange-400"
              }
            >
              {status}
            </p>
          </div>

          <ul className="flex flex-col mt-2.5 gap-y-1">
            {descs.map((desc, di) => (
              <li key={desc} className="flex">
                <p className="bg-white rounded text-gray-500 p-1 py-0 text-xs">
                  {di + 1}. {desc}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex justify-end gap-x-2.5">
            <button
              className="cursor-pointer"
              onClick={() => {
                setPayload({ descs, id, manager, status, title });
                navi(id);
              }}
            >
              수정
            </button>
            <button
              className="cursor-pointer hover:text-red-500 active:opacity-50"
              onClick={() => {
                remove(id);
                alert("삭제되었습니다.");
              }}
            >
              삭제
            </button>
          </div>
        </div>
      );
    },
    [remove, alert, navi, setPayload]
  );

  return (
    <ul className="flex flex-col gap-y-2.5">
      {items.map((item, index) => (
        <li key={item.id}>
          <RItem {...item} index={index} />
        </li>
      ))}
    </ul>
  );
};

export default Requirement;

// const RItem = ({
//   descs,
//   id,
//   index,
//   manager,
//   status,
//   title,
// }: Item.Item & { index: number }) => {
//   return (
//     <div>
//       {index + 1}. {title} by {manager} - 상태: {status}
//     </div>
//   );
// };
