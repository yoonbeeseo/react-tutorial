type MakeArray<T> = T[]

const items: Array<string> = ["a", "b"]

const i2: MakeArray<number> = [1, 2, 3]

type MakePerson<N, A> = { name: N; age: A }[]

const p1: MakePerson<string, number> = [{ age: 12, name: "asdf" }]

const p2: MakePerson<string, string> = [{ name: "", age: "" }]

type MakeObj<T> = T

const pet: MakeObj<{ name: string; age: number }> = {
  age: 12,
  name: "asd",
}
