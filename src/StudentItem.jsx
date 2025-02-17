import PropTypes from "prop-types"
import Form from "./Form"
import { useState } from "react"

const StudentItem = ({ student, index, setStudents, students }) => {
  const onDelete = () => {
    setStudents((prev) => prev.filter((item) => item.id !== student.id))
  }

  const [isEditing, setIsEditing] = useState(false)
  const editHandler = () => setIsEditing((prev) => !prev)

  return (
    <div>
      {isEditing ? (
        <Form
          setStudents={setStudents}
          students={students}
          payload={student}
          isEditing={isEditing}
          onCancel={editHandler}
        />
      ) : (
        <>
          {index + 1}. {student.name}, {student.age} {student.mobile}
          <button onClick={editHandler}>수정</button>
          <button onClick={onDelete}>삭제</button>
        </>
      )}
    </div>
  )
}

export default StudentItem

StudentItem.propTypes = {
  student: PropTypes.object,
  index: PropTypes.number,
  setStudents: PropTypes.func,
  students: PropTypes.array,
}
