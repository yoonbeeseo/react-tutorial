//! fileName.d.ts // d=> dev. 개발할때만 쓰는 파일 전역관리 가능

type StudentName = "김영화" | "유경환" | "강찬희" | "강산" | "허승이"

interface Student {
  name: StudentName | ""
  mobile: string
}

//! d.ts 파일에서 상단에 뭔가를 불러오면 전역으로 사용할 때 import 해서 써야 함
