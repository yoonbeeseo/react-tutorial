import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import StudentApp from "./StudentApp.tsx"
import RContainer from "./r/RContainer.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RContainer />
    {/* <App /> */}
  </StrictMode>
)
