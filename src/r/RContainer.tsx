import { useState, useEffect } from "react"
import RForm from "./RForm"
import RItem from "./RItem"
import { dbService } from "../lib/firebase"

const RContainer = () => {
  const [adding, setAdding] = useState<boolean>(false)

  const [requirements, setRequirements] = useState<Requirement[]>([])

  useEffect(() => {
    const subscribeReqirements = dbService.collection(collection).onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data() }))

      if (data.length === 0) {
        setTimeout(() => setAdding(true), 100)
      }

      setRequirements(data as Requirement[])
    })

    subscribeReqirements

    return subscribeReqirements
  }, [])

  return (
    <div>
      <header className="border-b-1 border-b-gray-200 flex justify-center relative h-15 items-center">
        <h1 className="text-2xl text-sky-500">요구사항 명세서 앱</h1>
        <button
          className="absolute right-2.5 top-2.5 p-2.5 rounded bg-gray-50 w-10 h-10 flex items-center justify-center text-2xl text-gray-500 cursor-pointer hover:bg-sky-500 hover:text-white"
          onClick={() => setAdding(true)}
        >
          +
        </button>
      </header>

      {adding && (
        <RForm
          onCancel={() => setAdding(false)}
          onDone={async (newRequirement) => {
            // setRequirements((prev) => [newRequirement, ...prev])
            await dbService.collection(collection).doc(newRequirement.id).set(newRequirement)
            console.log("added")
          }} //! props를 전달받는 컴포넌트에서 함수의 인자값의 타입을 지정해두었다면 props를 전달하는 곳에서 굳이 한 번 더 인자값의 타입을 지정해줄 필요 없음.
        />
      )}
      {/* 조건 && 실행코드 : 조건이 참 또는 부합할 때만 오른쪽의 코드를 실행 */}
      <ul className="flex flex-col gap-y-2.5 p-5 max-w-225 mx-auto md:px-0">
        {requirements.map((payload) => (
          <RItem
            key={payload.id}
            payload={payload}
            onDelete={
              async (id) => {
                await dbService.collection(collection).doc(id).delete()
                alert("deleted")
              }
              // setRequirements(
              //   (prev) => prev.filter((item) => item.id !== id) //? filter 함수는 조건에 부합하는 아이템을 제외한 것들만 남기는 함수
              // )
            }
            onEdit={
              async (newRequirement) => {
                await dbService.collection(collection).doc(newRequirement.id).set(newRequirement)
                console.log("updated")
              }
              // setRequirements((prev) => prev.map((item) => (item.id === newRequirement.id ? newRequirement : item)))
            }
          />
        ))}
      </ul>
    </div>
  )
}

export default RContainer

const collection = "requirements"
