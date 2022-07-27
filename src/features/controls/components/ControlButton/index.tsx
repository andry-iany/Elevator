import { FC, useState } from "react";
import "./style.css";

interface ControlButtonProps {
  text: string | number;
}

const ControlButton: FC<ControlButtonProps> = ({ text }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleIsActive = () => setIsActive((active) => !active);

  return (
    <button
      onClick={toggleIsActive}
      className={`${isActive ? "active" : ""}
        shadow-sm control d-inline-block rounded-circle border border-4 border-secondary`}
    >
      {text}
    </button>
  );
};

export default ControlButton;
