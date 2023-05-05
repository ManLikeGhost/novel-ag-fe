import React, { useEffect, useState } from 'react';
import NovelLogo from '../../assets/AuthImg/NovelLogo.svg';
import firstImage from '../../assets/AuthImg/firstfarmImg.svg';
import secondImage from '../../assets/AuthImg/secondfarmImg.svg';
import signInArrow from '../../assets/AuthImg/signInArrow.svg';
import { Link } from 'react-router-dom';
import SimpleImageSlider from 'react-simple-image-slider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const images = [{ url: firstImage }, { url: secondImage }];

const SignUp = () => {
  const [farmerData, setFarmerData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [lgas, setlgas] = useState([]);
  const [selectedLga, setSelectedLga] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanks = async () => {
      const response = await axios.get(
        'https://st1.novel-ag.com/api/states?sort_field=id&sort_type=asc'
      );

      setStates(response.data.data.states);
    };

    fetchBanks();
  }, []);

  useEffect(() => {
    const fetchlgas = async () => {
      const response = await axios.get(
        `https://st1.novel-ag.com/api/local-governments/${selectedState}?sort_field=id&sort_type=asc`
      );

      setlgas(response.data.data.lgas);
    };
    if (selectedState) {
      fetchlgas();
    }
  }, [selectedState]);

  useEffect(() => {
    const fetchwards = async () => {
      const response = await axios.get(
        `https://st1.novel-ag.com/api/wards/${selectedLga}?sort_field=id&sort_type=asc`
      );

      setWards(response.data.data.wards);
    };
    if (selectedLga) {
      fetchwards();
    }
  }, [selectedLga]);

  const registerFarmer = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDisable(true);
    try {
      const body = {
        first_name: farmerData.firstName,
        last_name: farmerData.lastName,
        phone: farmerData.phone,
        state_id: selectedState,
        local_government_id: selectedLga,
        ward_id: selectedWard,
        accept_terms: 1,
      };

      const response = await axios.post(
        `https://st1.novel-ag.com/api/auth/farmer/register`,
        body
      );

      localStorage.setItem('novel_auth_token', response.data.token);
      setLoading(false);
      setDisable(false);
      navigate('/otp');
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
          <div className='flex justify-start items-center ml-12 mt-14 sm:flex sm:justify-center sm:items-center sm:mt-24 sm:ml-0'>
            <form>
              <div className='flex flex-col'>
                <h1 className='font-bold text-2xl mb-2'>Get Started</h1>
                {/* email input feild */}
                <label className='my-2 font-medium text-sm text-Typography300'>
                  Email
                </label>
                <input
                  type='email'
                  placeholder='Olivia@untitledui.com'
                  value={farmerData.email}
                  onChange={(e) =>
                    setFarmerData({ ...farmerData, email: e.target.value })
                  }
                  className='border bg-Typography001 border-Typography000 p-2 w-80 sm:w-96 rounded outline-none'
                />
                {/* email input feild */}

                {/* first name and last name */}
                <div className='flex flex-col sm:flex-row sm:gap-8 sm:justify-between w-52 sm:w-56 my-2'>
                  <div>
                    <label className='font-medium text-sm text-Typography300'>
                      First name
                    </label>
                    <input
                      type='text'
                      placeholder='First name'
                      value={farmerData.firstName}
                      onChange={(e) =>
                        setFarmerData({
                          ...farmerData,
                          firstName: e.target.value,
                        })
                      }
                      className='border bg-Typography001 border-Typography000 rounded outline-none p-2 mt-2 w-80 sm:w-44'
                    />
                  </div>
                  <div className=''>
                    <label className='font-medium text-sm text-Typography300'>
                      Last name
                    </label>
                    <input
                      type='text'
                      placeholder='Last name'
                      value={farmerData.lastName}
                      onChange={(e) =>
                        setFarmerData({
                          ...farmerData,
                          lastName: e.target.value,
                        })
                      }
                      className='border bg-Typography001 border-Typography000 rounded outline-none p-2 mt-2 w-80 sm:w-44'
                    />
                  </div>
                </div>
                {/* first name and last name */}

                {/* phone number */}
                <label className='my-2 font-medium text-sm text-Typography300'>
                  Phone number
                </label>
                <input
                  type='tel'
                  placeholder='+234 9000 000 000'
                  value={farmerData.phone}
                  onChange={(e) =>
                    setFarmerData({ ...farmerData, phone: e.target.value })
                  }
                  className='border bg-Typography001 border-Typography000 p-2 w-80 sm:w-96 rounded outline-none'
                />
                {/* phone number */}

                {/* State and lga  */}
                <div className='flex flex-col sm:flex-row sm:gap-8 sm:justify-between w-52 sm:w-56 my-2'>
                  <div className='flex flex-col'>
                    <label className='sm:mt-0 mt-2 font-medium text-sm text-Typography300'>
                      State
                    </label>
                    <select
                      type='text'
                      onChange={(e) => setSelectedState(e.target.value)}
                      className='border bg-Typography001 border-Typography000 rounded outline-none p-2 mt-2 sm:w-44 w-80 font-medium text-sm text-Typography200'
                    >
                      <option
                        selected
                        disabled
                        className=''
                      >
                        Select state
                      </option>
                      {states.map((state, idx) => (
                        <option
                          className=''
                          key={idx}
                          value={state.id}
                        >
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='flex flex-col'>
                    <label className='sm:mt-0 mt-2 font-medium text-sm text-Typography300'>
                      LGA
                    </label>
                    <select
                      type='text'
                      onChange={(e) => setSelectedLga(e.target.value)}
                      className='border bg-Typography001 border-Typography000 rounded outline-none p-2 mt-2 sm:w-44 w-80 font-medium text-sm text-Typography200'
                    >
                      <option
                        selected
                        disabled
                        className=''
                      >
                        Select LGA
                      </option>
                      {lgas.map((lga, idx) => (
                        <option
                          className=''
                          key={idx}
                          value={lga.id}
                        >
                          {lga.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* State and lga */}

                {/* ward  */}
                <div className='flex flex-col'>
                  <label className='font-medium text-sm text-Typography300'>
                    Ward
                  </label>
                  <select
                    type='text'
                    onChange={(e) => setSelectedWard(e.target.value)}
                    className='border bg-Typography001 border-Typography000 rounded outline-none p-2 mt-2 w-80 sm:w-96 text-sm text-Typography200'
                  >
                    <option
                      selected
                      disabled
                      className=''
                    >
                      Select Ward
                    </option>
                    {wards.map((ward, idx) => (
                      <option
                        className=''
                        key={idx}
                        value={ward.id}
                      >
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* ward */}
                <button
                  disabled={disable}
                  onClick={registerFarmer}
                  className='bg-Typography200 flex justify-center p-2 mt-3 sm:w-96 rounded'
                >
                  <span className='text-BaseWhite'>
                    {loading ? 'Loading' : 'Sign Up'}
                  </span>
                  <img
                    src={signInArrow}
                    alt='Sign In Arrow'
                    className='mt-1 ml-2'
                  />
                </button>

                <div className='mt-2 text-center'>
                  <span className='text-center text-sm font-normal text-Typography300'>
                    By signing up, you agree to our Terms of Service & Privacy
                    <br />
                    policy
                  </span>
                </div>

                <div className='mt-2 text-center'>
                  <span className='font-medium text-sm text-Typography300'>
                    Already a member?{' '}
                    <Link to='/Sign-in'>
                      <span className='font-medium text-sm text-Primary300'>
                        Sign in
                      </span>
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='novelGridBackground sm:flex justify-center items-center hidden h-screen'>
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

export default SignUp;
