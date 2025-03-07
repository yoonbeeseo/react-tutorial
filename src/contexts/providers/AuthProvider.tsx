import { useState, useEffect, PropsWithChildren } from "react";
import { Auth } from "../hooks";
import { dbSerivce, authService } from "../../lib";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [init, setInit] = useState(false);
  const [isInitialAdmin, setIsInitialAdmin] = useState(false);

  const [user, setUser] = useState(Auth.initialState.user);

  const [admin, setAdmin] = useState(Auth.initialState.admin);

  useEffect(() => {
    const subAdmin = dbSerivce.collection("admin").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({ ...(doc.data() as any) }));

      if (data.length === 0) {
        setIsInitialAdmin(true);
      } else {
        setIsInitialAdmin(false);
        // setAdmin(data[0]);
        // admin user
      }
    });

    subAdmin;
    return subAdmin;
  }, []);

  useEffect(() => {
    const subAuth = authService.onAuthStateChanged((fbUser) => {
      if (fbUser) {
        console.log("user logged in", fbUser);
      } else {
        console.log("no user logged in");
        setUser(null);
      }
      setInit(true);
    });

    subAuth;

    return subAuth;
  }, []);

  return (
    <Auth.context.Provider
      value={{
        admin,
        init,
        isInitialAdmin,
        user,
      }}
    >
      {children}
    </Auth.context.Provider>
  );
};

export default AuthProvider;
