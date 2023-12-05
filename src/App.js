import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { DataProvider } from "./context/DataProvider";
import Dashboard from "./components/dashboard/Dasboard";
import Home from "./components/home/Home";
import Header from "./components/layouts/Header";
import ScanBarcode from "./components/specimen-form/ScanBarcode";
import SpecimenForm from "./components/specimen-form/SpecimenForm";
import SpecimenSubmit from "./components/specimen-form/SpecimenSubmit";
import SpecimenReview from "./components/specimen-form/SpecimenReview";
import Courier from "./components/records/Courier";
import Patients from "./components/records/Patients"
import Results from "./components/records/Results";
import IndividualResult from "./components/records/IndividualResult";
import Login from "./util/authentication/Login";
import ProtectedRoute from './util/ProtectedRoute';
import ReviewSamples from "./components/records/ReviewSamples";
import CourierInformation from "./components/courier/CourierInformation";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import CourierSample from './components/records/CourierSample';
import { useNavigate } from 'react-router-dom';
import RepeatForm from './components/specimen-form/RepeatForm';


function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = sessionStorage.getItem('token');
    if (userToken && userToken !== 'undefined') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  const queryCLient = new QueryClient();
  return (
    <DataProvider>
      <QueryClientProvider client={queryCLient}>
        <div className="content">
        {navigate && window.location.pathname !== '/login' && <Header />}
          <div className={"body-content"}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>} />
              <Route path="/dashboard/*" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard /></ProtectedRoute>} />
              <Route path="/courier" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Courier /></ProtectedRoute>} />
              <Route path="/courier-sample" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CourierSample /></ProtectedRoute>} />
              <Route path="/patients" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Patients /></ProtectedRoute>} />
              <Route path="/results" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Results /></ProtectedRoute>} />
              <Route path="/individual-result" element={<ProtectedRoute isLoggedIn={isLoggedIn}><IndividualResult /></ProtectedRoute>} />
              <Route path="/review-samples" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ReviewSamples /></ProtectedRoute>} />
              <Route path="/courier-information" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CourierInformation /></ProtectedRoute>} />

              <Route path="/add-specimen/*" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ScanBarcode /></ProtectedRoute>} />
              <Route path="/add-specimen/specimen-form" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SpecimenForm /></ProtectedRoute>} />
              <Route path="/add-specimen/specimen-review" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SpecimenReview /></ProtectedRoute>} />
              <Route path="/add-specimen/specimen-submit" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SpecimenSubmit /></ProtectedRoute>} />
              <Route path="/add-specimen/repeat-form" element={<ProtectedRoute isLoggedIn={isLoggedIn}><RepeatForm /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </QueryClientProvider>
    </DataProvider>
  );
}

export default App;
