import PropTypes from "prop-types"
import { useState } from "react"
import { v4 } from "uuid"

const Form = ({ students, setStudents, isEditing, payload, onCancel }) => {
  const [student, setStudent] = useState(
    payload ?? {
      name: "",
      age: 0,
      mobile: "010",
      id: v4(),
    }
  )

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (student.name.length === 0) {
          alert("학생 이름을 입력해주세요.")
          return
        }
        if (student.age === 0) {
          alert("학생 나이를 입력해주세요.")
          return
        }
        if (student.mobile.length !== 11) {
          alert("연락처를 확인해주세요.")
          return
        }

        if (!isEditing) {
          const foundStudent = students.find((item) => item.mobile === student.mobile)
          if (foundStudent) {
            alert("이미 추가된 학생입니다.")
            return
          }
        }

        setStudents((prev) =>
          isEditing ? prev.map((item) => (item.id === student.id ? { ...student } : item)) : [student, ...prev]
        )

        alert(isEditing ? "수정되었습니다." : "추가되었습니다.")
        if (!isEditing) {
          setStudent({
            name: "",
            age: 0,
            mobile: "010",
            id: v4(),
          })
        } else {
          onCancel()
        }
      }}
    >
      <input
        type="text"
        value={student.name}
        onChange={(e) => setStudent((prev) => ({ ...prev, name: e.target.value }))}
        placeholder="학생 이름"
      />
      <input
        type="text"
        value={student.age}
        onChange={(e) => setStudent((prev) => ({ ...prev, age: Number(e.target.value) }))}
        placeholder="학생 나이"
      />
      <input
        type="text"
        value={student.mobile}
        onChange={(e) => setStudent((prev) => ({ ...prev, mobile: e.target.value }))}
        placeholder="학생 연락처"
      />
      <button>{isEditing ? "수정" : "추가"}</button>
      {isEditing && (
        <button type="button" onClick={onCancel}>
          취소
        </button>
      )}
    </form>
  )
}

export default Form

Form.propTypes = {
  students: PropTypes.array,
  setStudents: PropTypes.func,
  isEditing: PropTypes.bool,
  payload: PropTypes.object,
  onCancel: PropTypes.func,
}
