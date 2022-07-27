import { FC } from "react";

interface StatusDisplayProps {
  move?: "descending" | "ascending";
  floor: number;
}

const StatusDisplay: FC<StatusDisplayProps> = ({ move, floor }) => {
  const floorNumberMap = [
    "basement",
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
  ];
  const currentFloor =
    floor === 0 ? floorNumberMap[0] : `${floorNumberMap[floor]} floor`;

  return (
    <div
      className="text-capitalize rounded p-2 m-3 border-secondary"
      style={{ background: "#1ff91f", border: "10px solid" }}
    >
      <p className="m-0">{currentFloor}</p>
      <p className="m-0">{move}</p>
    </div>
  );
};

export default StatusDisplay;
