// void

//! return 결과값 위치 (): 오른쪽 => {}
//! return 값이 없을 때는 void 또는 안적어도 됨

//! null => 아무것도 없는 값

// 헛된 아무것도 return 안한다
const fn = (m: string): void => {
  //! 인자값들 모두다 타입을 지정해줘야 함
  //! 인자값 오른편에 : 타입 주면 됨
  console.log(m)
  return
}

fn("hello")
// console.log('hello')

const makeSentence = (w1: string, w2: string, w3: number): string => {
  return w1 + " " + w2 + " " + w3
}
type MakeFn = (w1: string, w2: string, w3: number) => string

const p = makeSentence("안녕하세요,", "저는 사람입니다.", 33)
// '안녕하세요, 저는 사람입니다. 33'

type Fn = (props: string) => void //! return type

type ComponentType = (props: Props) => React.ReactNode
