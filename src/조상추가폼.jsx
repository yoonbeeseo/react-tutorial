import { 족보사용 } from "./족보시스템"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addStudent } from "./studentSlice"

const 조상추가폼 = () => {
  const { 조상추가, 조상들 } = 족보사용()

  useEffect(() => {
    console.log(조상들)
  }, [조상들])

  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => 조상추가("김진짜조상")}>김 ㅇㅇㅇ 추가</button>
      <button
        onClick={() => {
          dispatch(addStudent())
        }}
      >
        학생 추가
      </button>
    </div>
  )
}

export default 조상추가폼
