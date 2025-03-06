import { OnChangeSignup } from "./Content_n";
import { Animated, Container, Form } from "../../components";
import { genders } from "../../lib";

interface Props extends OnChangeSignup {
  gender: UserGender | "";
  email: string;

  pw: string;
  con: string;

  onChangePw: (target: "pw" | "con", value: string) => void;

  genderRef: React.RefObject<HTMLSelectElement | null>;
  emailRef: React.RefObject<HTMLInputElement | null>;
  pwRef: React.RefObject<HTMLInputElement | null>;
  conRef: React.RefObject<HTMLInputElement | null>;
}

const Content_0 = ({
  email,
  gender,
  onChange,
  con,
  onChangePw,
  pw,
  conRef,
  emailRef,
  genderRef,
  pwRef,
}: Props) => {
  return (
    <Animated.Emerge className="gap-y-2.5">
      <Container.Row>
        <Container.Col className="gap-y-1 w-25">
          <Form.Label htmlFor="gender">성별</Form.Label>
          <Form.Select
            id="gender"
            value={gender}
            onChange={(e) => onChange("gender", e.target.value)}
            ref={genderRef}
          >
            <option>선택</option>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Form.Select>
        </Container.Col>
      </Container.Row>

      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="email">이메일</Form.Label>
        <Form.Input
          ref={emailRef}
          id="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="example@example.com"
        />
      </Container.Col>

      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="pw">비밀번호</Form.Label>
        <Form.Input
          id="pw"
          value={pw}
          onChange={(e) => onChangePw("pw", e.target.value)}
          placeholder="* * * * * * * *"
          type="password"
          ref={pwRef}
        />
      </Container.Col>

      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="con">비밀번호 확인</Form.Label>
        <Form.Input
          id="con"
          value={con}
          onChange={(e) => onChangePw("con", e.target.value)}
          placeholder="* * * * * * * *"
          type="password"
          ref={conRef}
        />
      </Container.Col>
    </Animated.Emerge>
  );
};

export default Content_0;
