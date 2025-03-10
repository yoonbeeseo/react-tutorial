import { useState, useEffect } from "react";
import { dbService } from "../../../lib";
import { Container } from "../../../components";
import PercentageBar from "./PercentageBar";

interface SurveyResponse {
  answers: string[][];
  id: string;
}

type AArray = number[][];

const AdminStatsPage = () => {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [percentages, setPercentages] = useState<AArray>([]);

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

  useEffect(() => {
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

    const total = res.map((r) => {
      return r.reduce((a, b) => a + b, 0);
    });

    const totalPercentages = res.map((rs, ri) => {
      const t = total[ri];
      return rs.map((rs) => {
        const per = (rs / t) * 100;
        // console.log(
        //   `${ri + 1}번째 질문의 ${rsi + 1}번째 답변률은 ${per.toFixed(
        //     2
        //   )}%입니다.`
        // );

        return per;
      });
    });

    setPercentages(totalPercentages);
  }, [surveys, responses]);

  useEffect(() => {
    console.log(percentages);
  }, [percentages]);

  return (
    <ul className="flex flex-col gap-y-5 max-w-100 mx-auto mt-5">
      {percentages.map((p, pi) => (
        <li key={pi} className="flex flex-col gap-y-2.5">
          <Container.Row className="flex-wrap items-center gap-x-2.5">
            <p className="text-xl font-bold">
              Q{pi + 1}. {surveys[pi].q}
            </p>
            <p className="text-xs text-gray-500">
              {surveys[pi].isMultiple && "(중복선택가능)"}
            </p>
          </Container.Row>

          <ul className="flex flex-col gap-y-1">
            {surveys[pi].options.map((option, oi) => {
              return (
                <li key={oi}>
                  <PercentageBar per={p[oi]} answer={option} />
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default AdminStatsPage;
