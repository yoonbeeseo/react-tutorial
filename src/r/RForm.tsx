import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { v4 } from "uuid"
import { FaRegTrashCan, FaRotate, FaPlus } from "react-icons/fa6"
import { Button, Container, Form } from "../ui"
import { RCom } from "./components"

interface Props {
  payload?: Requirement

  onCancel: () => void

  onDone: (requirement: Requirement) => void
}

const RForm = ({ onCancel, onDone, payload }: Props) => {
  const initialState = useMemo<Requirement>(() => {
    return (
      payload ?? {
        descs: [],
        id: v4(),
        manager: "",
        status: "",
        title: "",
      }
    )
  }, [payload])

  const [requirement, setRequirement] = useState(initialState)

  const [isInsertingDesc, setIsInsertingDesc] = useState<boolean>(false) // 내가 지금 작성하고 있는 아이템이 desc인지 확인용

  const [desc, setDesc] = useState<string>("")

  const [directInserting, setDirectInserting] = useState<boolean>(false)

  const titleRef = useRef<HTMLInputElement>(null) // 내가 연결하고 싶은 태그를 제네릭으로 전달
  const descRef = useRef<HTMLInputElement>(null) // 내가 연결하고 싶은 태그를 제네릭으로 전달
  const statusRef = useRef<HTMLSelectElement>(null) // 내가 연결하고 싶은 태그를 제네릭으로 전달
  const managerRef = useRef<HTMLSelectElement>(null) // 내가 연결하고 싶은 태그를 제네릭으로 전달
  const managerRef2 = useRef<HTMLInputElement>(null) // 내가 연결하고 싶은 태그를 제네릭으로 전달

  const titleMessage = useMemo(() => {
    const title = requirement.title
    if (title.length === 0) {
      return "요구사항 기능 이름을 적으세요."
    }
    if (title.length > 30) {
      return "너무 긴 이름입니다."
    }

    return null
  }, [requirement.title])

  useEffect(() => {
    console.log({ titleMessage })
  }, [titleMessage])

  // const onSubmit = useCallback(() => {
  //   if (isInsertingDesc) {
  //     return
  //   }

  //   if (titleMessage) {
  //     alert(titleMessage)
  //     return setTimeout(() => titleRef.current?.focus(), 100)
  //   }

  //   if (requirement.status.length === 0) {
  //     alert("진행상태를 선택해주세요.")
  //     return setTimeout(() => statusRef.current?.showPicker())
  //   }

  //   if (requirement.manager.length === 0) {
  //     if (directInserting) {
  //       alert("담당자를 입력해주세요.")
  //       return setTimeout(() => managerRef2.current?.focus(), 100)
  //     }

  //     alert("담당자를 선택해주세요.")
  //     return setTimeout(() => managerRef.current?.showPicker(), 100)
  //   }

  //   alert(payload ? "요구사항을 수정했습니다." : "요구사항을 추가했습니다.")

  //   onDone(requirement)

  //   if (!payload) {
  //     setRequirement({
  //       descs: [],
  //       id: v4(),
  //       manager: "",
  //       status: "",
  //       title: "",
  //     })

  //     setTimeout(() => titleRef.current?.focus(), 100)
  //     return
  //   }
  //   onCancel()
  // }, [])

  const [boolean, setBoolean] = useState<boolean>(false)
  const boolHandler = useCallback(() => setBoolean((prev) => !prev), [])
  const onSubmit = useCallback(() => {
    console.log(requirement)
  }, [requirement])

  useEffect(
    () => {
      setTimeout(() => titleRef.current?.focus(), 100)
    },
    [] // 빈배열이란 해당 컴포넌트가 최초 렌데링 되는 시점에 딱 한 번 실행할 코드
  )

  return (
    <Form.Form className="gap-y-2.5 max-w-225 mx-auto p-5 md:px-0" onSubmit={onSubmit}>
      <RCom.Input
        id="title"
        title="기능 이름"
        onChangeText={(title) => setRequirement((prev) => ({ ...prev, title }))}
        ref={titleRef}
        value={requirement.title}
        placeholder="e.g.) 홈페이지 추가 버튼"
      />

      <Container.Col>
        <RCom.Input
          isShowing={isInsertingDesc}
          id="desc"
          title="상세내용"
          onChangeText={setDesc}
          value={desc}
          ref={descRef}
          placeholder="상세 내용 입력..."
          input={{
            onFocus: () => setIsInsertingDesc(true),
            onBlur: () => setIsInsertingDesc(false),
            onKeyDown: (e) => {
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
              console.log(e.key)
            },
          }}
        >
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
        </RCom.Input>

        <Button.Opacity
          onClick={() => {
            setIsInsertingDesc(true)
            setTimeout(() => descRef.current?.focus(), 100)
          }}
        >
          <FaPlus />
        </Button.Opacity>
      </Container.Col>

      <Container.Row className="items-end">
        <Container.Row className="flex-2">
          <RCom.Select
            id="status"
            onSelectOption={(status) => {
              setRequirement((prev) => ({ ...prev, status: status as RequirementStatus }))
              setTimeout(() => {
                if (directInserting) {
                  return managerRef2.current?.focus()
                }
                managerRef.current?.showPicker()
              }, 100)
            }}
            options={statuses}
            placeholder="선택"
            ref={statusRef}
            title="진행 상태"
            value={requirement.status}
          />

          <Container.Row className="flex-1">
            {!directInserting ? (
              <>
                <RCom.Select
                  id="manager1"
                  onSelectOption={(value) => {
                    if (value === "직접 입력") {
                      setRequirement((prev) => ({ ...prev, manager: "" }))
                      setDirectInserting(true)
                      return setTimeout(() => managerRef2.current?.focus(), 100)
                    }
                    setRequirement((prev) => ({ ...prev, manager: value as RequirementManager }))
                  }}
                  options={["직접 입력", ...managers]}
                  placeholder="담당자 선택"
                  ref={managerRef}
                  title="담당자"
                  value={requirement.manager}
                />
              </>
            ) : (
              <Container.Row className="items-end">
                <RCom.Input
                  id="manager2"
                  onChangeText={(manager) =>
                    setRequirement((prev) => ({ ...prev, manager: manager as RequirementManager }))
                  }
                  placeholder={managers[0]}
                  ref={managerRef2}
                  title="직접 입력"
                  value={requirement.manager}
                />
                <Button.Opacity
                  onClick={() => {
                    setRequirement((prev) => ({ ...prev, manager: "" }))
                    setDirectInserting(false)
                    setTimeout(() => managerRef.current?.showPicker(), 100)
                  }}
                >
                  <FaRotate />
                </Button.Opacity>
              </Container.Row>
            )}
          </Container.Row>
        </Container.Row>

        <Container.Row className="flex-1">
          <Button.Opacity type="submit" className="bg-sky-500 text-white flex-3">
            {/* 삼항 연산자
                조건 ? 코드1 : 코드2
                조건이 참이거나 부합할 때 코드1을 실행
                조건이 거짓이거나 부합하지 않을 때 코드2를 실행
            */}
            {payload ? "수정" : "추가"}
          </Button.Opacity>
          <Button.Opacity onClick={onCancel}>취소</Button.Opacity>
        </Container.Row>
      </Container.Row>
    </Form.Form>
  )
}

export default RForm

const statuses: RequirementStatus[] = ["계획중", "진행중", "완료"]
const managers: RequirementManager[] = ["강산", "강찬희", "김영화", "유경환", "허승이"]
