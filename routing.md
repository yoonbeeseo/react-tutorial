# 페이지 라우팅

1. 하나의 화면에 다 담으면 너무 코드가 길어짐

2. 코드스플리팅 + 페이지 전환 하면 코드가 많이 가벼워짐

3. react router dom 내용 숙지 필수

## React Router Dom

1. useNavigate 사용법

```javascript
//1. 불러오기
import { useNavigate } from "rrd";

//2. navi 등의 변수에 담기
const navi = useNavigate(); //! 함수라서 () 꼭 써야함

//3. navi안에다가 경로 넣으면 됨
navi("멋진경로"); //! 현재 경로 + 새로운 경로
navi("/멋진경로"); //! 새로운 경로

eg) 현재경로 = '/requirement'
navi('newpath') //예상 경로: /requirement/newpath
navi('/newpath') //예상 경로: /newpath
```

2. useParams

```javascript
홈페이지주소/경로/새로운경로?파라미터=파라미터값

1. /+경로 = 새로운 페이지

파일스트럭쳐랑 결이 비슷

2. /경로/새로운경로

/경로 페이지의 하위 페이지로 "새로운경로"가 위치함

경로, 새로운 경로는 params로 추적가능함
라우팅할 때 :경로값

//1. 불러오기
import { useParams } from 'rrd'

//2. 변수에 담아서 선언하기
const params = useParams() //! use로 시작하는 거의 99%는 훜으로 함수

// 3. 제네릭 위치 = 리액트 훅과 동일 대신 객체형태로 담아야 함
const params = useParams<{경로값: string}>()

//! 경로값에 들어가는 값은 :값 으로 주지 않고 별도로 지정한 경우 해당 경로의 파람스 값을 추적할 수 없음

3. ?는 해당 경로에 추가설명
```

3. useLocation

경로 가져올 때 씀

```javascript
//1. import
import { useLocation } from "rrd";

//2. 변수에 담기
const path = useLocation();

//3. 바로 destructure 해서 pathname 값 가져와서 많이 씀
const { pathname } = useLocation();
```

4. Link 태그

기본태그인 a를 사용하면 화면전환시 새로고침이 발생
지금까지 잘 만든 상태들의 초기화가 일어날 수 있음

rrd에서 제공하는 Link태그 사용하면 됨
새로고침 방지 + 좀 더 빠른 페이지 전환

href 대신에 to 에 경로값을 넣으면 됨
