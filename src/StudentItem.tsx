import { useState } from "react"
import { SetStudents } from "./@types/react"
import StudentForm from "./StudentForm"

interface Props {
  item: Student // item은 학생입니다.
  students: Student[] //  학생들을 담아둔 배열입니다.
  setStudents: SetStudents // 학생들을 변경하는 함수입니다.
}

//! 전달하지 않아도 되는 값은 ?로 처리한다
const StudentItem = ({ item, setStudents, students }: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const editHandler = () => setIsEdit((prev) => !prev)

  const onDelete = () => {
    if (confirm("삭제하시겠습니까?")) {
      setStudents((prev) => prev.filter((student) => student.name !== item.name))
    }
  }

  return (
    <li className="p-2.5 rounded bg-gray-50 hover:shadow-md flex gap-x-2.5 items-center">
      {isEdit ? (
        <StudentForm
          setStudents={setStudents}
          students={students}
          isEdit={isEdit}
          onCancel={editHandler}
          payload={item}
        />
      ) : (
        <>
          <div className="flex-1">
            <p className="font-bold">{item.name}</p>
            <p className="font-light text-sm text-gray-500">{item.mobile}</p>
          </div>
          <button
            className="bg-teal-500 text-white rounded-full w-10 h-10 cursor-pointer active:opacity-50"
            onClick={editHandler}
          >
            수정
          </button>
          <button
            className="bg-red-500 text-white rounded-full w-10 h-10 cursor-pointer active:opacity-50"
            onClick={onDelete}
          >
            삭제
          </button>
        </>
      )}
    </li>
  )
}

export default StudentItem
