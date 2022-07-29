import { FC } from "react";
import {
  useIsElevatorRequestedAt,
  useRequestElevator,
} from "../../../elevator/hooks";
import "./style.css";

interface ControlButtonProps {
  floor: number;
}

const ControlButton: FC<ControlButtonProps> = ({ floor }) => {
  const isElevatorRequested = useIsElevatorRequestedAt(floor);
  const requestElevator = useRequestElevator();

  const onClick = () => {
    if (isElevatorRequested) return;
    requestElevator(floor);
  };

  return (
    <button
      onClick={onClick}
      className={`${isElevatorRequested ? "active" : ""}
        shadow-sm control d-inline-block rounded-circle border border-4 border-secondary`}
    >
      {floor === 0 ? "T" : floor}
    </button>
  );
};

export default ControlButton;
