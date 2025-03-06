import { useSearchParams, useNavigate } from "react-router-dom";
import { Form, Container, Button, Typo, Animated } from "../../components";
import { useCallback, useState, useMemo, useRef } from "react";
import Content_n from "./Content_n";
import Content_0 from "./Content_0";
import Content_1 from "./Content_1";
import Content_2 from "./Content_2";
import Content_3 from "./Content_3";
import Content_4 from "./Content_4";

const Signup = () => {
  const content = useSearchParams()[0].get("content");
  const navi = useNavigate();

  const initialState = useMemo<User>(
    () => ({
      address: "",
      appearance: {
        bodyType: "",
        height: {
          isCM: true,
          value: 0,
        },
        weight: {
          value: 0,
          isKG: true,
        },
      },
      createdAt: 0,
      distance: 0,
      dob: "",
      drinks: "",
      workouts: "",
      smokes: "",
      email: "",
      gender: "",
      id: "",
      interests: [],
      isVegetarian: false,
      mobile: "010",
      name: "",
      points: [],
      purposes: [],
    }),
    []
  );

  const [props, setProps] = useState(initialState);
  const {
    address,
    appearance,
    distance,
    dob,
    drinks,
    email,
    gender,
    interests,
    isVegetarian,
    mobile,
    name,
    points,
    purposes,
    smokes,
    workouts,
  } = props;

  const onChange = useCallback(
    (target: keyof User, value: any) =>
      setProps((prev) => ({ ...prev, [target]: value })),
    []
  );

  const [pws, setPws] = useState({
    pw: "",
    con: "",
  });
  const onChangePw = useCallback(
    (target: "pw" | "con", value: string) =>
      setPws((prev) => ({ ...prev, [target]: value })),
    []
  );

  const onSubmit = useCallback(() => {
    const next = (number: number) => navi(`/signup?content=${number}`);
    if (!content) {
      return next(0);
    }
    // switch (Number(content)) {
    //   case 0:
    //     return console.log("case 0 logic");
    //   // case 0:
    //   //   return console.log("case 0 logic");
    //   // case 0:
    //   //   return console.log("case 0 logic");
    //   // case 0:
    //   //   return console.log("case 0 logic");
    //   // case 0:
    //   //   return console.log("case 0 logic");
    // }
    next(Number(content) + 1);
  }, [navi, content]);

  return (
    <Form.Container className="m-5 max-w-100 mx-auto" onSubmit={onSubmit}>
      <Typo.H1>자신에 대해 알려주세요.</Typo.H1>
      {content ? (
        {
          0: (
            <Content_0
              email={email}
              gender={gender}
              onChange={onChange}
              {...pws}
              onChangePw={onChangePw}
            />
          ),
          1: (
            <Content_1
              address={address}
              distance={distance}
              onChange={onChange}
              purposes={purposes}
            />
          ),
          2: (
            <Content_2
              appearance={appearance}
              isVegetarian={isVegetarian}
              onChange={onChange}
            />
          ),
          3: (
            <Content_3
              drinks={drinks}
              onChange={onChange}
              smokes={smokes}
              workouts={workouts}
            />
          ),
          4: (
            <Content_4
              interests={interests}
              onChange={onChange}
              points={points}
            />
          ),
        }[content]
      ) : (
        <Content_n
          dob={dob}
          mobile={mobile}
          name={name}
          // {...props} //! 필요한 것만 쓰면 됨
          onChange={onChange}
        />
      )}
      <Button.Opacity type="submit" className="bg-pink-400 text-white mt-2.5">
        다음
      </Button.Opacity>
    </Form.Container>
  );
};

export default Signup;
