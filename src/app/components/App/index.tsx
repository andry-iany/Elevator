import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import AppLayout from "../../Layout";
import ControlsAndStatusDisplay from "../../../features/controls/components/ControlsAndStatusDisplay";
import Canvas from "../../../features/elevator/components/Canvas";

function App() {
  return (
    <AppLayout>
      <ControlsAndStatusDisplay />
      <Canvas />
    </AppLayout>
  );
}

export default App;
