import { useSearchParams, useNavigate } from "react-router-dom";
import { Form, Button, Typo } from "../../components";
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

  //! content = X
  const nameRef = useRef<HTMLInputElement>(null);
  const dobRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  const payload_n = useMemo(
    () => ({
      nameRef,
      dobRef,
      mobileRef,
      name,
      dob,
      mobile,
      onChange,
    }),
    [nameRef, dobRef, mobileRef, name, dob, mobile, onChange]
  );

  //! content = 0
  const genderRef = useRef<HTMLSelectElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const conRef = useRef<HTMLInputElement>(null);

  const payload_0 = useMemo(
    () => ({
      gender,
      email,
      ...pws,
      onChange,
      genderRef,
      emailRef,
      pwRef,
      conRef,
      onChangePw,
    }),
    [
      gender,
      email,
      pws,
      onChange,
      genderRef,
      emailRef,
      pwRef,
      conRef,
      onChangePw,
    ]
  );

  //! content = 1
  const addressRef = useRef<HTMLInputElement>(null);
  const distanceRef = useRef<HTMLSelectElement>(null);
  const purposeRef = useRef<HTMLSelectElement>(null);

  const payload_1 = useMemo(
    () => ({
      address,
      distance,
      purposes,
      onChange,
      addressRef,
      distanceRef,
      purposeRef,
    }),
    [address, distance, purposes, onChange, addressRef, distanceRef, purposeRef]
  );

  //! content = 2
  const heightRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLSelectElement>(null);

  const payload_2 = useMemo(
    () => ({
      isVegetarian,
      appearance,
      onChange,
      heightRef,
      weightRef,
      bodyRef,
    }),
    [isVegetarian, appearance, onChange, heightRef, weightRef, bodyRef]
  );

  //! content = 3
  const workoutRef = useRef<HTMLSelectElement>(null);
  const drinkRef = useRef<HTMLSelectElement>(null);
  const smokeRef = useRef<HTMLSelectElement>(null);

  const payload_3 = useMemo(
    () => ({
      workouts,
      drinks,
      smokes,
      onChange,
      workoutRef,
      drinkRef,
      smokeRef,
    }),
    [workouts, drinks, smokes, onChange, workoutRef, drinkRef, smokeRef]
  );

  //! content = 4
  const interestRef = useRef<HTMLSelectElement>(null);
  const pointRef = useRef<HTMLSelectElement>(null);

  const payload_4 = useMemo(
    () => ({ interests, points, onChange, interestRef, pointRef }),
    [interests, points, onChange, interestRef, pointRef]
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
          0: <Content_0 {...payload_0} />,
          1: <Content_1 {...payload_1} />,
          2: <Content_2 {...payload_2} />,
          3: <Content_3 {...payload_3} />,
          4: <Content_4 {...payload_4} />,
        }[content]
      ) : (
        <Content_n {...payload_n} />
      )}
      <Button.Opacity type="submit" className="bg-pink-400 text-white mt-2.5">
        다음
      </Button.Opacity>
    </Form.Container>
  );
};

export default Signup;
