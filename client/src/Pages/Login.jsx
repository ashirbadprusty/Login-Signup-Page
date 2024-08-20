import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiSocialFacebook } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      // Handle successful login
      console.log(response.data);
      // Store the token in localStorage or state if needed
      localStorage.setItem('token', response.data.token);
      // Navigate to home or dashboard
      navigate('/dashboard');
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred');
      } else {
        setError('An error occurred');
      }
    }
  };

  const handlenavigate = () => {
    navigate('/');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-3 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-3 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <div className="absolute inset-y-0 right-0 flex text-gray-400 items-center pr-3 cursor-pointer" onClick={toggleShowPassword}>
              {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
            </div>
          </div>
          <div className='text-blue-600 text-center cursor-pointer'>Forgot Password?</div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-indigo-700 focus:outline-none  text-lg"
          >
            Login
          </button>
          <div className="text-center">
            <h3 className="mt-4">
              Don't have an account?{' '}
              <span className="text-blue-600 font-bold cursor-pointer " onClick={handlenavigate}>
                Signup
              </span>
            </h3>
            <h1 className="my-2">OR</h1>
          </div>
          <button
            type="button"
            className="w-full px-4 py-3 text-white bg-indigo-800 rounded-md hover:bg-indigo-700 text-lg flex items-center space-x-2 justify-start focus:outline-none"
          >
            <TiSocialFacebook className='bg-white text-blue-800 rounded-xl' size={26} />
            <span className='pl-16'>Login with Facebook</span>
          </button>
          <button
            type="button"
            className="w-full px-4 py-3 bg-transparent border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 text-lg flex items-center space-x-2 justify-start focus:outline-none"
          >
            <FcGoogle size={24} />
            <span className='pl-20'>Login with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
