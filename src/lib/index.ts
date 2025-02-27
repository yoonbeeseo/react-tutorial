//! index 제일 중요한 파일 또는 해당 폴더를 대표하는 파일
export * from "./database"
//? export * from 경로
//? 해당 경로의 파일에서 모든 것들을 내보내기 하겠다.
//? 해당 경로 파일 바깥에서 할 수 있습니다.

//! default 내보낸 값을 내보내기
export { default as VFN } from "./fn"
