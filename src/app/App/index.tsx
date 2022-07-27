import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import AppLayout from "../Layout";
import ControlsAndStatusDisplay from "../../features/controls/components/ControlsAndStatusDisplay";

function App() {
  return (
    <AppLayout>
      <ControlsAndStatusDisplay />
    </AppLayout>
  );
}

export default App;
