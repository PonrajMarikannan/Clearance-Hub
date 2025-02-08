import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const Register = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const onSubmit = async (data) => {
    const { agreeToTerms, ...formData } = data;

    if (!agreeToTerms) {
      errors('agreeToTerms', {
        type: 'manual',
        message: 'You must agree to the privacy policy.',
      });
      return;
    }

    try {
      await axios.post('http://localhost:7070/auth/register', formData);
      setModalMessage('Registration successful! Redirecting to login...');
      setShowModal(true);
      setTimeout(() => navigate('/login'), 2000); 
    } catch (err) {
      errors('server', {
        type: 'manual',
        message: 'Failed to register. Please try again later.',
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-50 relative">
      <button
        type="button"
        onClick={handleGoBack}
        className="absolute top-5 left-5 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="text-center">
          <h3 role="heading" className="text-gray-800 text-2xl font-bold sm:text-3xl">Create a New Account</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label role="Username" className="font-medium">Username</label>
            <input
              type="text"
              {...register('username', { 
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters long',
                },
              })}
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label role="Password" className="font-medium">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                },
              })}
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label role='cpass' className="font-medium">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              {...register('agreeToTerms', { required: 'You must agree to the privacy policy' })}
              className="h-4 w-4"
            />
            <label htmlFor="agreeToTerms" className="text-sm ml-2">
              By continuing, I agree to the <Link to="/privacy-policy" className="text-blue-700 font-semibold">privacy policy</Link> & terms.
            </label>
            {errors.agreeToTerms && <p className="text-red-500 text-sm ml-2">{errors.agreeToTerms.message}</p>}
          </div>

          {errors.server && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg mb-4">
              <p>{errors.server.message}</p>
            </div>
          )}

          <p role="login" className="mt-2">
            Already have an account? 
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500"> Click here</Link>
          </p>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Register
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative flex flex-col items-center">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="mb-4">
              <svg className="w-16 h-16 text-green-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h4 className="text-2xl font-semibold text-center mb-4">Success!</h4>
            <p className="text-center text-gray-700">{modalMessage}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Register;
