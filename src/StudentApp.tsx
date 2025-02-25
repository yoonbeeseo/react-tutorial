import { useState } from "react"
import StudentItem from "./StudentItem"
import StudentForm from "./StudentForm"

const StudentApp = () => {
  const [students, setStudents] = useState<Student[]>([{ name: "강산", mobile: "01012341234" }])

  return (
    <div>
      <h1 className="text-red-500 text-3xl font-[900]">StudentApp</h1>
      <StudentForm setStudents={setStudents} students={students} />

      <ul className="flex flex-col max-w-75 mx-auto p-5 gap-y-2.5">
        {students.map((item) => {
          // return <StudentItem key={item.name} mobile={item.mobile} name={item.name} />
          return <StudentItem key={item.name} item={item} setStudents={setStudents} students={students} />
        })}
      </ul>
    </div>
  )
}

export default StudentApp
