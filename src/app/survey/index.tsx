import { useCallback, useEffect, useState } from "react";
import { dbService } from "../../lib";
import { Auth } from "../../contexts";
import { Button, Form } from "../../components";
import SurveyItem from "./SurveyItem";
import { useNavigate } from "react-router";

//Todo: 관리자가 만들어둔 서베이 불러오기
//Todo: 로그인한 회원이 있는지 검사
//Todo: 현재 사용자가 서베이를 작성했는지 확인

//Todo: 설문이 끝나면 관리자의 서베이 -> survey 컬렉션에 추가
const SurveyPage = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    const subSurvey = dbService
      .collection("admin")
      .doc(import.meta.env.VITE_ADMIN_UID)
      .collection("survey")
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => ({
          ...(doc.data() as Survey),
          id: doc.id,
        }));
        setSurveys(data);
      });

    subSurvey;
    return subSurvey;
  }, []);

  const { user } = Auth.use();
  const [hasAnswered, setHasAnswered] = useState(true);

  useEffect(() => {
    if (user) {
      const subUser = dbService
        .collection("surveys")
        .where("id", "==", user.id) //! query 검색조건
        .onSnapshot((snap) => {
          const data = snap.docs.map((doc) => ({ ...doc.data() }));

          if (data.length === 0) {
            setHasAnswered(false);
          } else {
            setHasAnswered(true);
          }
        });

      subUser;
      return subUser;
    }
  }, [user]);

  const navi = useNavigate();
  const onSubmit = useCallback(async () => {
    if (!user) {
      return;
    }
    try {
      const ref = dbService.collection("surveys").doc(user.id);
      const answers: any[] = [];
      surveys.map((survey) => answers.push(survey.answers));

      const data = JSON.stringify(answers);
      await ref.set({ data, id: user.id });
      alert("제출되었습니다.");
      navi("/");
    } catch (error: any) {
      return alert(error.message);
    }
  }, [surveys, user, navi]);

  return hasAnswered ? (
    <h1>이미 설문에 응답하셨습니다.</h1>
  ) : (
    <Form.Container
      className="border w-full max-w-100 mx-auto p-5"
      onSubmit={onSubmit}
    >
      {surveys.map((survey, index) => (
        <SurveyItem
          key={index}
          index={index}
          {...survey}
          onChange={(answers) =>
            setSurveys((prev) =>
              prev.map((item) =>
                item.id === survey.id ? { ...item, answers } : item
              )
            )
          }
        />
      ))}

      <Button.Opacity type="submit" className="mt-2.5 bg-pink-400 text-white">
        제출하기
      </Button.Opacity>
    </Form.Container>
  );
};

export default SurveyPage;
