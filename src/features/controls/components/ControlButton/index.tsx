import { FC } from "react";

interface ControlButtonProps {
  text: string | number;
}

const ControlButton: FC<ControlButtonProps> = ({ text }) => {
  return (
    <button
      style={{ width: "3rem", height: "3rem" }}
      className="d-inline-block rounded-circle"
    >
      {text}
    </button>
  );
};

export default ControlButton;
