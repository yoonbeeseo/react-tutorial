import { useState, useRef, useCallback, useMemo } from "react";
import { Form, Container, Button, Typo } from "../../components";
import { emailValidator, authService } from "../../lib";
import { Alert, Auth } from "../../contexts";
import AdminPanel from "./AdminPanel";

const AdminPage = () => {
  const { isInitialAdmin, admin } = Auth.use();

  interface AdminProps {
    email: string;
    password: string;
  }

  const initialState = useMemo<AdminProps>(
    () => ({ email: "", password: "" }),
    []
  );

  const [props, setProps] = useState(initialState);

  const onChangeProps = useCallback(
    (target: keyof AdminProps, value: string) => {
      setProps((prev) => ({ ...prev, [target]: value }));
    },
    []
  );

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const emailMessage = useMemo(
    () => emailValidator(props.email),
    [props.email]
  );

  const passwordMessage = useMemo(() => {
    const password = props.password;
    if (password.length === 0) {
      return "비밀번호를 입력하세요.";
    }
    if (password.length < 6) {
      return "비밀번호가 너무 짧습니다.";
    }
    if (password.length > 18) {
      return "비밀번호가 너무 깁니다.";
    }

    return null;
  }, [props.password]);

  const { alert } = Alert.use();

  const onSubmit = useCallback(async () => {
    if (emailMessage) {
      return alert(emailMessage, [
        {
          onClick: () =>
            setTimeout(() => {
              emailRef.current?.focus();
            }, 100),
        },
      ]);
    }

    if (passwordMessage) {
      return alert(passwordMessage, [
        {
          onClick: () =>
            setTimeout(() => {
              passwordRef.current?.focus();
            }, 100),
        },
      ]);
    }

    try {
      const res = await authService.signInWithEmailAndPassword(
        props.email,
        props.password
      );

      console.log(res);

      alert("로그인 되었습니다.");
    } catch (error: any) {
      return alert(error.message);
    }
  }, [props, emailRef, passwordRef, emailMessage, passwordMessage, alert]);

  return (
    <Container.Row>
      {!admin ? (
        <Form.Container
          className="w-full max-w-75 p-5 mx-auto"
          onSubmit={onSubmit}
        >
          <Container.Col className="gap-y-1">
            <Form.Label htmlFor="email">이메일</Form.Label>
            <Form.Input
              id="email"
              type="email"
              value={props.email}
              onChange={(e) => onChangeProps("email", e.target.value)}
              placeholder="Admin@admin.com"
            />
          </Container.Col>
          <Container.Col className="gap-y-1">
            <Form.Label htmlFor="password">비밀번호</Form.Label>
            <Form.Input
              id="password"
              type="password"
              value={props.password}
              onChange={(e) => onChangeProps("password", e.target.value)}
              placeholder="Enter Admin Password"
            />
          </Container.Col>
          <Button.Opacity className="bg-gray-800 text-white" type="submit">
            관리자 계정 로그인
          </Button.Opacity>
          {isInitialAdmin && (
            <Button.Link href="create">최초 관리자 계정 생성</Button.Link>
          )}
        </Form.Container>
      ) : (
        <AdminPanel />
      )}
    </Container.Row>
  );
};

export default AdminPage;
