import { Animated, Container, Form } from "../../components";

export interface OnChangeSignup {
  onChange: (target: keyof User, value: any) => void;
}

interface Props extends OnChangeSignup {
  name: string;
  dob: string;
  mobile: string;

  nameRef: React.RefObject<HTMLInputElement | null>;
  dobRef: React.RefObject<HTMLInputElement | null>;
  mobileRef: React.RefObject<HTMLInputElement | null>;
}

const Content_n = ({
  dob,
  mobile,
  name,
  onChange,
  dobRef,
  mobileRef,
  nameRef,
}: Props) => {
  return (
    <Animated.Emerge className="gap-y-2.5 flex flex-col">
      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="name">이름</Form.Label>
        <Form.Input
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          id="name"
          placeholder="박보검"
          ref={nameRef}
        />
      </Container.Col>
      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="생년월일">생년월일</Form.Label>
        <Form.Input
          id="생년월일"
          placeholder="2004.08.09"
          value={dob}
          onChange={(e) => onChange("dob", e.target.value)}
          ref={dobRef}
        />
      </Container.Col>
      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="mobile">연락처</Form.Label>
        <Form.Input
          id="mobile"
          placeholder="01012341234"
          value={mobile}
          onChange={(e) => onChange("mobile", e.target.value)}
          ref={mobileRef}
        />
      </Container.Col>
    </Animated.Emerge>
  );
};

export default Content_n;
