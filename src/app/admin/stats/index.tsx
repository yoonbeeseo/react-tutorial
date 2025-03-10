import { useState, useEffect } from "react";
import { dbService } from "../../../lib";

interface SurveyResponse {
  answers: string[][];
  id: string;
}

const AdminStatsPage = () => {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    const subRes = dbService.collection("surveys").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        answers: JSON.parse(doc.data().data),
      }));

      setResponses(data as SurveyResponse[]);
    });

    subRes;
    return subRes;
  }, []);

  return (
    <div>
      AdminStatsPage
      <ul>
        {responses.map((res) => (
          <li key={res.id}>
            <p>{res.id}</p>
            <ul>
              {res.answers.map((a, index) => (
                <li key={index}>{a}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminStatsPage;
