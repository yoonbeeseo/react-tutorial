import { useState, useCallback } from "react";
import { Button, Container, Typo } from "../../components";
import { twMerge } from "tailwind-merge";

interface Props extends Survey {
  index: number;
  onChange: (answers: string[]) => void;
}
const SurveyItem = ({
  answers,
  isMultiple,
  options,
  q,
  index,
  onChange,
}: Props) => {
  const [as, setAs] = useState(answers);

  const onClickOption = useCallback(
    (answer: string) => {
      setAs((prev) => {
        let copy = [...prev];
        const found = copy.find((item) => item === answer);
        if (found) {
          copy = copy.filter((item) => item !== answer);
        }

        if (!isMultiple) {
          copy = [answer];
        } else {
          copy.push(answer);
        }

        onChange(copy);
        return copy;
      });
    },
    [isMultiple, onChange]
  );

  return (
    <Container.Col className="gap-y-1">
      <Container.Row className="flex-wrap">
        <Typo.Text className="font-bold">
          Q{index + 1}. {q}
        </Typo.Text>
        <Typo.Text className="text-gray-500 text-xs">
          {isMultiple && "(중복선택 가능)"}
        </Typo.Text>
      </Container.Row>
      <ul className="flex flex-col gap-y-1">
        {options.map((option) => {
          const selected = as.find((item) => item === option);

          return (
            <li key={option}>
              <Button.Opacity
                onClick={() => onClickOption(option)}
                className={twMerge(
                  "p-1 h-auto text-xs text-gray-600 px-2",
                  selected && "bg-pink-400 text-white"
                )}
              >
                {option}
              </Button.Opacity>
            </li>
          );
        })}
      </ul>
    </Container.Col>
  );
};

export default SurveyItem;
