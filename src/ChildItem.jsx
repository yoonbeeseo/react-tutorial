import { 족보사용 } from "./족보시스템"

const ChildItem = ({ name }) => {
  const { 조상들, 본가, 성씨, 세대 } = 족보사용()

  const 증조할아버지 = 조상들[0]
  const 고조할아버지 = 조상들[1]
  const 더조상 = 조상들[2]
  return (
    <div>
      <h1>{name}</h1>
      <button onClick={() => alert(`본가는 ${본가}이며 성씨는 ${본가} ${성씨}씨 입니다. 저희는 ${세대}세대 입니다.`)}>
        조상님 이름 말해봐
      </button>
    </div>
  )
}

export default ChildItem
