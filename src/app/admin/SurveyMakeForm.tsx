import { useState, useCallback, useRef, useMemo } from "react";
import { Container, Form, Button } from "../../components";
import { stringValidator } from "../../lib";
import { Alert } from "../../contexts";

interface Props {
  onAddSurvey: (
    newSurvey: Survey
  ) => Promise<{ success: boolean; message?: string }>;

  onUpdateSurvey?: (
    updatedSurvey: Survey
  ) => Promise<{ success: boolean; message?: string }>;

  closeFn: () => void;

  payload?: Survey;
}

const SurveyMakeForm = ({
  closeFn,
  onAddSurvey,
  onUpdateSurvey,
  payload,
}: Props) => {
  const initialState = useMemo<Survey>(() => {
    if (payload) {
      return payload;
    }
    return {
      answers: [],
      createdAt: "",
      id: "",
      isMultiple: false,
      options: [],
      q: "",
    };
  }, [payload]);

  const [survey, setSurvey] = useState(initialState);
  const onChange = useCallback((target: keyof Survey, value: any) => {
    setSurvey((prev) => ({ ...prev, [target]: value }));
  }, []);

  const [option, setOption] = useState("");
  const [isInsertingOption, setIsInsertingOption] = useState(false);

  const qRef = useRef<HTMLInputElement>(null);
  const oRef = useRef<HTMLInputElement>(null);

  const qMessage = useMemo(
    () => stringValidator(survey.q, "질문을 확인해주세요."),
    [survey.q]
  );

  const oMessage = useMemo(() => {
    const os = survey.options;
    if (os.length === 0) {
      return "질문의 답변을 생성해주세요.";
    }
    if (os.length < 2) {
      return "2개 이상의 답변을 생성해주세요.";
    }
    return null;
  }, [survey.options]);

  const focus = useCallback(
    (target: keyof Survey) => {
      setTimeout(() => {
        switch (target) {
          case "q":
            return qRef.current?.focus();
          case "options":
            return oRef.current?.focus();
        }
      }, 100);
    },
    [qRef, oRef]
  );

  const { alert } = Alert.use();

  const onSubmit = useCallback(() => {
    if (isInsertingOption) {
      return;
    }
    if (qMessage) {
      return alert(qMessage, [{ onClick: () => focus("q") }]);
    }
    if (oMessage) {
      return alert(oMessage, [{ onClick: () => focus("options") }]);
    }

    const fn = async () => {
      try {
        const { success, message } =
          payload && onUpdateSurvey
            ? await onUpdateSurvey(survey)
            : await onAddSurvey(survey);

        if (!success) {
          return alert(message!);
        }

        alert(payload ? "수정했습니다." : "추가했습니다.");
        if (!payload) {
          setSurvey(initialState);
        }
        closeFn();
      } catch (error: any) {
        return alert(error.message);
      }
    };

    if (!survey.isMultiple) {
      alert("정답을 복수 선택할 수 없는게 맞습니까?", [
        {
          text: "선택안함",
          onClick: () => {
            fn();
          },
        },
        {
          text: "복수선택",
          onClick: () => {
            onChange("isMultiple", true);
            fn();
          },
        },
      ]);
    } else {
      fn();
    }
  }, [
    focus,
    qMessage,
    oMessage,
    alert,
    survey,
    onChange,
    isInsertingOption,
    payload,
    closeFn,
    onAddSurvey,
    onUpdateSurvey,
    initialState,
  ]);

  return (
    <Form.Container className="border w-full p-5" onSubmit={onSubmit}>
      <Container.Row className="gap-x-2.5">
        <Container.Col className="gap-y-1 flex-1">
          <Form.Label htmlFor="q">질문</Form.Label>
          <Form.Input
            id="q"
            value={survey.q}
            onChange={(e) => onChange("q", e.target.value)}
            placeholder="예) 설문하고 싶은 질문을 적어주세요."
          />
        </Container.Col>

        <Container.Col className="gap-y-1">
          <Form.Label htmlFor="m">중복선택여부</Form.Label>
          <Form.Select
            id="m"
            value={survey.isMultiple ? "선택가능" : "선택안함"}
            onChange={(e) => {
              onChange("isMultiple", e.target.value === "선택가능");
            }}
          >
            <option value="선택안함">선택안함</option>
            <option value="선택가능">선택가능</option>
          </Form.Select>
        </Container.Col>
      </Container.Row>

      <Container.Col className="gap-y-2.5">
        <ul className="flex flex-col gap-y-1.5">
          {survey.options.map((option, index) => (
            <li key={option}>
              <Button.Opacity
                className="w-full"
                onClick={() =>
                  alert("삭제하시겠습니까?", [
                    { text: "취소" },
                    {
                      text: "삭제",
                      onClick: () =>
                        setSurvey((prev) => ({
                          ...prev,
                          options: prev.options.filter(
                            (item) => item !== option
                          ),
                        })),
                    },
                  ])
                }
              >
                {index + 1}. {option}
              </Button.Opacity>
            </li>
          ))}
        </ul>

        <Form.Input
          placeholder="답변을 추가해주세요."
          ref={oRef}
          onFocus={() => setIsInsertingOption(true)}
          onBlur={() => setIsInsertingOption(false)}
          onKeyDown={(e) => {
            const key = e.key;
            if (key === "Enter" || key === "Tab") {
              if (e.nativeEvent.isComposing) {
                return;
              }
              if (!isInsertingOption && !oMessage) {
                return;
              }
              if (stringValidator(option)) {
                return alert("옵션을 입력해주세요.", [
                  { onClick: () => focus("options") },
                ]);
              }
              const foundOption = survey.options.find(
                (item) => item === option
              );
              if (foundOption) {
                return alert("중복된 답변입니다.");
              }
              setSurvey((prev) => ({
                ...prev,
                options: [...prev.options, option],
              }));

              setOption("");
              focus("options");
            }
          }}
          value={option}
          onChange={(e) => setOption(e.target.value)}
        />
        <Button.Opacity onClick={() => focus("options")}>
          답변 추가
        </Button.Opacity>
      </Container.Col>

      <Button.Opacity type="submit" className="bg-gray-800 text-white">
        질문 생성하기
      </Button.Opacity>
    </Form.Container>
  );
};

export default SurveyMakeForm;
