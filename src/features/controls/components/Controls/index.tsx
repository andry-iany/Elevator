import { FC } from "react";
import { Col, Row } from "react-bootstrap";
import ControlButton from "../ControlButton";

interface ControlsProps {
  floorCount: number;
}
const Controls: FC<ControlsProps> = ({ floorCount }) => {
  const controls: JSX.Element[] = [];

  for (let i = floorCount - 1; i >= 0; i--) {
    controls.push(
      <Col key={i} className="py-2 px-0">
        <ControlButton floor={i} />
      </Col>
    );
  }

  return (
    <Row xs={2} className="m-0 p-3 justify-content-center text-center">
      {controls}
    </Row>
  );
};

export default Controls;
