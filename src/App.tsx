import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { SalesContextPorvider } from "./context/SalesContext";

function App() {
  return (
    <SalesContextPorvider>
      <div className="main">
        <Body />
      </div>
    </SalesContextPorvider>
  );
}

export default App;
