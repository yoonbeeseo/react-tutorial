import { useState, useEffect, useCallback, useRef } from "react";
import { OnChangeSignup } from "./Content_n";
import { Animated, Container, Form } from "../../components";
import { userPoints, userInterests } from "../../lib";
import { AiOutlineClose } from "react-icons/ai";

interface Props extends OnChangeSignup {
  points: UserPoint[];
  interests: UserInterestType[];

  interestRef: React.RefObject<HTMLSelectElement | null>;
  pointRef: React.RefObject<HTMLSelectElement | null>;
}
const Content_4 = ({
  interests,
  onChange,
  points,
  interestRef,
  pointRef,
}: Props) => {
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

  const iRef = useRef<HTMLSelectElement>(null);
  const pRef = useRef<HTMLSelectElement>(null);

  interface ItemProps {
    value: (UserPoint | UserInterestType)[];
    target: "pt" | "i";
  }
  const Item = useCallback(
    ({ target, value }: ItemProps) => {
      const data = target === "i" ? userInterests : userPoints;

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

                setTimeout(() => {
                  if (iRef.current) {
                    iRef.current.value = "선택";
                  }
                }, 300);

                return;
              }
              setPts((prev) => {
                const value = e.target.value as UserPoint;
                const found = prev.find((item) => item === value);
                if (found) {
                  return prev.filter((item) => item !== value);
                }
                return [value, ...prev];
              });
              setTimeout(() => {
                if (pRef.current) {
                  pRef.current.value = "선택";
                }
              }, 300);
            }}
            ref={target === "i" ? interestRef : pointRef}
          >
            <option>선택</option>

            {data.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Form.Select>

          <ul className="flex flex-wrap gap-1">
            {value.map((v) => (
              <li
                key={v}
                className="rounded px-1 bg-gray-50 text-gray-500 text-sm flex gap-x-1"
              >
                {v}
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => {
                    if (target === "i") {
                      setIs((prev) => prev.filter((item) => item !== v));
                    } else {
                      setPts((prev) => prev.filter((item) => item !== v));
                    }
                  }}
                >
                  <AiOutlineClose />
                </button>
              </li>
            ))}
          </ul>
        </Container.Col>
      );
    },
    [iRef, pRef]
  );

  return (
    <Animated.Emerge className="gap-y-2.5">
      <Item target="i" value={is} />
      <Item target="pt" value={pts} />
    </Animated.Emerge>
  );
};

export default Content_4;
