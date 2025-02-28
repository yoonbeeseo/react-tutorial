import { useState, useRef, FormEvent, useMemo, useCallback } from "react"

interface LoginProps {
  email: string
  password: string
}

const ParentComponent = () => {
  const initialState: LoginProps = useMemo(() => ({ email: "", password: "" }), [])

  const [loginProps, setLoginProps] = useState(initialState)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const emailMessage = useMemo(() => {
    const email = loginProps.email
    //! email 검사 로직
    if (email.length === 0) {
      return "이메일을 입력해주세요."
    }

    if (!email.includes("@")) {
      return "'@'를 포함해주세요."
    }

    const split1 = email.split("@")

    if (split1[1]?.length === 0) {
      return "이메일 뒷자리를 입력해주세요."
    }

    if (!split1[1].includes(".")) {
      return "이메일 뒷자리를 확인해주세요."
    }

    const split2 = split1[1].split(".")

    if (split2[split2.length - 1]?.length === 0) {
      return "이메일 접미사를 확인해주세요."
    }

    return null
  }, [loginProps.email])

  const passwordMessage = useMemo(() => {
    const password = loginProps.password

    const pl = password.length

    if (pl === 0) {
      return "비밀번호를 입력해주세요."
    }

    if (pl < 6) {
      return "비밀번호가 너무 짧습니다."
    }

    if (pl > 18) {
      return "비밀번호가 너무 깁니다."
    }

    return null
  }, [loginProps.password])

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      //! keyof interface 안의 값을 문자열로 뽑아옴
      const focus = (target: keyof LoginProps) =>
        setTimeout(() => {
          if (target === "email") {
            return emailRef.current?.focus()
          }
          return passwordRef.current?.focus()
        }, 100)

      //! email 검사
      if (emailMessage) {
        alert(emailMessage)
        return focus("email")
      }

      //! password 검사
      if (passwordMessage) {
        alert(passwordMessage)
        return focus("password")
      }

      alert(`${loginProps.email} 님 반갑습니다!`)
      setLoginProps(initialState)
    },
    [loginProps.email, passwordMessage, emailMessage, emailRef, passwordRef, initialState]
    //! useCallbackdm로 감싼 함수 안에서 사용한 모든 변수, 함수는 dependency Array에 들어가야 함
  )

  return (
    <div>
      <form action="" className="max-w-75 mx-auto" onSubmit={onSubmit}>
        <h1 className="text-2xl font-black">Login Form</h1>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={loginProps.email}
            onChange={(e) => setLoginProps((prev) => ({ ...prev, email: e.target.value }))}
            ref={emailRef}
            className="bg-gray-50 h-10 px-2.5"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={loginProps.password}
            onChange={(e) => setLoginProps((prev) => ({ ...prev, password: e.target.value }))}
            ref={passwordRef}
            className="bg-gray-50 h-10 px-2.5"
          />
        </div>
        <button className="bg-sky-500 text-white rounded h-10 w-full mt-5">Login</button>
      </form>
    </div>
  )
}

export default ParentComponent
