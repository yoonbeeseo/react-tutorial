import { useEffect } from "react";
import { Alert } from "../store";

const CustomAlert = () => {
  const { closeFn, isShowing, message, buttons, title } = Alert.use();
  useEffect(() => {
    console.log(isShowing);
  }, [isShowing]);

  return (
    isShowing && (
      <div className="fixed w-full h-screen flex justify-center items-center top-0 left-0 z-10">
        <div className="flex gap-x-2.5 border max-w-100 rounded-md border-gray-200 p-2.5 bg-white shadow-md">
          <img
            src="https://cdn.pixabay.com/photo/2018/06/28/12/34/panda-3503779_640.jpg"
            alt=""
            width={200}
            height={200}
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="flex flex-col gap-y-2.5">
            <div>
              <p className="font-bold">{title ?? "알림"}</p>
              <p className="text-gray-600 text-sm leading-[1.2]">
                {message ??
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit."}
              </p>
            </div>
            <div className="flex gap-x-2.5">
              {buttons?.length === 0 || !buttons ? (
                <Button onClick={closeFn} index={1} />
              ) : (
                buttons?.map((button, index) => (
                  <Button
                    index={index}
                    key={index}
                    {...button}
                    onClick={() => {
                      if (button.onClick) {
                        button.onClick();
                      }
                      closeFn();
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <span className="block absolute w-full h-full -z-1" onClick={closeFn} />
      </div>
    )
  );
};

export default CustomAlert;

const Button = ({ onClick, text, index }: Alert.Button & { index: number }) => {
  const st1 =
    "rounded px-2.5 py-1.5 border border-gray-200 text-gray-500 cursor-pointer hover:text-gray-700 hover:border-gray-700 transition";
  const st2 =
    "rounded px-2.5 py-1.5 cursor-pointer transition bg-blue-500 text-white hover:bg-blue-400";

  return (
    <button className={index === 1 ? st2 : st1} onClick={onClick}>
      {text ?? "확인"}
    </button>
  );
};
