# 커스텀 경고 브랜치

1. 로그인 로직

   Context Api 로구현

2. 커스텀 경고창

   zustand로 구현

3. 페이지 라우팅

   react-router-dom

## 로그인

```javascript
interface LoginProps {
  email: string;
  password: string;
}

interface User {
  email: string;
  uid: string;
}

const login = (email: string, password: string) => {
  const users: User[] = [
    { email: "test@test.com", password: "123123", uid: "test001" },
  ];
  //Todo: 로그인 로직 구현
};

const logout = () => {
  //todo: user초기화 끝
};
```

## 페이지 라우팅 (경로)

1. 홈화면

   로그인

2. 요구사항명세서 앱 페이지

   요구사항명세서 목록이 보이도록

3. 요구사항 명세서 추가 페이지

   요구사항 명세서 추가

4. 요구사항 디테일 페이일

   요구사항 수정 -> 수정 페이지

5. 요구사항 디테일 수정 페이지

## 경고창

1. 알림 제목
2. 메세지 내용
3. 버튼 배열

   - 버튼이름

   * 버튼 클릭시 작동할 동작

```javascript
interface AlertProps {
  isShowing: boolean
  title?: string;
  message: string | null
  buttons?: AlertButton[]
}

interface AlertButton {
  text?: string;
  onClick?: () => void
}
```
