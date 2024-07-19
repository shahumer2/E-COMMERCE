import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure } from '../../redux/Slice/UserSlice';
import { SIGNUP_URL } from '../../Constants/utils';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Please Fill All the Fields");
      return;
    }
    try {
      const url = SIGNUP_URL;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/auth/signin');
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      dispatch(signInFailure());
      console.log(error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 lg:p-12 overflow-auto" style={{ maxHeight: '100%' }}>
        <div className="w-full">
          {/* <h2 className="mb-2 text-2xl font-bold text-black dark:text-white">
            Sign Up Page For E-commerce
          </h2> */}
          <form onSubmit={handleSubmit} className="h-auto">
            <div className="mb-2">
              <label className="block mb-2.5 font-medium text-black dark:text-white">
                NAME
              </label>
              <input
                style={{ height: "30px" }}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                type="text"
                placeholder="Enter your Name"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2.5 font-medium text-black dark:text-white">
                Phone Number
              </label>
              <input
                style={{ height: "30px" }}
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                type="number"
                placeholder="Enter your Phone Number"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2.5 font-medium text-black dark:text-white">
                Address
              </label>
              <input
                style={{ height: "30px" }}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                type="text"
                placeholder="Enter your Address"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2.5 font-medium text-black dark:text-white">
                Username
              </label>
              <input
                style={{ height: "30px" }}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                type="text"
                placeholder="Enter your Username"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-2.5 font-medium text-black dark:text-white">
                Password
              </label>
              <input
                style={{ height: "30px" }}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                type="password"
                placeholder="6+ Characters, 1 Capital letter"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="mb-2">
              <button style={{height:"50px"}}
                type="submit"
                className="w-full cursor-pointer text-center   rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              >
                Sign Up
              </button>
            </div>
            <div className="text-center">
              <p>
                Already have an account?{' '}
                <Link to="/auth/signin" className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block lg:w-3/5">
        <img src="/img/bgimg.png" alt="Sign In" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default SignUp;
