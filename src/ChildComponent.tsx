import { memo, useState } from "react"

//! props-drilling 으로 전달된 props-check 통해 변경 사항이 있는지 검사

const ChildComponent = ({ age }: { age: number }) => {
  return (
    <div>
      <h2>ChildComponent Age is {age}</h2>
    </div>
  )
}

export default memo(ChildComponent)
// caching 메모리 어딘가에 저장
//! memery 부채가 발생
