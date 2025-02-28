import { useState, useMemo, useCallback, useRef } from "react"

interface LoginProps {
  email: string
  password: string
}

const LoginForm = () => {
  //todo: initialState를 useMemo로 만들기

  //todo: useState로 관리할 상태 만들기 초기값은 initialState

  //todo: emailRef, passwordRef만들기

  // todo: emailMessage 를 useMemo로 만들기
  //! dㅣ메일 길이, @포함여부, @ 뒤의 길이, @뒤의 접미사 영역 . 포함 여부 , 접미사 길이

  //todo: passwordMessage를 ㅕseMemofh 만들기
  //! 길이, 6자 미만, 18자 초과

  //todo: onSubmit함수를 useCallbackdㅡ로 만들기

  //! emailMessagerㅏ 있을 때 경고메세지 + 이메일 포커스

  //! passworMessage가 있을 때 경고 메세지 + 비번 포커스

  //! 환영 메세지

  return (
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
  )
}

export default LoginForm
