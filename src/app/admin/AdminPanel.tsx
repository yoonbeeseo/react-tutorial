import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { dbService } from "../../lib";
import { Container, Form, Button } from "../../components";
import SurveyMakeForm from "./SurveyMakeForm";

const AdminPanel = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isAdding, setIsAdding] = useState(true);

  const addHandler = useCallback(() => setIsAdding((prev) => !prev), []);

  const ref = useMemo(
    () =>
      dbService
        .collection("admin")
        .doc(import.meta.env.VITE_ADMIN_UID)
        .collection("survey"),
    []
  );

  const onAddSurvey = useCallback(
    async (
      newSurvey: Survey
    ): Promise<{ success: boolean; message?: string }> => {
      try {
        await ref.add(newSurvey);
        return { success: true };
      } catch (error: any) {
        return { success: false, message: error.message };
      }
    },
    [ref]
  );

  useEffect(() => {
    const subSurvey = ref.onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(data);
    });

    subSurvey;
    return subSurvey;
  }, [ref]);

  return (
    <>
      {isAdding ? (
        <SurveyMakeForm />
      ) : (
        <>
          <Button.Opacity onClick={addHandler}>
            설문지에 질문 추가하기
          </Button.Opacity>

          <ul>
            {surveys.map((survey) => (
              <li key={survey.id}>{survey.q}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default AdminPanel;
