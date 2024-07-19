import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInSuccess, signinStart } from '../../redux/Slice/UserSlice';
import { SIGNIN_URL } from '../../Constants/utils';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
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
      dispatch(signinStart());
      const url = SIGNIN_URL;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
       console.log(data.user?.authorities[0].authority,"kiki");
        const userRole = data.user?.authorities[0].authority;
        console.log(userRole,"jumpoooooo");
        if (userRole === 'ROLE_ADMIN') {
          navigate('/chart');
        } else if (userRole === 'ROLE_USER') {
          navigate('/homepage');
        }
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
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 lg:p-12">
        <div className="w-full">
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white">
            E-commerce
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2.5 font-medium text-black dark:text-white">
                Username
              </label>
              <input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                type="text"
                placeholder="Enter your Username"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2.5 font-medium text-black dark:text-white">
                Password
              </label>
              <input
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                type="password"
                placeholder="6+ Characters, 1 Capital letter"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="mb-5">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              >
                Sign in
              </button>
            </div>
            <div className="text-center">
              <p>
                Don’t have any account?{' '}
                <Link to="/auth/signup" className="text-primary">
                  Sign Up
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

export default SignIn;
