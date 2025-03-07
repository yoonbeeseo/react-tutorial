import { useEffect, useState } from "react";
import { Button, Container, Typo } from "../components";
import { dbService } from "../lib";

const Home = () => {
  const [samples, setSamples] = useState<{ text: string; id: string }[]>([]);

  useEffect(() => {
    const subscribe = dbService.collection("sample").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setSamples(data as any[]);
    });

    subscribe;

    return () => {
      subscribe;
    };
  }, []);

  //! database 지역, 날씨, 기기, 인터넷 속도 등에 영향 받음
  //? async await
  const onDelete = async (id: string) => {
    const ref = dbService.collection("sample").doc(id);
    //! trycatch 로 감싸서 에러핸들링 하기
    try {
      await ref.delete();
      alert("삭제되었습니다.");
    } catch (error: any) {
      console.log(error);
    }
  };

  const onAdd = async (newText: string) => {
    try {
      const ref = dbService.collection("sample");

      await ref.add({ text: newText });

      alert("추가되었습니다.");
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  const onEdit = async (id: string) => {
    try {
      const ref = dbService.collection("sample");

      await ref.doc(id).update({ text: "리액트 배우기" });

      alert("수정되었습니다.");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Container.Col>
      <Typo.H1>Hello</Typo.H1>

      <Button.Opacity onClick={() => onAdd("새로운 할일2")}>
        추가
      </Button.Opacity>

      <ul>
        {samples.map((sample) => (
          <li key={sample.id}>
            <Typo.Text>{sample.text}</Typo.Text>
            <Button.Opacity onClick={() => onEdit(sample.id)}>
              리액트 배우기 로 수정하기
            </Button.Opacity>
            <Button.Opacity onClick={() => onDelete(sample.id)}>
              삭제
            </Button.Opacity>
          </li>
        ))}
      </ul>
    </Container.Col>
  );

  return (
    <Container.Row className="w-full h-screen justify-center items-center">
      <Container.Col className="gap-y-5 max-w-90 p-5">
        <Typo.H1 className="text-center">
          나만의 사랑을 찾고 커플이 되어 지옥같은 현실에서 탈출하세요.
        </Typo.H1>
        <Button.Link href={"signup"} className="bg-pink-400 text-white">
          탈출하기
        </Button.Link>
      </Container.Col>
    </Container.Row>
  );
};

export default Home;
