import './App.css';
import { Routes, Route } from 'react-router-dom';

import { SignIn, SignUp, UnderConstruction, OtpVerification } from './pages';
import SignInOTPVerification from './pages/Auth/SignInOTPVerification';

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          Component={UnderConstruction}
        />
        <Route
          path='/Sign-in'
          Component={SignIn}
        />
        <Route
          path='/Sign-up'
          Component={SignUp}
        />
        <Route
          path='/otp'
          Component={OtpVerification}
        />
        <Route
          path='/signinotp'
          Component={SignInOTPVerification}
        />
      </Routes>
    </>
  );
};

export default App;
