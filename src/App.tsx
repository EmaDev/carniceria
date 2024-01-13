import { Body } from "./components/Body";
import { SalesContextPorvider } from "./context/SalesContext";

function App() {
  return (
    <SalesContextPorvider>
      <div className="main">
        <Body />
      </div>
      <h5 style={{textAlign: "center", fontFamily: "monospace"}}>Version: 2024</h5>
    </SalesContextPorvider>
    
  );
}

export default App;
