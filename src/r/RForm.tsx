import { useState, useEffect, useRef, FormEvent } from "react"
import { v4 } from "uuid"
import { FaRegTrashCan, FaRotate, FaPlus } from "react-icons/fa6"

interface Props {
  payload?: Requirement

  onCancel: () => void

  onDone: (requirement: Requirement) => void
}

const RForm = ({ onCancel, onDone, payload }: Props) => {
  const [requirement, setRequirement] = useState<Requirement>(
    payload ?? {
      descs: [],
      id: v4(),
      manager: "",
      status: "",
      title: "",
    }
  )

  const [isInsertingDesc, setIsInsertingDesc] = useState<boolean>(false) // 내가 지금 작성하고 있는 아이템이 desc인지 확인용

  const [desc, setDesc] = useState<string>("")

  const [directInserting, setDirectInserting] = useState<boolean>(false)

  const titleRef = useRef<HTMLInputElement>(null) // 내가 연결하고 싶은 태그를 제네릭으로 전달
  const descRef = useRef<HTMLInputElement>(null) // 내가 연결하고 싶은 태그를 제네릭으로 전달
  const statusRef = useRef<HTMLSelectElement>(null) // 내가 연결하고 싶은 태그를 제네릭으로 전달
  const managerRef = useRef<HTMLSelectElement>(null) // 내가 연결하고 싶은 태그를 제네릭으로 전달
  const managerRef2 = useRef<HTMLInputElement>(null) // 내가 연결하고 싶은 태그를 제네릭으로 전달

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isInsertingDesc) {
      return
    }

    if (requirement.title.length === 0) {
      alert("기능 이름을 적어주세요.")
      return setTimeout(() => titleRef.current?.focus(), 100)
    }

    if (requirement.status.length === 0) {
      alert("진행상태를 선택해주세요.")
      return setTimeout(() => statusRef.current?.showPicker())
    }

    if (requirement.manager.length === 0) {
      if (directInserting) {
        alert("담당자를 입력해주세요.")
        return setTimeout(() => managerRef2.current?.focus(), 100)
      }

      alert("담당자를 선택해주세요.")
      return setTimeout(() => managerRef.current?.showPicker(), 100)
    }

    alert(payload ? "요구사항을 수정했습니다." : "요구사항을 추가했습니다.")

    onDone(requirement)

    if (!payload) {
      setRequirement({
        descs: [],
        id: v4(),
        manager: "",
        status: "",
        title: "",
      })

      setTimeout(() => titleRef.current?.focus(), 100)
      return
    }
    onCancel()
  }

  useEffect(
    () => {
      setTimeout(() => titleRef.current?.focus(), 100)
    },
    [] // 빈배열이란 해당 컴포넌트가 최초 렌데링 되는 시점에 딱 한 번 실행할 코드
  )

  return (
    <form className="flex flex-col gap-y-2.5 max-w-225 mx-auto p-5 md:px-0" onSubmit={onSubmit}>
      <div className={div}>
        <label htmlFor="title" className={label}>
          기능 이름
        </label>
        <input
          ref={titleRef}
          type="text"
          value={requirement.title}
          id="title"
          className={input}
          onChange={(e) => setRequirement((prev) => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div className={div}>
        <label htmlFor="desc" className={label}>
          상세내용
        </label>

        <ul className="flex flex-col gap-y-1 px-2">
          {requirement.descs.map((d, index) => (
            <li key={index} className="flex">
              <div className="text-xs bg-gray-50 rounded p-1 text-gray-700 hover:shadow-md flex gap-x-2">
                {index + 1}. {d}
                <button
                  type="button"
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => {
                    const descs = [...requirement.descs]

                    descs.splice(index, 1)

                    setRequirement((prev) => ({ ...prev, descs }))
                  }}
                >
                  <FaRegTrashCan />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {isInsertingDesc && (
          <input
            type="text"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            ref={descRef}
            className={input}
            onFocus={() => setIsInsertingDesc(true)}
            onBlur={() => setIsInsertingDesc(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (desc.length === 0) {
                  alert("상세 내용을 입력해주세요.")
                  return setTimeout(() => descRef.current?.focus(), 100)
                }

                if (e.nativeEvent.isComposing) {
                  return
                }
                setRequirement((prev) => ({ ...prev, descs: [...prev.descs, desc] }))
                setDesc("")
                setTimeout(() => descRef.current?.focus(), 100)
              } else if (e.key === "Tab") {
                setIsInsertingDesc(false)
                setTimeout(() => statusRef.current?.showPicker(), 100)
              }
            }}
          />
        )}

        <button
          className="w-full rounded bg-gray-50 flex justify-center h-10 items-center hover:opacity-80 active:opacity-50 hover:bg-gray-100 cursor-pointer"
          type="button"
          onClick={() => {
            setIsInsertingDesc(true)
            setTimeout(() => descRef.current?.focus(), 100)
          }}
        >
          <FaPlus />
        </button>
      </div>

      <div className="flex gap-x-2.5 items-end">
        <div className="flex gap-x-2.5 flex-2">
          <div className={div}>
            <label htmlFor="status" className={label}>
              진행상태
            </label>
            <select
              ref={statusRef}
              id="status"
              value={requirement.status}
              className={select}
              onChange={(e) => {
                setRequirement((prev) => ({ ...prev, status: e.target.value as RequirementStatus }))
                setTimeout(() => {
                  if (directInserting) {
                    return managerRef2.current?.focus()
                  }
                  managerRef.current?.showPicker()
                }, 100)
              }}
            >
              <option>선택</option>

              {statuses.map((status) => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            {!directInserting ? (
              <div className={div}>
                <label htmlFor="manager1" className={label}>
                  담당자
                </label>
                <select
                  ref={managerRef}
                  id="manager1"
                  value={requirement.manager}
                  className={select}
                  onChange={(e) => {
                    const { value } = e.target
                    if (value === "직접 입력") {
                      setRequirement((prev) => ({ ...prev, manager: "" }))
                      setDirectInserting(true)
                      return setTimeout(() => managerRef2.current?.focus(), 100)
                    }
                    setRequirement((prev) => ({ ...prev, manager: value as RequirementManager })) //! as 타입 = 어떤 값이 내가 원하는 타입과 일치하지 않더라도 일단 이렇게 이해해줘 라고 부탁하는 것
                  }}
                >
                  <option>선택</option>
                  <option value="직접 입력">직접 입력</option>

                  {managers.map((manager) => (
                    <option key={manager} value={manager}>
                      {manager}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="flex gap-x-2.5 items-end">
                <div className={div.concat(" flex-1")}>
                  <label htmlFor="manager2" className={label}>
                    직접 입력
                  </label>
                  <input type="text" id="manager2" value={requirement.manager} className={input} ref={managerRef2} />
                </div>
                <button
                  type="button"
                  className="h-10 w-10 rounded bg-gray-50 flex items-center justify-center text-gray-500 hover:opacity-80 hover:bg-gray-100 active:opacity-50 cursor-pointer"
                  onClick={() => {
                    setRequirement((prev) => ({ ...prev, manager: "" }))
                    setDirectInserting(false)
                    setTimeout(() => managerRef.current?.showPicker(), 100)
                  }}
                >
                  <FaRotate />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-x-2.5 flex-1">
          <button className="rounded bg-sky-500 h-10 px-2.5 text-white hover:opacity-80 active:opactiy-50 cursor-pointer flex-3">
            {/* 삼항 연산자
                조건 ? 코드1 : 코드2
                조건이 참이거나 부합할 때 코드1을 실행
                조건이 거짓이거나 부합하지 않을 때 코드2를 실행
            */}
            {payload ? "수정" : "추가"}
          </button>
          <button
            type="button"
            className="rounded bg-gray-50 px-2.5 hover:opacity-80 active:opacity-50 cursor-pointer hover:bg-gray-100"
          >
            취소
          </button>
        </div>
      </div>
    </form>
  )
}

export default RForm

const div = "flex flex-col gap-y-1"
const label = "text-xs text-gray-500"
const input = "rounded outline-none bg-gray-100 focus:bg-gray-50 focus:border focus:border-blue-500 h-10 px-2.5"
const select = input.concat(" pl-0")

const statuses: RequirementStatus[] = ["계획중", "진행중", "완료"]
const managers: RequirementManager[] = ["강산", "강찬희", "김영화", "유경환", "허승이"]
