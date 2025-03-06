import { useState } from "react";
import { OnChangeSignup } from "./Content_n";
import { Animated, Container, Form } from "../../components";
import { distances, userPurposes } from "../../lib";

interface Props extends OnChangeSignup {
  purposes: UserPurpose[];
  address: string;
  distance: number;
}

const Content_1 = ({ address, distance, onChange, purposes }: Props) => {
  const [ps, setPs] = useState(purposes);

  return (
    <Animated.Emerge className="gap-y-2.5">
      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="address">주소</Form.Label>
        <Form.Input
          value={address}
          id="address"
          placeholder="서울특별시 강남구 00동"
          onChange={(e) => onChange("address", e.target.value)}
        />
      </Container.Col>
      <Container.Col className="gap-y-1">
        <Form.Label htmlFor="distance">연애가능거리</Form.Label>
        <Form.Select
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
          id="purpose"
          onChange={(e) =>
            setPs((prev) => {
              const up = e.target.value as UserPurpose;

              const foundP = prev.find((item) => item === up);
              if (foundP) {
                return prev.filter((item) => item !== up);
              }
              return [up, ...prev];
            })
          }
        >
          <option>선택</option>
          {userPurposes.map((up) => (
            <option key={up} value={up}>
              {up}
            </option>
          ))}
        </Form.Select>
        <ul className="border">
          {ps?.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </Container.Col>
    </Animated.Emerge>
  );
};

export default Content_1;
