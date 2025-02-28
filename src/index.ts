const fn = () => {
  console.log("hello World")
}

fn()
// hello world

const fn2 = () => {
  const message = "hello world"
  console.log(message)
}

fn2()
// hellow world

//! 해당 함수를 호출할 때 생생한 정보를 받아오고 싶어서
const fn3 = (message: string) => {
  console.log(message)
}

fn3("asdfasdf")
// hello
fn3("hello World")
// hello World

const fn4 = (fn: () => void) => {
  console.log("나는 배우고 있다.")
  fn()
}

fn4(() => {})
// void

fn4(() => fn3("javascript"))
// 나는 배우고 있다.
// javascript

const fn5 = (fn: () => void, delayTime: number) => {
  console.log("몇 초뒤에?", delayTime, "ms 뒤에")
  fn()
}

fn5(() => fn3("react"), 100)
// "몇 초뒤에? 100ms 뒤에"
// react

setTimeout(() => fn3("react"), 100)
// 100초뒤에 아래코드 실행
// "몇 초뒤에? 100ms 뒤에"
// react

let state = ""

const setState: SetState = (value: string | ((newValue: string) => string)) => {
  if (typeof value === "string") {
    state = value
  } else {
    value(state)
  }
}

type SetState = (value: string | ((newValue: string) => string)) => void
setState("Hello")

//state = Hello

setState((prev) => prev + "World")

// state = Hello World
