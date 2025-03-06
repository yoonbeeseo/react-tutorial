import { useEffect, useRef, useState } from "react";
import { OnChangeSignup } from "./Content_n";
import { Animated, Button, Container, Form } from "../../components";
import { twMerge } from "tailwind-merge";
import { bodyTypes } from "../../lib";

interface Props extends OnChangeSignup {
  isVegetarian: boolean;
  appearance: UserAppearance;

  heightRef: React.RefObject<HTMLInputElement | null>;
  weightRef: React.RefObject<HTMLInputElement | null>;
  bodyRef: React.RefObject<HTMLSelectElement | null>;
}

const Content_2 = ({
  appearance,
  isVegetarian,
  onChange,
  bodyRef,
  heightRef,
  weightRef,
}: Props) => {
  const [a, setA] = useState(appearance);

  useEffect(() => {
    onChange("appearance", a);
    return () => {
      onChange("appearance", a);
    };
  }, [onChange, a]);

  return (
    <Animated.Emerge className="gap-y-2.5">
      <Container.Row>
        <Container.Col className="gap-y-1">
          <Form.Label htmlFor="vege">*식습관: 채식주의이신가요?</Form.Label>
          <Container.Row className="gap-x-2.5">
            {["Yes", "No"].map((item) => {
              return (
                <Button.Opacity
                  key={item}
                  onClick={() => onChange("isVegetarian", item === "Yes")}
                  className={twMerge(
                    "w-10 rounded-full hover:bg-gray-100",
                    item === "Yes" ? isVegetarian && st : !isVegetarian && st
                  )}
                >
                  {item}
                </Button.Opacity>
              );
            })}
          </Container.Row>
        </Container.Col>
      </Container.Row>

      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="height">키</Form.Label>
        <Container.Row className="gap-x-2.5">
          <Form.Input
            ref={heightRef}
            id="height"
            value={a.height.value === 0 ? "" : a.height.value}
            placeholder={`키를 ${a.height.isCM ? "cm" : "ft"}로 입력해주세요.`}
            onChange={(e) =>
              setA((prev) => ({
                ...prev,
                height: { ...prev.height, value: Number(e.target.value) },
              }))
            }
            className="flex-1"
            type="number"
            min={0}
          />
          <Button.Opacity
            onClick={() =>
              setA((prev) => ({
                ...prev,
                height: { ...prev.height, isCM: !prev.height.isCM },
              }))
            }
            className={st}
          >
            {a.height.isCM ? "cm" : "ft"}
          </Button.Opacity>
        </Container.Row>
      </Container.Col>

      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="weight">몸무게</Form.Label>
        <Container.Row className="gap-x-2.5">
          <Form.Input
            ref={weightRef}
            min={0}
            id="weight"
            value={a.weight.value === 0 ? "" : a.weight.value}
            placeholder={`몸무게를 ${
              a.weight.isKG ? "kg" : "lb"
            }로 입력해주세요.`}
            onChange={(e) =>
              setA((prev) => ({
                ...prev,
                weight: { ...prev.weight, value: Number(e.target.value) },
              }))
            }
            className="flex-1"
            type="number"
          />
          <Button.Opacity
            onClick={() =>
              setA((prev) => ({
                ...prev,
                weight: { ...prev.weight, isKG: !prev.weight.isKG },
              }))
            }
            className={st}
          >
            {a.weight.isKG ? "kg" : "lb"}
          </Button.Opacity>
        </Container.Row>
      </Container.Col>

      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="body-type">체형</Form.Label>
        <Form.Select
          id="body-type"
          value={a.bodyType}
          onChange={(e) =>
            setA((prev) => ({
              ...prev,
              bodyType: e.target.value as UserBodyType,
            }))
          }
          ref={bodyRef}
        >
          <option>선택</option>

          {bodyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Form.Select>
      </Container.Col>
    </Animated.Emerge>
  );
};

export default Content_2;

const st = "bg-pink-400 text-white hover:bg-pink-400 w-10";
