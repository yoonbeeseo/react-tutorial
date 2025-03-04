import { 유저 } from "./시스템";
import { useState, useEffect, PropsWithChildren } from "react";

const 유저Provider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(유저.initialState.user);

  const login = (email: string, password: string) => {
    const credential = "123123";
    if (password !== credential) {
      return "비번이 틀렸습니다.";
    }

    const loggedInUser = { email, uid: "testUid" };

    setUser(loggedInUser);

    return loggedInUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <유저.context.Provider value={{ login, logout, user }}>
      {children}
    </유저.context.Provider>
  );
};

export default 유저Provider;
