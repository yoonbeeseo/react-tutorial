import { useState, FormEvent, ChangeEvent } from "react"
import { SetStudents } from "./@types/react"

interface Props {
  students: Student[]
  setStudents: SetStudents

  payload?: Student
  onCancel?: () => void
  isEdit?: boolean
}

const StudentForm = ({ setStudents, students, isEdit, onCancel, payload }: Props) => {
  const [student, setStudent] = useState<Student>(
    //! 조건 또는 값 ?? 앞의 조건 또는 값이 없을 때 값을 넣음
    payload ?? {
      mobile: "",
      name: "",
    }
  )

  const onChangeName = (e: ChangeEvent<HTMLSelectElement>) => {
    setStudent((prev) => ({ ...prev, name: e.target.value as StudentName }))
  }

  const onChangeMobile = (e: ChangeEvent<HTMLInputElement>) => {
    setStudent((prev) => ({ ...prev, mobile: e.target.value }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (student.name.length === 0) {
      return alert("학생 이름을 선택해주세요.")
    }
    if (student.mobile.length !== 11) {
      return alert("학생 연락처를 확인해주세요.")
    }

    if (isEdit) {
      setStudents((prev) =>
        prev.map((item) => (item.name === student.name ? { ...item, mobile: student.mobile } : item))
      )
      return onCancel && onCancel()
    }

    const found = students.find((item) => item.name === student.name)
    if (found) {
      return alert("이미 추가된 학생입니다.")
    }
    setStudents((prev) => [student, ...prev])
    setStudent({ mobile: "", name: "" })
  }

  return (
    <form action="" onSubmit={onSubmit} className="flex flex-col p-5 max-w-75 mx-auto">
      <label htmlFor="name" className="text-xs text-gray-500 mb-1">
        학생이름
      </label>
      <select
        name=""
        id="name"
        className="border py-2.5 border-gray-200 rounded  focus:border-red-500 outline-none mb-2.5 h-10"
        value={student.name}
        onChange={onChangeName}
      >
        <option>학생 이름 선택</option>
        {names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <label htmlFor="mobile" className="text-xs text-gray-500 mb-1">
        연락처
      </label>
      <input
        type="text"
        id="mobile"
        className="border rounded border-gray-200 h-10 px-2.5 outline-none focus:border-red-500 mb-5"
        value={student.mobile}
        onChange={onChangeMobile}
      />

      <div className="flex gap-x-2.5">
        <button className="rounded h-10 bg-red-500 text-white cursor-pointer hover:opacity-80 active:opacity-50 transition flex-1">
          {isEdit ? "EDIT" : "ADD"}
        </button>
        {isEdit && (
          <button type="button" className="border px-2.5 rounded text-gray-200 hover:text-gray-500 cursor-pointer">
            취소
          </button>
        )}
      </div>
    </form>
  )
}

export default StudentForm

const names: StudentName[] = ["강산", "강찬희", "김영화", "유경환", "허승이"]
