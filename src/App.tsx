// export {} 또는 export 변수. 함수 이름 이런 식으로 내보내기 했을 때는 {} 써서 꺼내옴
//! default로 내보내기 했을 때는 import 기본적으로 그 함수 또는 변수의 이름을 가져옴
// import 정말중요한함수 from "./lib/fn"
//! 내 마음대로 변경해서 가져올 수 있음
//! as 다른 이름
import { a as A, b as B, c as C, sayLoud as Fn2, VFN } from "./lib"
//! index.ts 파일을 통해 취합한 뒤 내보내기 하면 다른 곳에서는 무조건 {} 를 사용해서 꺼내옴
//! 객체처럼 취급

//! 같은 파일에서 다 꺼내올 수 있음. import 영역을 줄일 수 있음.

const App = () => {
  const { firstLetter, lastLetter, length, sayLoud } = "Helloooooox"
  return (
    <div>
      <h1>
        {firstLetter} {lastLetter} {length}
      </h1>
      <button onClick={() => Fn2("Helllooasdfasdfasdfs")}>Click Me</button>
    </div>
  )
}

export default App
