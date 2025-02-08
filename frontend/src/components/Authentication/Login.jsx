import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(''); 

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    
    sessionStorage.setItem("Email", data.email);

    try {
      const response = await axios.post('http://localhost:7070/ccts/login', data);
      const token = response.data.token;
      const decodedToken = jwtDecode(token);

      if(decodedToken.status==="Success"){
        sessionStorage.setItem("UserId", decodedToken.id);
        sessionStorage.setItem("Token", token);
        sessionStorage.setItem('role',decodedToken.role);
        const role = decodedToken.role;
        switch (role) {
          case 'admin':
            navigate('/admindashboard');
            break;
          case 'client':
            navigate('/AnimatedText');
            break;
          case 'officer':
            navigate('/customsdashboard');
            break;
          default:
            setError('Unknown user role');
            break;
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred during login. Please check your credentials.');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-50 relative">
      <button
        type="button"
        onClick={handleGoBack}
        aria-label="Go back"
        className="absolute top-5 left-5 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="text-center">
          <h3 role="heading" aria-level="3" className="text-gray-800 text-2xl font-bold sm:text-3xl">Log In</h3>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg mb-4">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              id="email"
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
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          
          <p role="ques" className="mt-2">
            Don't have an account? 
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500"> Create one</Link>
          </p>

          <button role="button"
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
