import { useEffect, useState } from "react"

//Todo Person type 만들기 name: string, age: number
type Person = {
  name: string
  age: number
}

type Pet = {
  name: string
  weight: number
  age: number
  desexed: boolean
}

//Todo Pet type 만들기 name: string; age: number; weight: number; desexed: boolean

const App = () => {
  const [a, setA] = useState<string>("")
  const [b, setB] = useState<number>(0)

  const [pet1, setPet1] = useState<Pet>({ age: 12, name: "Mario", desexed: false, weight: 5.2 }) //Todo: Pet 1 만들기
  const [p1, setP1] = useState<Person>({ age: 12, name: "Mario" }) //Todo: Person 1 만들기

  const [pets, setPets] = useState<Array<Pet>>([]) // Pet을 담은 배열
  const [people, setPeople] = useState<Person[]>([]) // Person 을 담은 배열

  useEffect(() => {
    //Todo: pets에 pet1 추가하기
    setPets((prev) => [...prev, pet1])
    //Todo: people에 p1 추가하기
    setPeople((prev) => [...prev, p1])
  }, [])

  return <h1>App</h1>
}

export default App
