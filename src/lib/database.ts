// const, function앞에 export 적어서 내보내기
export const a = "a"

// 변수, 함수 많이 선언해두고 제일 아래에서 export {변수 , 함수}
const b = "b"
const c = 200

function sayLoud(message: string) {
  alert(message)
}

export { b, c, sayLoud }
