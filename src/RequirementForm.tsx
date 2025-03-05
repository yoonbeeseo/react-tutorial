import {
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
  PropsWithChildren,
  FormEvent,
} from "react";
import { Item, Alert } from "./store";
import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";

const RequirementForm = () => {
  const { pathname } = useLocation();
  const navi = useNavigate();
  const { payload, create, update } = Item.use();
  const { alert } = Alert.use();

  const isUpdating = useMemo<boolean>(() => {
    if (pathname === "/requirement/create") {
      return false;
    }
    if (!payload) {
      return false;
    }
    return true;
  }, [pathname, payload]);

  const initialState = useMemo<Item.Item>(() => {
    if (pathname === "/requirement/create") {
      return { descs: [], id: v4(), manager: "", status: "", title: "" };
    }
    return payload!; //! ! == 무조건 있다. 의심하지 마라
  }, [pathname, payload]);

  const [r, setR] = useState(initialState);

  const onChangeR = useCallback((target: keyof Item.Item, value: any) => {
    //! interface/type의 값들을 문자열로 추출 keyof
    //! any 모든 타입을 허용
    setR((prev) => ({ ...prev, [target]: value }));
  }, []);

  const [desc, setDesc] = useState("");
  const [isInsertingDesc, setIsInsertingDesc] = useState(false);

  const tRef = useRef<HTMLInputElement>(null);
  const sRef = useRef<HTMLSelectElement>(null);
  const mRef = useRef<HTMLSelectElement>(null);
  const dRef = useRef<HTMLInputElement>(null);

  const focus = useCallback(
    (target: keyof Item.Item) => {
      setTimeout(() => {
        switch (target) {
          case "descs":
            return dRef.current?.focus(); //! useRef의 초기값이  null 이기 때문에 없을 수도 있음 그래서 안정빵 느낌을 ?. 을 사용 ? 앞의 값이 있으면

          case "manager":
            return mRef.current?.showPicker();

          case "status":
            return sRef.current?.showPicker();

          case "title":
            return tRef.current?.focus();
        }
      }, 100);
    },
    [tRef, sRef, mRef, dRef]
  );

  const sMessage = useMemo(() => {
    const status = r.status;
    if (status.length === 0) {
      return "진행상태를 선택해주세요.";
    }

    return null;
  }, [r.status]);

  const mMessage = useMemo(() => {
    const manager = r.manager;
    if (manager.length === 0) {
      return "담당자를 선택해주세요.";
    }

    return null;
  }, [r.manager]);

  const tMessage = useMemo(() => {
    const title = r.title;
    if (title.length === 0) {
      return "기능/페이지 이름을 적어주세요.";
    }

    return null;
  }, [r.title]);

  const dMessage = useMemo(() => {
    if (!isInsertingDesc) {
      return null;
    }
    if (desc.length === 0) {
      return "상세 기능을 입력해주세요.";
    }

    return null;
  }, [desc, isInsertingDesc]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isInsertingDesc) {
        return;
      }

      if (sMessage) {
        return alert(sMessage, [{ onClick: () => focus("status") }]);
      }

      if (mMessage) {
        return alert(mMessage, [{ onClick: () => focus("manager") }]);
      }

      if (tMessage) {
        return alert(tMessage, [{ onClick: () => focus("title") }]);
      }

      if (isUpdating) {
        update(r);
      } else {
        create(r);
      }
      alert(isUpdating ? "수정되었습니다." : "추가되었습니다.");
      navi("/requirement");
    },
    [
      isInsertingDesc,
      sMessage,
      mMessage,
      tMessage,
      r,
      isUpdating,
      focus,
      alert,
      create,
      update,
      navi,
    ]
  );

  useEffect(() => {
    if (!isUpdating) {
      focus("status");
    }
  }, []);

  return (
    <form
      className="flex flex-col gap-y-2.5 w-full max-w-125 mx-auto"
      onSubmit={onSubmit}
    >
      <div className="flex gap-x-2.5">
        <InputWrapper id="status" title="진행상태" className="flex-1">
          <select
            id="status"
            className={input}
            value={r.status}
            onChange={(e) => {
              onChangeR("status", e.target.value);
              focus("manager");
            }}
            ref={sRef}
          >
            <option>선택</option>
            {statuses.map((s) => (
              <option value={s} key={s}>
                {s}
              </option>
            ))}
          </select>
        </InputWrapper>
        <InputWrapper id="manager" title="담당자" className="flex-1">
          <select
            id="manager"
            className={input}
            value={r.manager}
            onChange={(e) => {
              onChangeR("manager", e.target.value);
              focus("title");
            }}
            ref={mRef}
          >
            <option>선택</option>
            {managers.map((m) => (
              <option value={m} key={m}>
                {m}
              </option>
            ))}
          </select>
        </InputWrapper>
      </div>

      <InputWrapper id="title" title="기능/페이지 이름">
        <input
          type="text"
          id="title"
          className={twMerge(input, "px-2.5")}
          value={r.title}
          onChange={(e) => onChangeR("title", e.target.value)}
          ref={tRef}
          placeholder="요구사항 기능 이름을 입력해주세요."
        />
      </InputWrapper>

      <InputWrapper id="desc" title="상세기능">
        <ul className="flex flex-col gap-y-1">
          {r.descs.map((d, di) => (
            <li className="flex" key={di}>
              <div className="px-1 rounded bg-gray-50">
                {di + 1}. {d}
                <button
                  type="button"
                  className="ml-2.5 cursor-pointer"
                  onClick={() => {
                    setR((prev) => ({
                      ...prev,
                      descs: prev.descs.filter((item) => item !== d),
                    }));
                  }}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
        <input
          type="text"
          id="desc"
          className={twMerge(input, "px-2.5")}
          value={desc}
          ref={dRef}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="상세 기능을 입력하세요."
          onFocus={() => setIsInsertingDesc(true)}
          onBlur={() => setIsInsertingDesc(false)}
          onKeyDown={(e) => {
            const { key } = e;
            if (key === "Enter" || key === "Tab") {
              if (!e.nativeEvent.isComposing) {
                if (dMessage) {
                  return alert(dMessage, [{ onClick: () => focus("descs") }]);
                }
                setR((prev) => ({ ...prev, descs: [desc, ...prev.descs] }));
                setDesc("");
                focus("descs");
              }
            }
          }}
        />
      </InputWrapper>

      <div className="flex gap-x-2.5 mt-2.5s">
        <button
          type="button"
          className={twMerge(button, "flex-1 bg-gray-100")}
          onClick={() =>
            alert("취소하시겠습니까?", [
              { text: "돌아가기" },
              { onClick: () => navi("/requirement") },
            ])
          }
        >
          취소
        </button>
        <button className={twMerge(button, "flex-2 bg-blue-500 text-white")}>
          {isUpdating ? "수정" : "추가"}
        </button>
      </div>
    </form>
  );
};

const button = "h-10 rounded cursor-pointer hover:opactiy-80 active:opacity-50";
const input =
  "h-10 rounded bg-gray-50 outline-none focus:border focus:border-blue-500";

export default RequirementForm;

interface InputWrappProps extends PropsWithChildren {
  id: string;
  title: string;
  className?: string; //! ? 없어도 되는 값
}
const InputWrapper = ({ children, id, title, className }: InputWrappProps) => {
  return (
    <div className={twMerge("flex flex-col gap-y-1", className)}>
      <label htmlFor={id} className="text-gray-500 text-xs">
        {title}
      </label>
      {children}
    </div>
  );
};

const managers: Item.Manager[] = [
  "강산",
  "강찬희",
  "김영화",
  "유경환",
  "허승이",
];

const statuses: Item.Status[] = ["계획중", "진행중", "완료"];
