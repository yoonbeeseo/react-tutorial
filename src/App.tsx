const App = () => {
  type SetTimeOutFn = (fn: () => void, ms: number) => void

  const myFn = (newFn: () => void, ms: number) => {
    newFn()
    console.log("delay time", ms)
    return
    console.log("fire")
  }

  // const fireButton = document.querySelector("#fireButton")
  // fireButton?.addEventListener("click", (e) => {
  //   console.log(e.target)
  // })

  const ReactFn = (fn: (e?: any) => void) => {
    fn()
  }

  return (
    <div>
      <h1>App</h1>
      <button id="fireButton" onClick={(e) => ReactFn(() => console.log(e.target))}>
        FIRE
      </button>
    </div>
  )
}

export default App
