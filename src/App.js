import { Route, Routes } from "react-router-dom";
import "./App.css";

import { useLocation } from "react-router-dom";
import { AddSpecimenButton } from "./components/add-specimen/AddSpecimenButton";
import Dashboard from "./components/dashboard/Dasboard";
import Home from "./components/home/Home";
import Header from "./components/layouts/Header";
import ScanBarcode from "./components/specimen-form/ScanBarcode";
import SpecimenForm from "./components/specimen-form/SpecimenForm";

function App() {
  const location = useLocation();
  const isSpecimenFormPage = location.pathname.includes("/add-specimen");

  return (
    <div className="content">
      <Header />
      {!isSpecimenFormPage && <AddSpecimenButton />}
      <div className={"body-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-specimen/*">
            <Route index element={<ScanBarcode />} />
            <Route path="specimen-form" element={<SpecimenForm />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
