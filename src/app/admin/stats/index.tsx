import { useState, useEffect, useCallback } from "react";
import { dbService } from "../../../lib";
import { Button } from "../../../components";

interface SurveyResponse {
  answers: string[][];
  id: string;
}

const AdminStatsPage = () => {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    const subRes = dbService.collection("surveys").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        answers: JSON.parse(doc.data().data),
      }));

      console.log(data);
      setResponses(data as SurveyResponse[]);
    });

    subRes;
    return subRes;
  }, []);

  useEffect(() => {
    const subSurvey = dbService
      .collection("admin")
      .doc(import.meta.env.VITE_ADMIN_UID)
      .collection("survey")
      .onSnapshot((snap) => {
        const data = snap.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as Survey)
        );

        setSurveys(data);
      });

    subSurvey;
    return subSurvey;
  }, []);

  const onCheck = useCallback(() => {
    const res = Array.from({ length: surveys.length }, (_, i) =>
      Array.from(
        {
          length: surveys[i].options.length,
        },
        () => 0
      )
    );

    surveys.map((survey, si) => {
      responses.map((response) => {
        survey.options.map((option, oi) => {
          response.answers[si].map((answer) => {
            if (answer === option) {
              res[si][oi] += 1;
            }
          });
        });
      });
    });

    console.log(res);

    const total = res.map((r) => {
      return r.reduce((a, b) => a + b, 0);
    });

    console.log(total);

    res.map((rs, ri) => {
      const t = total[ri];
      rs.map((rs, rsi) => {
        const per = (rs / t) * 100;
        console.log(
          `${ri + 1}번째 질문의 ${rsi + 1}번째 답변률은 ${per.toFixed(
            2
          )}%입니다.`
        );
      });
    });
  }, [surveys, responses]);
  return (
    <div>
      AdminStatsPage
      <ul>
        {responses.map((res) => (
          <li key={res.id}>
            <p>{res.id}</p>
            <ul className="border">
              {res.answers.map((a, index) => (
                <li key={index}>
                  Q{index + 1}.
                  <ul>
                    {a.map((answer, ai) => (
                      <li key={ai}>{answer}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Button.Opacity className="w-full" onClick={onCheck}>
        Check
      </Button.Opacity>
    </div>
  );
};

export default AdminStatsPage;
