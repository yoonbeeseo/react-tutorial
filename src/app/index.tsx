import { useNavigate } from "react-router-dom";
import { Button, Container, Typo } from "../components";
import { Alert } from "../contexts";

const Home = () => {
  const { alert } = Alert.use();
  const navi = useNavigate();

  return (
    <Container.Row className="w-full h-screen justify-center items-center">
      <Container.Col className="gap-y-5 max-w-90 p-5">
        <Typo.H1 className="text-center">
          나만의 사랑을 찾고 커플이 되어 지옥같은 현실에서 탈출하세요.
        </Typo.H1>
        <Button.Opacity
          onClick={() =>
            alert("로그인 하시겠습니까?", [
              { text: "회원가입", onClick: () => navi("signup") },
              { text: "로그인", onClick: () => navi("signin") },
            ])
          }
          className="bg-pink-400 text-white"
        >
          탈출하기
        </Button.Opacity>
      </Container.Col>
    </Container.Row>
  );
};

export default Home;
