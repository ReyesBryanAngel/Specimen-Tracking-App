import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layouts/Header";
import Home from "./home/Home";

function App() {
  return (
    <div>
      <Header />
      <div className={"body-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
