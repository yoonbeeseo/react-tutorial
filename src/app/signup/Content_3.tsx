import { useState } from "react";
import { OnChangeSignup } from "./Content_n";
import { Animated, Button, Container, Form } from "../../components";
import { counts } from "../../lib";
import { FaArrowRotateLeft } from "react-icons/fa6";

interface Props extends OnChangeSignup {
  workouts: UserCount | string;
  drinks: UserCount | string;
  smokes: UserCount | string;

  workoutRef: React.RefObject<HTMLSelectElement | null>;
  smokeRef: React.RefObject<HTMLSelectElement | null>;
  drinkRef: React.RefObject<HTMLSelectElement | null>;
}

const Content_3 = ({
  drinks,
  onChange,
  smokes,
  workouts,
  drinkRef,
  smokeRef,
  workoutRef,
}: Props) => {
  const items: ItemProps[] = [
    {
      id: "workouts",
      onChange: (value) => onChange("workouts", value),
      title: "운동 횟수 / 주",
      value: workouts,
      ref: workoutRef,
    },
    {
      id: "drinks",
      onChange: (value) => onChange("drinks", value),
      title: "술자리 횟수 / 주",
      value: drinks,
      ref: drinkRef,
    },
    {
      id: "smokes",
      onChange: (value) => onChange("smokes", value),
      title: "흡연 횟수 / 주",
      value: smokes,
      ref: smokeRef,
    },
  ];

  return (
    <Animated.Emerge className="gap-y-2.5">
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
      {/* <Item
        id="workouts"
        onChange={(value) => onChange("workouts", value)}
        title="운동 횟수 / 주"
        value={workouts}
      />
      <Item
        id="drinks"
        onChange={(value) => onChange("drinks", value)}
        title="술자리 횟수 / 주"
        value={drinks}
      />
      <Item
        id="smokes"
        onChange={(value) => onChange("smokes", value)}
        title="흡연 횟수 / 주"
        value={smokes}
      /> */}
    </Animated.Emerge>
  );
};

export default Content_3;

interface ItemProps {
  id: string;
  value: UserCount | string;
  title: string;
  onChange: (value: string) => void;
  ref: React.RefObject<HTMLSelectElement | null>;
}
const Item = ({ id, onChange, value, title, ref }: ItemProps) => {
  const [isDirectlyInserting, setIsDirectlyInserting] = useState(false);

  return (
    <Container.Col className="gap-y-1">
      <Form.Label htmlFor={id}>{title}</Form.Label>
      {isDirectlyInserting ? (
        <Container.Row className="gap-x-2.5">
          <Form.Input
            id="workout"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="1주일 운동 횟수를 적어주세요."
            className="flex-1"
          />
          <Button.Opacity
            className="w-10"
            onClick={() => setIsDirectlyInserting(false)}
          >
            <FaArrowRotateLeft />
          </Button.Opacity>
        </Container.Row>
      ) : (
        <Form.Select
          ref={ref}
          id="workout"
          value={value}
          onChange={(e) => {
            if (e.target.value === "직접입력") {
              return setIsDirectlyInserting(true);
            }
            onChange(e.target.value);
          }}
        >
          <option>선택</option>
          {counts.map((count) => (
            <option key={count} value={count}>
              {count} {count === "직접입력" ? "" : "/ 주"}
            </option>
          ))}
        </Form.Select>
      )}
    </Container.Col>
  );
};
