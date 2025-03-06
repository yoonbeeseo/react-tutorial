interface AdminUser {
  email: string;
  password: string;
  uid?: string;
}

interface User {
  id: string;
  createdAt: number;

  //? NO CONTENT
  name: string;
  dob: string;
  mobile: string;

  //? 0
  gender: UserGender | "";
  email: string;

  //? 1
  address: string;
  purposes: UserPurpose[];
  distance: number;

  //? 2
  isVegetarian: boolean;
  appearance: UserAppearance;

  //? 3
  workouts: UserCount | string;
  drinks: UserCount | string;
  smokes: UserCount | string;

  //? 4
  points: UserPoint[];
  interests: UserInterestType[];
}

type UserGender = "남" | "녀" | "안알려줌";
type UserPurpose = "진지한 만남" | "가벼운 만남" | "친목도모" | "개방된 연애";
type UserCount =
  | "1회"
  | "2회"
  | "3회"
  | "4회"
  | "5회"
  | "6회"
  | "7회"
  | "직접입력";

type UserPoint =
  | "말로 표현하는 사람"
  | "행동으로 표현하는 사람"
  | "선물로 표현하는 사람"
  | "시간을 함께 보내는 사람"
  | "스킨쉽";

interface UserInterest {
  type: UserInterestType;
  name?: string;
}

type UserInterestType =
  | "음악"
  | "영화 & 예능"
  | "미술 & 그림"
  | "음식 & 요리"
  | "술자리"
  | "여행"
  | "운동 & 건강"
  | "캠핑"
  | "정의구현"
  | "문학"
  | "게임"
  | "명상"
  | "IT기술"
  | "창업";

interface UserAppearance {
  height: UserHeight;
  weight: UserWeight;
  bodyType: UserBodyType | "";
}

interface UserHeight {
  value: number;
  isCM: boolean;
}
interface UserWeight {
  value: number;
  isKG: boolean;
}

type UserBodyType =
  | "날씬함"
  | "건강함"
  | "통통함"
  | "거대함"
  | "오버사이즈"
  | "안알려줌";

interface Survey {
  q: string;
  answers: string[];
  isMultiple: boolean;
  options: string[];
  id: string;
  createdAt: string;
}
