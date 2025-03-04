import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  FormEvent,
} from "react";
import { Alert } from "./store";
import { Auth } from "./contextApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navi = useNavigate();
  const { login } = Auth.use();
  const { alert } = Alert.use();
  const initialState = useMemo<Auth.LoginProps>(() => {
    return { email: "test@test.com", password: "123123" };
  }, []);
  const [props, setProps] = useState(initialState);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const emailMessage = useMemo(() => {
    const email = props.email;
    if (email.length === 0) {
      return "이메일을 입력해주세요.";
    }
    return null;
  }, [props.email]);

  const passwordMessage = useMemo(() => {
    const pw = props.password;
    if (pw.length === 0) {
      return "비밀번호를 입력해주세요.";
    }
    if (pw.length < 6) {
      return "비밀번호가 너무 짧습니다.";
    }
    if (pw.length > 18) {
      return "비밀번호가 너무 깁니다.";
    }
    return null;
  }, [props.password]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (emailMessage) {
        return alert(emailMessage, [
          {
            onClick: () => {
              setTimeout(() => {
                emailRef.current?.focus();
              }, 100);
            },
          },
        ]);
      }

      if (passwordMessage) {
        return alert(passwordMessage, [
          {
            onClick: () => {
              setTimeout(() => {
                passwordRef.current?.focus();
              }, 100);
            },
          },
        ]);
      }

      const res = login(props.email, props.password);
      if (typeof res === "string") {
        return alert(res);
      }
      alert(`안녕하세요, ${props.email}님!`);
      navi("/requirement");
    },
    [
      emailRef,
      passwordRef,
      props,
      emailMessage,
      passwordMessage,
      alert,
      login,
      navi,
    ] //! useCallback, useMemo 함수 안에서 사용하는 변수, 함수가 있다면 의존성배열에 무조건 추가해줘야 함
  );

  return (
    <form
      className="flex flex-col gap-y-2.5 p-5 m-5 max-w-100 mx-auto"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-y-1">
        <label htmlFor="email" className="text-xs text-gray-500">
          Email
        </label>
        <input
          ref={emailRef}
          className="bg-gray-100 h-10 px-2.5 rounded outline-none focus:border border-sky-500 focus:bg-gray-50"
          type="email"
          id="email"
          placeholder="yourEmail@email.com"
          value={props.email}
          onChange={(e) =>
            setProps((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="password" className="text-xs text-gray-500">
          Password
        </label>
        <input
          ref={passwordRef}
          className="bg-gray-100 h-10 px-2.5 rounded outline-none focus:border border-sky-500 focus:bg-gray-50"
          type="password"
          id="password"
          placeholder="* * * * * * * *"
          value={props.password}
          onChange={(e) =>
            setProps((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>
      <button className="rounded bg-sky-500 text-white h-10 mt-2.5 cursor-pointer hover:opacity-80 active:opacity-50">
        로그인
      </button>
    </form>
  );
};

export default Home;
