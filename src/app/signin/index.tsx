import { useState, useRef, useCallback } from "react";
import { dbService } from "../../lib";
import bcrypt from "bcryptjs";
import { Button, Container, Form } from "../../components";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const [email, setEmail] = useState(
    import.meta.env.DEV ? "dexteryoon@icloud.com" : ""
  );
  const [password, setPassword] = useState(import.meta.env.DEV ? "123123" : "");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const focus = useCallback(
    (target: "email" | "password") => {
      setTimeout(() => {
        switch (target) {
          case "email":
            return emailRef.current?.focus();

          default:
            return passwordRef.current?.focus();
        }
      }, 100);
    },
    [emailRef, passwordRef]
  );

  const navi = useNavigate();

  const onSubmit = useCallback(async () => {
    try {
      const ref = dbService.collection("users").where("email", "==", email);
      const snap = await ref.get();
      const data = snap.docs.map((doc) => ({ ...doc.data() }));
      if (!data || data.length === 0) {
        return alert("존재하지 않는 유저입니다.");
      }
      const fetchedUser = data[0] as User & { password: string };
      const isPasswordCorrect = await bcrypt.compare(
        password,
        fetchedUser.password
      );
      if (!isPasswordCorrect) {
        return alert("비밀번호를 확인해주세요.");
      }
      alert("로그인 되었습니다.");
      localStorage.setItem("uid", JSON.stringify(fetchedUser.id));

      navi("/");
    } catch (error: any) {
      return alert(error.message);
    }
  }, [email, password, focus, navi]);

  return (
    <Form.Container
      className="w-full max-w-75 mx-auto border"
      onSubmit={onSubmit}
    >
      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Input
          type="email"
          id="email"
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
        />
      </Container.Col>

      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Input
          id="password"
          value={password}
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
          ref={passwordRef}
          type="password"
        />
      </Container.Col>
      <Button.Opacity type="submit" className="bg-pink-400 text-white mt-2.5">
        로그인
      </Button.Opacity>
    </Form.Container>
  );
};

export default SigninPage;
