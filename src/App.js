import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layouts/Header";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dasboard";

function App() {
  return (
    <div className="content">
      <Header />
      <div className={"body-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
