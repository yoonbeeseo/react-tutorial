# 전역상태 관리 이유

1. props-drilling 3번 이상 하게 되면 귀찮아서
2. 페이지 전환하면 useState로 관리하는 상태 사라짐

## props-drilling

부모 요소가 자녀 요소에게 데이터를 속성으로 전달하는 방법
자녀 요소가 또 다른 자녀요소에게 props-drilling 할 수 있음
3번 이상하게되면 귀찮아짐

## 페이지 전환

각 페이지별 상태가 초기화 됨
페이지끼리 상태 공유가 안됨

### 전역상태 관리법

1. Context를 만든다.

```javascript
// 1. 최상단에서 useContext, createContext 불러오기
import { useContext, createContext } from "react";

// 2. 전역관리할 변수, 함수 등을 선언하는 타입을 지정하고 내보내기
export interface Context {
  // ...
}

// 3. 위에서 선언한 타입을 사용하여 초기값 만들고 내보내기
//! 내보내는 이유: **useState를 사용해서 상태를 만들 때 타입을 따로 지정하지 않고 싶어서**
export const initialState: Context = {
  // ...
};

// 4. context 만들고 내보내기
export const context = createContext(initialState); // 3번에서 만든 초기값을 전역상태의 기본값으로 넣어줌

// 5. context 사용 함수 만들고 내보내기
export const use = () => useContext(context); // {} 사용시 return useContext(context)

// 6. 같은 폴더안에 index.ts를 만들고 전체를 as 키워드를 사용해서 내보내기할 이름을 정해서 내보내기 함

> index.ts
export * as 나의컨텍스트 from './나의컨텍스트'
```

2. Context Provider를 만든다.

```javascript
// 1. 나의컨텍스트에서 나의 컨텍스를 불러오기
import { 나의컨텍스트 } from "./나의컨텍스트경로";

// 2. 리액트에서 PropsWithChildren 불러오기
// Provider로 감싸줄 때 자식요소를 props-drilling으로 받아오고 Provider 안에서 출력 해주지 않으면 앱이 안보임

const 나의Provider = ({ children }: PropsWithChildren) => {
  // 자식 요소 받는 곳 ^^
  //... 나만의 코드 작성
  return (
    <나의컨텍스스트.context.Provider value={{ ...나만의값 }}>
      {children}
      {/* ^^ 자식요소 출력하는 곳 ^^ */}
    </나의컨텍스스트.context.Provider>
  );
};
//! 자식요소 안 받거나 출력 안하면 앱 안보이게 됨

//3. default로 내보내기
export default 나의Provider;

// 옵션! 내보내기를 한줄로 끝내고 싶다면
// default function 나의Provider({children}: PropsWithChildren) {
//...동일한 코드
//}
```

3. 전역적 상태를 관리할 곳의 상위태그에 Provider를 감싼다.

```javascript
AppRouter 최상위 태그 또는 main 태그에 Provider를 감싸서 전역 상태 관리 함
```

4. 상태가 필요한 어느곳에서든지 사용하면 됨. useContext를 씀

```javascript
> 전역상태 필요한 파일.tsx

//1.useContext를 담아둔 함수를 불러와서 전역상태 값을 꺼내 씀
// 나의컨텍스트의 use함수를 꺼내오면 됨
 const {나의컨텍스트값1, ...더많은값들}  = 나의컨텍스트.use()
```

### 페이지 라우팅하는 법

1. react-router-dom 설치

```bash
npm install react-router-dom
```

2. AppRouter.tsx 만들고 모든 파일 경로 때려박기

```javascript
// 1. 필요한 태그들 rrd에서 불러오기
import { BrowserRouter, Routes, Route} from 'react-router-dom'

//2.순서 중요 BR => Routes => Route
export default AppRouter (){
  // children 안받아와도됨
  return (
    <BrowserRouter>
      <Routes>
      {/*
        Route태그에는 path, element속성이 필수값임
        path에는 문자열을 /와 함게 넣어서 사용
        주소창에 적을 값이 됨

        element속성에는 리액트 컴포넌트를 태그까지 다 써서 넣어주면됨

      */}
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  )
}
```

3. main.tsx가서 App 대신에 AppRouter 출력

### Zustand

전역상태 개꿀 관리 라이브러리

장점

1. context 만들기 ㄴㄴ
2. Provider로 감싸기 안해도 됨

단점

1. 리액트 훅 못씀

사용법

1. 설치하기

```bash
npm install zustand
```

2. zustand의 store를 저장해둘 폴더 만들고 index.ts 파일로 store를 관리하면 됨

3. sampleStore.ts

```javascript
// 1. create 라고하는 함수 불러오기
import { create } from "zustand";

// 2. interface 만들기 전역 상태이기 때문에 변수, 함수 다 때려박고 내보내기
export interface Props {
  sample: string;
  updateSample: (newSample: string) => void;
}

// 3. create 와 () 사이에 <> 로 타입을 제네릭으로 전달 ()() 2개 씀
export const use = create<Props>()(
  (set) => ({
    sample: 'sample',
    updateSample: (newSample: string ) => set(prev => ({...prev, sample: newSample}))
  })
)
```

4. index.ts 파일로 내보내기 관리하기

```javascript
export * as Sample from "./Sample경로";
```

5. Sample 불러와서 쓰기

```javascript
// 1. Sample 불러오기
import { Sample } from "./Sample경로";

// 2. 필요한 값 불어오기
const { sample, updateSample } = Sample.use();
```
