import { useState, useEffect } from "react";
import { OnChangeSignup } from "./Content_n";
import { Animated, Container, Form } from "../../components";
import { distances, userPurposes } from "../../lib";
import { AiOutlineClose } from "react-icons/ai";

interface Props extends OnChangeSignup {
  purposes: UserPurpose[];
  address: string;
  distance: number;

  distanceRef: React.RefObject<HTMLSelectElement | null>;
  purposeRef: React.RefObject<HTMLSelectElement | null>;
  addressRef: React.RefObject<HTMLInputElement | null>;
}

const Content_1 = ({
  address,
  distance,
  onChange,
  purposes,
  addressRef,
  distanceRef,
  purposeRef,
}: Props) => {
  const [ps, setPs] = useState(purposes);

  useEffect(() => {
    onChange("purposes", ps);

    return () => {
      onChange("purposes", ps);
    };
  }, [ps, onChange]);

  return (
    <Animated.Emerge className="gap-y-2.5">
      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="address">주소</Form.Label>
        <Form.Input
          value={address}
          id="address"
          placeholder="서울특별시 강남구 00동"
          onChange={(e) => onChange("address", e.target.value)}
          ref={addressRef}
        />
      </Container.Col>
      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="distance">연애가능거리</Form.Label>
        <Form.Select
          ref={distanceRef}
          id="distance"
          value={distance}
          onChange={(e) => onChange("distance", Number(e.target.value))}
        >
          <option>선택</option>

          {distances.map((d) => (
            <option value={d} key={d}>
              {d} km
            </option>
          ))}
        </Form.Select>
      </Container.Col>

      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="purpose">목표</Form.Label>
        <Form.Select
          ref={purposeRef}
          id="purpose"
          onChange={(e) => {
            setPs((prev) => {
              const up = e.target.value as UserPurpose;

              const foundP = prev.find((item) => item === up);
              if (foundP) {
                return prev.filter((item) => item !== up);
              }
              return [up, ...prev];
            });
            setTimeout(() => {
              if (purposeRef.current) {
                purposeRef.current.value = "선택";
              }
            }, 300);
          }}
        >
          <option>선택</option>
          {userPurposes.map((up) => (
            <option key={up} value={up}>
              {up}
            </option>
          ))}
        </Form.Select>
        <ul className="flex gap-y-1 flex-wrap gap-x-1">
          {ps?.map((p) => (
            <li key={p} className="flex">
              <Container.Row className="p-1 rounded bg-gray-50 gap-x-1">
                {p}
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() =>
                    setPs((prev) => prev.filter((item) => item !== p))
                  }
                >
                  <AiOutlineClose />
                </button>
              </Container.Row>
            </li>
          ))}
        </ul>
      </Container.Col>
    </Animated.Emerge>
  );
};

export default Content_1;
