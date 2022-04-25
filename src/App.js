import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Dashboard } from "./Pages/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard/:id" element={<Dashboard/>}></Route>
        <Route path="*" element={<Navigate to={"/"}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
