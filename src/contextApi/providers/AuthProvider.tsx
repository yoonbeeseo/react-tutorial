import { PropsWithChildren, useCallback, useState, useEffect } from "react";
import { Auth } from "../contexts";

const AuthProvider = ({ children }: PropsWithChildren) => {
  //! process.env.NODE_ENV === 'production' |'development'|
  const [user, setUser] = useState<Auth.User | null>(null);

  const [initialized, setInitialized] = useState(false);

  const login = useCallback((email: string, password: string) => {
    const users: Auth.StoredUser[] = [
      { email: "test@test.com", password: "123123", uid: "testUid" },
      { email: "tes1t@test.com", password: "123121233", uid: "testUid1231" },
    ];

    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      return "존재하지 않는 유저입니다.";
    }

    if (foundUser.password !== password) {
      return "비밀번호가 일치하지 않습니다.";
    }

    delete foundUser.password;
    setUser(foundUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setInitialized(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (initialized) {
      console.log("show contents");
    }
  }, [initialized]);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <Auth.context.Provider
      value={{
        initialized,
        login,
        logout,
        user,
      }}
    >
      {children}
    </Auth.context.Provider>
  );
};

export default AuthProvider;
