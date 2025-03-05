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

3. useLocation
