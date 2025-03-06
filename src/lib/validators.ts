export type Validator = string | null;

export const stringValidator = (text: string, message?: string): Validator => {
  if (text.length === 0 || !text) {
    return message ?? "입력해주세요.";
  }

  return null;
};

export const isNumber = (value: string | number): boolean => {
  const regex = /^[0-9]*$/;
  return regex.test(value.toString());
};

export const dobValidator = (
  dates: (string | number)[],
  maxYear: number = 150
): Validator => {
  //! dates.length !== 3 return
  if (dates.length !== 3) {
    return "날짜를 확인해주세요.";
  }

  const y = String(dates[0]);
  //! year의 길이가 4자리가 아닐때  return

  let message = "출생년도를 확인해주세요.";
  if (y.length !== 4) {
    return message;
  }

  if (!isNumber(y)) {
    return message;
  }

  if (y.length !== 4) {
    return message;
  }

  const year = Number(y);
  if (new Date().getFullYear() - year > maxYear) {
    return message;
  }

  //! month 길이가 03월, 3월
  const m = dates[1].toString();
  message = "출생월을 확인해주세요.";
  if (!isNumber(m)) {
    return message;
  }
  //! month를 숫자로 바꾼 뒤 1-12 사이가 아니라면 return
  const month = Number(m);
  if (month > 12 || month < 1) {
    return message;
  }

  message = "출생일을 확인해주세요.";
  //! date를 숫자로 바꿨을 때 NaN return
  const d = dates[2].toString();
  if (!isNumber(d)) {
    return message;
  }

  const date = Number(d);
  //! date 길이가 해당 월의 마지막 날짜 보다 높으면 return

  //! new Date() 날짜 관련 함수
  //! 년도, 월, index
  const max = new Date(year, month, 0).getDate();
  if (date > max) {
    return message;
  }

  return null;
};

export const mobileValidator = (mobile: string): Validator => {
  let message = "연락처를 확인해주세요.";
  if (!isNumber(mobile)) {
    message = "숫자만 입력해주세요.";
    return message;
  }
  if (!mobile || mobile.length !== 11) {
    return message;
  }
  if (`${mobile[0]}${mobile[1]}${mobile[2]}` !== "010") {
    message = "연락처는 010으로 시작해야합니다.";
    return message;
  }

  return null;
};

export const emailValidator = (email: string): Validator => {
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    return "이메일을 확인해주세요.";
  }
  return null;
};

export const arrayLengthValidator = (
  array: any[],
  message?: string
): Validator => {
  if (array.length === 0) {
    return message ?? "목록을 입력해주세요.";
  }
  return null;
};

export const heightWeightValidator = (
  value: string | number,
  message?: string
): Validator => {
  const split = value.toString().split(".");
  if (!isNumber(split[0])) {
    return message ?? "키 / 몸무게는 숫자만 입력해주세요.";
  }
  if (Number(split[0]) === 0) {
    return message ?? "키 / 몸무게를 입력해주세요.";
  }
  if (split[1] && !isNumber(split[1])) {
    return message ?? "키 / 몸무게는 숫자만 입력해주세요.";
  }
  return null;
};
