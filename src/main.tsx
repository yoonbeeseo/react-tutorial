import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 유저Provider from "./AppProvider/유저Provider.tsx";
import 족보Provider from "./AppProvider/족보Provider.tsx";
import AppRouter from "./app/AppRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <유저Provider>
      <족보Provider>
        <AppRouter />
      </족보Provider>
    </유저Provider>
  </StrictMode>
);
