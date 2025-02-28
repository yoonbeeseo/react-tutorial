import { StrictMode, lazy, Suspense } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./store"

const App = lazy(() => import("./App"))

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<h1>App is Loading...</h1>}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
)
