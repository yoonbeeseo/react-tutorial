import bcrypt from "bcryptjs";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Form, Button, Typo } from "../../components";
import { useCallback, useState, useMemo, useRef } from "react";
import Content_n from "./Content_n";
import Content_0 from "./Content_0";
import Content_1 from "./Content_1";
import Content_2 from "./Content_2";
import Content_3 from "./Content_3";
import Content_4 from "./Content_4";
import {
  arrayLengthValidator,
  dobValidator,
  emailValidator,
  heightWeightValidator,
  mobileValidator,
  stringValidator,
  dbService,
} from "../../lib";
import { Alert } from "../../contexts";
import { v4 } from "uuid";

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

  const focus = useCallback(
    (target: keyof User | "pw" | "con" | keyof UserAppearance) => {
      setTimeout(() => {
        switch (target) {
          case "address":
            return addressRef.current?.focus();
          case "con":
            return conRef.current?.focus();
          case "pw":
            return pwRef.current?.focus();
          case "distance":
            return distanceRef.current?.showPicker();
          case "dob":
            return dobRef.current?.focus();
          case "drinks":
            return drinkRef.current?.showPicker();
          case "smokes":
            return smokeRef.current?.showPicker();
          case "workouts":
            return workoutRef.current?.showPicker();
          case "gender":
            return genderRef.current?.showPicker();
          case "email":
            return emailRef.current?.focus();
          case "mobile":
            return mobileRef.current?.focus();
          case "name":
            return nameRef.current?.focus();
          case "points":
            return pointRef.current?.showPicker();
          case "purposes":
            return purposeRef.current?.showPicker();
          case "interests":
            return interestRef.current?.showPicker();
          case "weight":
            return weightRef.current?.focus();
          case "height":
            return heightRef.current?.focus();
          case "bodyType":
            return bodyRef.current?.showPicker();
        }
      }, 100);
    },
    [
      interestRef,
      pointRef,
      workoutRef,
      drinkRef,
      smokeRef,
      heightRef,
      weightRef,
      bodyRef,
      nameRef,
      dobRef,
      mobileRef,
      genderRef,
      emailRef,
      pwRef,
      conRef,
      addressRef,
      distanceRef,
      purposeRef,
    ]
  );

  const nameMessage = useMemo(
    () => stringValidator(name, "이름을 입력해주세요."),
    [name]
  );
  const dobMessage = useMemo(() => {
    if (stringValidator(dob)) {
      return "생년월일을 입력해주세요.";
    }

    let split: string[] = [];
    if (dob.includes(".") || dob.includes("-") || dob.includes("/")) {
      if (dob.includes(".")) {
        split = dob.split(".");
      } else if (dob.includes("-")) {
        split = dob.split("-");
      } else if (dob.includes("/")) {
        split = dob.split("/");
      }
    } else {
      if (dob.length !== 8) {
        return "생년월일을 확인해주세요.";
      }
      const year = `${dob[0]}${dob[1]}${dob[2]}${dob[3]}`;
      const month = `${dob[4]}${dob[5]}`;
      const date = `${dob[6]}${dob[7]}`;

      split = [year, month, date];
    }

    if (dobValidator(split)) {
      return dobValidator(split);
    }
    return null;
  }, [dob]);

  const mobileMessage = useMemo(() => mobileValidator(mobile), [mobile]);

  const genderMessage = useMemo(
    () => stringValidator(gender, "성별을 선택해주세요."),
    [gender]
  );

  const emailMessage = useMemo(() => emailValidator(email), [email]);

  const pwMessage = useMemo(
    () => stringValidator(pws.pw, "비밀번호를 확인해주세요."),
    [pws.pw]
  );

  const conMessage = useMemo(() => {
    if (stringValidator(pws.con)) {
      return stringValidator(pws.con, "비밀번호를 한 번 더 확인해주세요.");
    }
    if (pwMessage) {
      return pwMessage;
    }
    if (pws.pw !== pws.con) {
      return "비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.";
    }
  }, [pws, pwMessage]);

  const addressMessage = useMemo(
    () => stringValidator(address, "주소를 입력해주세요."),
    [address]
  );
  const distanceMessage = useMemo(() => {
    if (distance === 0) {
      return "연애 가능 거리를 입력해주세요.";
    }
    return null;
  }, [distance]);
  const purposeMessage = useMemo(
    () =>
      arrayLengthValidator(
        purposes,
        "목표를 선택해주세요. 다중 선택 가능합니다."
      ),
    [purposes]
  );

  const heightMessage = useMemo(
    () => heightWeightValidator(appearance.height.value, "키를 확인해주세요."),
    [appearance.height.value]
  );
  const weightMessage = useMemo(
    () =>
      heightWeightValidator(appearance.weight.value, "몸무게를 확인해주세요."),
    [appearance.weight.value]
  );
  const bodyTypeMessage = useMemo(
    () => stringValidator(appearance.bodyType, "체형을 선택해주세요."),
    [appearance.bodyType]
  );

  const workoutMessage = useMemo(
    () => stringValidator(workouts, "1주일에 몇 번 운동하시나요?"),
    [workouts]
  );
  const drinkMessage = useMemo(
    () => stringValidator(drinks, "1주일에 몇 번 술자리를 가지시나요?"),
    [drinks]
  );
  const smokeMessage = useMemo(
    () => stringValidator(smokes, "1주일에 몇 번 흡연하시나요?"),
    [smokes]
  );

  const interestMessage = useMemo(
    () =>
      arrayLengthValidator(
        interests,
        "관심사를 선택해주세요. 중복 선택 가능합니다."
      ),
    [interests]
  );
  const pointMessage = useMemo(
    () =>
      arrayLengthValidator(
        points,
        "호감 포인트를 선택해주세요. 중복 선택 가능합니다."
      ),
    [points]
  );

  const { alert } = Alert.use();
  const onSubmit = useCallback(async () => {
    const next = () => navi(`/signup?content=${Number(content) + 1}`);

    if (!content) {
      if (nameMessage) {
        return alert(nameMessage, [{ onClick: () => focus("name") }]);
      }
      if (dobMessage) {
        return alert(dobMessage, [{ onClick: () => focus("dob") }]);
      }
      if (mobileMessage) {
        return alert(mobileMessage, [{ onClick: () => focus("mobile") }]);
      }
      return navi(`/signup?content=0`);
    }
    switch (content) {
      case "0":
        if (genderMessage) {
          return alert(genderMessage, [{ onClick: () => focus("gender") }]);
        }
        if (emailMessage) {
          return alert(emailMessage, [{ onClick: () => focus("email") }]);
        }

        if (pwMessage) {
          return alert(pwMessage, [{ onClick: () => focus("pw") }]);
        }
        if (conMessage) {
          return alert(conMessage, [{ onClick: () => focus("con") }]);
        }
        return next();

      case "1":
        if (addressMessage) {
          return alert(addressMessage, [{ onClick: () => focus("address") }]);
        }
        if (distanceMessage) {
          return alert(distanceMessage, [{ onClick: () => focus("distance") }]);
        }
        if (purposeMessage) {
          return alert(purposeMessage, [{ onClick: () => focus("purposes") }]);
        }
        return next();

      case "2":
        if (heightMessage) {
          return alert(heightMessage, [{ onClick: () => focus("height") }]);
        }
        if (weightMessage) {
          return alert(weightMessage, [{ onClick: () => focus("weight") }]);
        }
        if (bodyTypeMessage) {
          return alert(bodyTypeMessage, [{ onClick: () => focus("bodyType") }]);
        }
        return next();
      case "3":
        if (workoutMessage) {
          return alert(workoutMessage, [{ onClick: () => focus("workouts") }]);
        }
        if (drinkMessage) {
          return alert(drinkMessage, [{ onClick: () => focus("drinks") }]);
        }
        if (smokeMessage) {
          return alert(smokeMessage, [{ onClick: () => focus("smokes") }]);
        }
        return next();

      case "4":
        if (interestMessage) {
          return alert(interestMessage, [
            { onClick: () => focus("interests") },
          ]);
        }
        if (pointMessage) {
          return alert(pointMessage, [{ onClick: () => focus("points") }]);
        }

        try {
          const id = v4();
          const hashPassword = await bcrypt.hash(pws.pw, 12);

          const newUser: User = { ...props, id };
          const ref = dbService.collection("users").doc(id);

          await ref.set({ ...newUser, password: hashPassword });

          localStorage.setItem("uid", JSON.stringify(id));
          console.log("uid stored");

          alert("회원가입을 축하합니다.");
          navi("/survey");
        } catch (error: any) {
          return alert(error.message);
        }

        return;
    }
  }, [
    navi,
    content,
    focus,
    nameMessage,
    alert,
    dobMessage,
    mobileMessage,
    genderMessage,
    emailMessage,
    pwMessage,
    conMessage,
    addressMessage,
    distanceMessage,
    purposeMessage,
    heightMessage,
    weightMessage,
    bodyTypeMessage,
    workoutMessage,
    drinkMessage,
    smokeMessage,
    interestMessage,
    pointMessage,
    props,
    pws.pw,
  ]);

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
