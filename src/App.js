import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layouts/Header";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dasboard";
import { AddSpecimenButton } from "./components/add-specimen/AddSpecimenButton";
import ScanBarcode from "./components/specimen-form/ScanBarcode";
import { useLocation } from "react-router-dom";
import SpecimenForm from "./components/specimen-form/SpecimenForm";

function App() {
  const location = useLocation();

  const isSpecimenFormPage = location.pathname === "/add-specimen";
  return (
    <div className="content">
      <Header />
      {!isSpecimenFormPage && <AddSpecimenButton />}
      <div className={"body-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-specimen" element={<ScanBarcode />} />
          <Route path="/specimen-form" element={<SpecimenForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
