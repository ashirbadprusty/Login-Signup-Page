import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { TiSocialFacebook } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordValidations, setPasswordValidations] = useState({
    hasUppercase: false,
    hasSymbol: false,
    minLength: false,
  });

  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  useEffect(() => {
    const { password, confirmPassword } = formData;
    
    setPasswordValidations({
      hasUppercase: /[A-Z]/.test(password),
      hasSymbol: /[!@#$%^&*]/.test(password),
      minLength: password.length >= 8,
    });

    setIsConfirmPasswordValid(password === confirmPassword);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/signup', formData);
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error); // Log the error for debugging
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred');
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handlenavigate = () => {
    navigate('/login');
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-700">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Signup</h2>
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
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-3 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <div className="mt-2 space-y-1 text-sm">
              <p className={passwordValidations.hasUppercase ? 'text-green-600' : 'text-red-600'}>
                {passwordValidations.hasUppercase ? '✔' : '✖'} 1 uppercase letter
              </p>
              <p className={passwordValidations.hasSymbol ? 'text-green-600' : 'text-red-600'}>
                {passwordValidations.hasSymbol ? '✔' : '✖'} 1 symbol (!@#)
              </p>
              <p className={passwordValidations.minLength ? 'text-green-600' : 'text-red-600'}>
                {passwordValidations.minLength ? '✔' : '✖'} At least 8 characters
              </p>
            </div>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-3 mt-1 border rounded-md focus:outline-none ${isConfirmPasswordValid ? 'focus:ring-green-500 focus:border-green-500' : 'focus:ring-red-500 focus:border-red-500'}`}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400" onClick={toggleShowConfirmPassword}>
              {showConfirmPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-indigo-700 focus:outline-none text-lg"
          >
            Signup
          </button>
          <div className="text-center">
            <h3 className="mt-4">
              Already have an account?{' '}
              <span className="text-blue-600 font-bold cursor-pointer" onClick={handlenavigate}>
                Login
              </span>
            </h3>
            <h1 className="my-2">OR</h1>
          </div>
          <button
            type="button"
            className="w-full px-4 py-3 text-white bg-indigo-800 rounded-md hover:bg-indigo-700 text-lg flex items-center space-x-2 justify-start focus:outline-none"
          >
            <TiSocialFacebook className="bg-white text-blue-800 rounded-xl" size={26} />
            <span className="pl-16">Login with Facebook</span>
          </button>
          <button
            type="button"
            className="w-full px-4 py-3 bg-transparent border border-gray-300 text-gray-800 rounded-md hover:bg-gray-100 text-lg flex items-center space-x-2 justify-start focus:outline-none"
          >
            <FcGoogle size={24} />
            <span className="pl-20">Login with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
