import { FLOOR_COUNT } from "../../../elevator/constants";
import {
  useSelectCurrentFloor,
  useSelectElevatorStatus,
} from "../../../elevator/hooks";
import Controls from "../Controls";
import StatusDisplay from "../StatusDisplay";

const ControlsAndStatusDisplay = () => {
  const status = useSelectElevatorStatus();
  const currentFloor = useSelectCurrentFloor();
  return (
    <div
      className="border rounded shadow bg-light"
      style={{ width: "220px", flexShrink: "0" }}
    >
      <StatusDisplay floor={currentFloor} status={status} />
      <Controls floorCount={FLOOR_COUNT} />
    </div>
  );
};

export default ControlsAndStatusDisplay;
