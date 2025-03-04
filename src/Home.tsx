import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Alert } from "./store";

const Home = () => {
  const { alert } = Alert.use();
  const initialState = useMemo(() => {
    return { email: "", password: "" };
  }, []);
  const [props, setProps] = useState(initialState);

  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="yourEmail@email.com"
          value={props.email}
          onChange={(e) =>
            setProps((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="* * * * * * * *"
          value={props.password}
          onChange={(e) =>
            setProps((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>
      <button>로그인</button>
    </form>
  );
};

export default Home;
