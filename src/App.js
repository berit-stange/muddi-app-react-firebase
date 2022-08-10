import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import MedicationList from './MedicationList';
import BloodPressureContainer from './BloodPressureContainer';
import UserSettings from './UserSettings';
import MedicationModal from './MedicationModal';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleLogin from './GoogleLogin';


import "./App.css";

function App() {

  // Google Login
  const [user] = useAuthState(auth);

  return (

    user ?

      <BrowserRouter >
        <div className="welcome">
          Hallo {auth.currentUser.email}!
        </div>
        <Navigation />
        <Routes >
          <Route exact path="/" element={<MedicationList />} />
          <Route exact path="/medication" element={<MedicationList />} />
          <Route exact path="/blood-pressure" element={<BloodPressureContainer />} />
          <Route exact path="/settings" element={<UserSettings />} />
          <Route exact path="/medi-settings" element={<MedicationModal />} />
        </Routes>
      </BrowserRouter>

      : <GoogleLogin />
  );
}

export default App;
