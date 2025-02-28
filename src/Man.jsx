import { 족보사용 } from "./족보시스템"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { candyStore } from "./candyStore"

const Man = () => {
  const { candies } = candyStore()
  const { 본가, 성씨 } = 족보사용()

  const students = useSelector((state) => state.studentsSlice)

  useEffect(() => {
    console.log(students)
  }, [students])

  return (
    <div>
      <h1>옆집 아저씨: {students?.length} 명의 학생이 있습니다.</h1>
      <p>{candies.length}의 캔디가 있습니다.</p>
      <button
        onClick={() => {
          alert(`당연하죠. 옆집 사람들은 ${본가} ${성씨} 씨 입니다.`)
          console.log(students)
        }}
      >
        옆집 사람들 어디 성씨 인지 알아요?
      </button>
    </div>
  )
}

export default Man
