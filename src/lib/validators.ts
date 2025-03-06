export type Validator = string | null;

export const stringValidator = (text: string, message?: string): Validator => {
  if (text.length === 0 || !text) {
    return message ?? "입력해주세요.";
  }

  return null;
};
