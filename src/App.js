import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import "./App.css";
import ListTollEntries from "./components/listTollEntries/ListTollEntries";
import ListTollGate from "./components/listTollGate/ListTollGate";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Navigate to="/listEntries" />}/>
            <Route path="/listEntries" element={<ListTollEntries />} />
            <Route path="/listGate" element={<ListTollGate />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
