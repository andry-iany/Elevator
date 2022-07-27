import Controls from "../Controls";
import StatusDisplay from "../StatusDisplay";

const ControlsAndStatusDisplay = () => {
  return (
    <div className="border rounded shadow bg-light" style={{ width: "220px" }}>
      <StatusDisplay floor={1} move="ascending" />
      <Controls maxFloor={6} />
    </div>
  );
};

export default ControlsAndStatusDisplay;
