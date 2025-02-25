import React from "react"

type Node = React.ReactNode

//? type, interface를 일일이 내보내기 할 필요 ㄴㄴ

type SetStudents = React.Dispatch<React.SetStateAction<Student[]>>

// redux
// 상태를 변경해주는 친구
