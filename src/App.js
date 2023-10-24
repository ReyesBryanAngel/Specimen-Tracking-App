import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate   } from "react-router-dom";
import "./App.css";
// import AppContext from "./context/AppContext";
import { DataProvider } from "./context/DataProvider";
import ReactDOM from 'react-dom'
import { useLocation } from "react-router-dom";
import { AddSpecimenButton } from "./components/add-specimen/AddSpecimenButton";
import Dashboard from "./components/dashboard/Dasboard";
import Home from "./components/home/Home";
import Header from "./components/layouts/Header";
import ScanBarcode from "./components/specimen-form/ScanBarcode";
import SpecimenForm from "./components/specimen-form/SpecimenForm";
import SpecimenSubmit from "./components/specimen-form/SpecimenSubmit";
import SpecimenReview from "./components/specimen-form/SpecimenReview";
import Courier from "./components/records/Courier";
import Results from "./components/records/Results";
import IndividualResult from "./components/records/IndividualResult";
import Login from "./util/authentication/Login";
import ProtectedRoute from './util/ProtectedRoute';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = sessionStorage.getItem('token');
    console.log(userToken);
    if (userToken && userToken !== 'undefined') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <DataProvider>
      <div className="content">
        <Header />
        <div className={"body-content"}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>} />
            <Route path="/dashboard/*" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard /></ProtectedRoute>} />
            <Route path="/courier" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Courier /></ProtectedRoute>} />
            <Route path="/results" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Results /></ProtectedRoute>} />
            <Route path="/individual-result" element={<ProtectedRoute isLoggedIn={isLoggedIn}><IndividualResult /></ProtectedRoute>} />
            <Route path="/add-specimen/*" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ScanBarcode /></ProtectedRoute>} />
            <Route path="/add-specimen/specimen-form" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SpecimenForm /></ProtectedRoute>} />
            <Route path="/add-specimen/specimen-review" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SpecimenReview /></ProtectedRoute>} />
            <Route path="/add-specimen/specimen-submit" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SpecimenSubmit /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
