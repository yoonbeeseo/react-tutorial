import { useState, useEffect, useCallback } from "react";
import { OnChangeSignup } from "./Content_n";
import { Container, Form } from "../../components";

interface Props extends OnChangeSignup {
  points: UserPoint[];
  interests: UserInterestType[];
}
const Content_4 = ({ interests, onChange, points }: Props) => {
  const [is, setIs] = useState(interests);
  const [pts, setPts] = useState(points);

  useEffect(() => {
    onChange("interests", is);
    return () => {
      onChange("interests", is);
    };
  }, [onChange, is]);

  useEffect(() => {
    onChange("points", pts);
    return () => {
      onChange("points", pts);
    };
  }, [onChange, pts]);

  interface ItemProps {
    value: (UserPoint | UserInterestType)[];
    target: "pt" | "i";
  }
  const Item = useCallback(({ target, value }: ItemProps) => {
    return (
      <Container.Col className="gap-y-1">
        <Form.Label htmlFor={target}>
          {target === "i" ? "관심사" : "호감 포인트"}
        </Form.Label>
        <Form.Select
          onChange={(e) => {
            if (target === "i") {
              setIs((prev) => {
                const value = e.target.value as UserInterestType;
                const found = prev.find(
                  (item) => item === (value as UserInterestType)
                );
                if (found) {
                  return prev.filter((item) => item !== value);
                }
                return [value, ...prev];
              });
              return;
            }
          }}
        >
          <option>선택</option>
        </Form.Select>
      </Container.Col>
    );
  }, []);

  return (
    <div>
      <Item target="i" value={is} />
      <Item target="pt" value={pts} />
    </div>
  );
};

export default Content_4;
