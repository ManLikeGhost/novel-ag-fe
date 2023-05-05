import React, { useState } from 'react';
import NovelLogo from '../../assets/AuthImg/NovelLogo.svg';
import SadFace from '../../assets/AuthImg/SadFace.svg';
import signInArrow from '../../assets/AuthImg/signInArrow.svg';
import telPhone from '../../assets/AuthImg/Phone.svg';
import horizontalLine from '../../assets/AuthImg/horizontalLine.svg';
import firstImage from '../../assets/AuthImg/firstfarmImg.svg';
import secondImage from '../../assets/AuthImg/secondfarmImg.svg';
import { Link } from 'react-router-dom';
import SimpleImageSlider from 'react-simple-image-slider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const images = [{ url: firstImage }, { url: secondImage }];

const SignIn = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDisable(true);
    try {
      const body = {
        phone,
      };

      const response = await axios.post(
        'https://st1.novel-ag.com/api/auth/farmer/login',
        body
      );

      localStorage.setItem('novel_auth_token', response.data.token);
      navigate('/signinotp');
      setLoading(false);
      setDisable(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setDisable(false);
    }
  };

  return (
    <>
      <div className='grid grid-cols-2'>
        <div className='mb-3'>
          <img
            className='m-6'
            src={NovelLogo}
            alt='Novel Agric Logo with Title'
          />
          <div className='flex justify-start items-center ml-12 mt-14 sm:flex sm:justify-center sm:items-center sm:mt-56 sm:ml-0'>
            <form>
              <div className='flex flex-col'>
                <h1 className='font-bold text-2xl mb-2'>Welcome Back!</h1>
                <h3 className='text-base font-normal mb-8 text-Typography002'>
                  Sign in to your dashboard
                </h3>
                <label className='my-2 font-medium text-sm text-Typography300'>
                  Phone number
                </label>
                <input
                  type='tel'
                  placeholder='+234 9000 000 000'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='border bg-Typography001 border-Typography000 p-2 w-80 sm:w-96 rounded outline-none'
                />

                <div className='flex justify-between w-80 sm:w-96 mb-2'>
                  <div className='mt-3'>
                    <input
                      type='checkbox'
                      className='mr-2'
                    />
                    <label
                      for='keepmesignedin'
                      className='font-medium text-sm text-Typography300'
                    >
                      Keep me sign in
                    </label>
                  </div>

                  <div className='mt-3'>
                    <span className='font-medium text-sm text-Typography300'>
                      Unable to Login?
                    </span>
                  </div>
                </div>

                <button
                  onClick={login}
                  disabled={disable}
                  className='bg-Typography200 flex justify-center p-2 sm:w-96 rounded'
                >
                  <span className='text-BaseWhite'>
                    {loading ? 'Loading' : 'Sign In'}
                  </span>
                  <img
                    src={signInArrow}
                    alt='Sign In Arrow'
                    className='mt-1 ml-2'
                  />
                </button>

                <div className='flex justify-between w-80 sm:w-96 my-3'>
                  <img
                    src={horizontalLine}
                    alt=''
                  />
                  <span className='text-xs font-medium text-Typography200 sm:mx-3'>
                    Or sign in with
                  </span>
                  <img
                    src={horizontalLine}
                    alt=''
                  />
                </div>

                <button className='bg-Primary100 p-2 flex my-3 sm:w-96 rounded '>
                  <img
                    src={SadFace}
                    alt='Sad Face Icon'
                    className='mt-1 ml-2'
                  />

                  <span className='text-Typography400 ml-20 sm:ml-24'>
                    Face Capture
                  </span>
                </button>

                <button className='bg-Primary100 p-2 flex my-3 sm:w-96 rounded'>
                  <img
                    src={telPhone}
                    alt='Sad Face Icon'
                    className='mt-1 ml-2'
                  />

                  <span className='text-Typography400 ml-20 sm:ml-24'>
                    Phone Number
                  </span>
                </button>
                <div className='mt-2 text-center'>
                  <span className='font-medium text-sm text-Typography300'>
                    Don't have an account?{' '}
                    <Link to='/Sign-up'>
                      <span className='font-medium text-sm text-Primary300'>
                        Sign up
                      </span>
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='novelGridBackground sm:flex justify-center items-center hidden'>
          {/* <div className='border-8 border-BaseWhite rounded'> */}
          <SimpleImageSlider
            bgColor='transparent'
            width={550}
            height={600}
            images={images}
            showBullets={false}
            showNavs={false}
            autoPlay={true}
            slideDuration={0.5}
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default SignIn;
