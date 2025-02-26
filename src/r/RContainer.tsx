import { useState } from "react"
import RForm from "./RForm"
import RItem from "./RItem"

const RContainer = () => {
  const [adding, setAdding] = useState<boolean>(false)
  const addHandler = () => setAdding((prev) => !prev)

  return (
    <div>
      <header className="border-b-1 border-b-gray-200 flex justify-center relative h-15 items-center">
        <h1 className="text-2xl text-sky-500">요구사항 명세서 앱</h1>
        <button
          className="absolute right-2.5 top-2.5 p-2.5 rounded bg-gray-50 w-10 h-10 flex items-center justify-center text-2xl text-gray-500 cursor-pointer hover:bg-sky-500 hover:text-white"
          onClick={() => setAdding(true)}
        >
          +
        </button>
      </header>

      {adding && <RForm />}
      {/* 조건 && 실행코드 : 조건이 참 또는 부합할 때만 오른쪽의 코드를 실행 */}
      <RItem />
      <RItem />
      <RItem />
      <RItem />
    </div>
  )
}

export default RContainer
