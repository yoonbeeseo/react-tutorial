import { useState } from "react";
import { Container } from "../../../components";
import { twMerge } from "tailwind-merge";

interface Props {
  per: number;
  answer: string;
}
const PercentageBar = ({ per, answer }: Props) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Container.Row
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={twMerge("bg-gray-50 rounded p-1 gap-x-2.5 cursor-pointer")}
    >
      {answer}
      <Container.Row
        className={twMerge(
          "justify-end text-pink-400 float-end gap-x-2.5 flex-1"
        )}
      >
        <div className="flex items-center justify-end flex-1">
          <span
            className={twMerge(
              "block bg-pink-400 rounded transition h-[50%] opacity-20",
              isHovering && "opacity-100"
            )}
            style={{
              width: `${per}%`,
            }}
          ></span>
        </div>
        <p className="text-right">{per.toFixed(2)}%</p>
      </Container.Row>
    </Container.Row>
  );
};

export default PercentageBar;
