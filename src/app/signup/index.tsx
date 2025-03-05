import { useSearchParams, useNavigate } from "react-router-dom";
import { Form, Container, Button, Typo, Animated } from "../../components";
import { useCallback } from "react";

const Signup = () => {
  const content = useSearchParams()[0].get("content");
  const navi = useNavigate();

  const onSubmit = useCallback(() => {
    const next = (number: number) => navi(`/signup?content=${number}`);
    if (!content) {
      return next(0);
    }
    switch (Number(content)) {
      case 0:
        return console.log("case 0 logic");
      // case 0:
      //   return console.log("case 0 logic");
      // case 0:
      //   return console.log("case 0 logic");
      // case 0:
      //   return console.log("case 0 logic");
      // case 0:
      //   return console.log("case 0 logic");
    }
    next(Number(content) + 1);
  }, [navi, content]);

  return (
    <Form.Container className="m-5 max-w-100 mx-auto" onSubmit={onSubmit}>
      <Typo.H1>자신에 대해 알려주세요.</Typo.H1>
      {content ? (
        {
          0: <>content is 0</>,
          1: <>content is 1</>,
          2: <>content is 2</>,
        }[content]
      ) : (
        <Animated.Emerge className="gap-y-2.5 flex flex-col">
          <Container.Col className="gap-y-1">
            <Form.Label htmlFor="name">이름</Form.Label>
            <Form.Input id="name" placeholder="박보검" />
          </Container.Col>
          <Container.Col className="gap-y-1">
            <Form.Label htmlFor="생년월일">생년월일</Form.Label>
            <Form.Input id="생년월일" placeholder="2004.08.09" />
          </Container.Col>
          <Container.Col className="gap-y-1">
            <Form.Label htmlFor="mobile">연락처</Form.Label>
            <Form.Input id="mobile" placeholder="01012341234" />
          </Container.Col>
        </Animated.Emerge>
      )}
      <Button.Opacity className="bg-pink-400 text-white mt-2.5">
        다음
      </Button.Opacity>
    </Form.Container>
  );
};

export default Signup;
