import React, { useState, useEffect } from 'react';
import OTPInput from 'otp-input-react';
import NovelLogo from '../../assets/AuthImg/NovelLogo.svg';
import signInArrow from '../../assets/AuthImg/signInArrow.svg';
import axios from 'axios';

const OtpVerification = () => {
  const [OTP, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFrmStorage = localStorage.getItem('novel_auth_token');

    setToken(tokenFrmStorage);
  }, []);

  const verifyOTP = async () => {
    setLoading(true);
    setDisable(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {
        otp: OTP,
      };

      await axios.post(
        `https://st1.novel-ag.com/api/auth/farmer/verify-otp`,
        body,
        config
      );

      setLoading(false);
      setDisable(false);
      window.location.replace('https://novel-ag-fe-next.vercel.app/dashboard');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setDisable(false);
    }
  };

  return (
    <>
      <div className='novelGridBackground'>
        <div className='p-6'>
          <img
            className=''
            src={NovelLogo}
            alt='Novel Agric Logo with Title'
          />
        </div>
        <div className='flex flex-col items-center space-y-10 justify-center'>
          <h3 className='text-2xl font-bold'>Enter Verification Code</h3>
          <p>Enter the 6 digit code we sent to your phone number</p>
          <OTPInput
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={6}
            otpType='number'
            disabled={false}
            // secure
            inputStyles={{
              width: '50px',
              height: '50px',
              padding: '20px 10px',
              lineHeight: '28px',
              fontSize: '30px',
            }}
          />
          <button
            disabled={disable}
            onClick={verifyOTP}
            className='bg-Typography200 flex justify-center p-2 mt-3 sm:w-96 rounded'
          >
            <span className='text-BaseWhite'>
              {loading ? 'Loading' : 'Verify'}
            </span>
            <img
              src={signInArrow}
              alt='Sign In Arrow'
              className='mt-1 ml-2'
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
