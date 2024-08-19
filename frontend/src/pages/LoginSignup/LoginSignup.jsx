import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [currState, setCurrState] = useState('Sign Up');
  const [data, setData] = useState({
    designation: 'Candidate',
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/user/login';
    } else {
      newUrl += '/user/register';
    }
  
    try {
      const response = await axios.post(newUrl, data);
      
      if (response.status === 200) {
        toast.success('Successfully logged in!');
        navigate('/');
      } else {
        toast.error(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl font-bold text-center mb-6">{currState}</h2>
        <div className="mb-4">
          <select
            name="designation"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChangeHandler}
            value={data.designation}
            required
          >
            <option value="Candidate">Candidate</option>
            <option value="Recruiter">Recruiter</option>
          </select>
        </div>
        <div className="mb-4">
          {currState === 'Sign Up' && (
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={onChangeHandler}
              value={data.name}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChangeHandler}
            value={data.password}
            required
          />
        </div>
        <div className="mb-6 flex items-start">
          <input
            type="checkbox"
            className="mr-2 mt-1 leading-tight"
            required
          />
          <p className="text-sm text-gray-600">
            By continuing, I agree to the{' '}
            <a href="#" className="text-blue-500 hover:underline">
              terms of use
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-500 hover:underline">
              privacy policy
            </a>
            .
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {currState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        {currState === 'Login' ? (
          <p
            className="mt-4 text-center text-sm text-gray-600 cursor-pointer"
            onClick={() => setCurrState('Sign Up')}
          >
            Create a new Account?{' '}
            <span className="text-blue-500 hover:underline">
              Click Here
            </span>
          </p>
        ) : (
          <p
            className="mt-4 text-center text-sm text-gray-600 cursor-pointer"
            onClick={() => setCurrState('Login')}
          >
            Already have an Account?{' '}
            <span className="text-blue-500 hover:underline">
              Login Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginSignup;
