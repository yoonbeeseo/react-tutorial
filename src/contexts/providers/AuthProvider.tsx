import { useState, useEffect, PropsWithChildren } from "react";
import { Auth } from "../hooks";
import { dbService, authService } from "../../lib";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [init, setInit] = useState(false);
  const [isInitialAdmin, setIsInitialAdmin] = useState(false);

  const [user, setUser] = useState(Auth.initialState.user);

  const [admin, setAdmin] = useState(Auth.initialState.admin);

  useEffect(() => {
    const subAdmin = dbService.collection("admin").onSnapshot((snap) => {
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
    const subAuth = authService.onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        console.log("user logged in", fbUser);
        if (fbUser.uid === import.meta.env.VITE_ADMIN_UID) {
          const ref = dbService.collection("admin").doc(fbUser.uid);
          const snap = await ref.get();
          const data = snap.data() as Auth.Admin;
          setAdmin(data);
        }
      } else {
        console.log("no user logged in");
        setUser(null);
      }
      setInit(true);
    });

    subAuth;

    return subAuth;
  }, []);

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      const id = JSON.parse(uid);
      if (id) {
        const fetchUser = async () => {
          const ref = dbService.collection("users").doc(id);
          const snap = await ref.get();
          const data = snap.data();
          if (data) {
            delete data.password;

            setUser(data as User);
          } else {
            console.log("No Such User");
            setUser(null);
          }
        };
        fetchUser();
        return () => {
          fetchUser();
        };
      }
    }
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
