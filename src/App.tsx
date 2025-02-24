import { useEffect, useState } from "react"

//Todo Person type 만들기 name: string, age: number

//Todo Pet type 만들기 name: string; age: number; weight: number; desexed: boolean

const App = () => {
  const [a, setA] = useState<string>("")
  const [b, setB] = useState<number>(0)

  const [pet1, setPet1] = useState({}) //Todo: Pet 1 만들기
  const [p1, setP1] = useState({}) //Todo: Person 1 만들기

  const [pets, setPets] = useState([]) // Pet을 담은 배열
  const [people, setPeople] = useState([]) // Person 을 담은 배열

  useEffect(() => {
    //Todo: pets에 pet1 추가하기
    //Todo: people에 p1 추가하기
  }, [])

  return <h1>App</h1>
}

export default App
