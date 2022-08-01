import { FC, useEffect, useState } from "react";
import { ElevatorState } from "../../../elevator/types";

interface StatusDisplayProps {
  status: ElevatorState["status"];
  floor: number;
}

const StatusDisplay: FC<StatusDisplayProps> = ({ status, floor }) => {
  const [ellipsis, setEllipsis] = useState("");

  // show animated ellipsis when the elevator is moving
  useEffect(() => {
    if (status === "idle") {
      return setEllipsis("");
    } else {
      const interval = setInterval(
        () => setEllipsis((cur) => (cur.length === 3 ? "" : cur + ".")),
        300
      );
      return () => clearInterval(interval);
    }
  }, [status, setEllipsis]);

  return (
    <div
      className="text-capitalize rounded p-2 m-3 border-secondary"
      style={{ background: "#1ff91f", border: "10px solid" }}
    >
      <p className="m-0">{`Floor ${floor}`}</p>
      <p className="m-0">
        {status}
        {ellipsis}
      </p>
    </div>
  );
};

export default StatusDisplay;
