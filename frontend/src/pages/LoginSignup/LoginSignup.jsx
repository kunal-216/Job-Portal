/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { toast } from "react-toastify";
import { useContextProvider } from "../../context/StoreContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const { url, setToken } = useContextProvider();  
  const [currState, setCurrState] = useState("Sign up");
  const [showPassword, setShowPassword] = useState(false); 
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    try {
      let response;

      if (currState === "Login") {
        response = await axios.post(newUrl, {
          email: data.email,
          password: data.password,
          designation: data.designation,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        response = await axios.post(newUrl, {
          name: data.name,
          email: data.email,
          password: data.password,
          designation: data.designation,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);  
        setToken(response.data.token);
        toast.success(currState === 'Login' ? 'Successfully logged in!' : 'Successfully signed up!');
        if (currState === 'Sign up') {
          navigate(data.designation === 'Recruiter' ? '/recruiter' : '/candidate');  
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error response:', error.response);
      toast.error(error.response?.data?.message || error.message || 'An error occurred.');
    }
  };

  const passwordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={submitHandler} className="relative bg-white p-8 rounded-lg sm:shadow-lg w-full max-w-md">
        <div className="mb-4">
          <h1 className="text-3xl text-center font-bold text-blue-500 mb-2">{currState}</h1>
        </div>
        {currState === "Sign up" && (
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        )}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="mb-4 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div
            onClick={passwordToggle}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <select
          name="designation"
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={onChangeHandler}
          value={data.designation}
          required>
          <option value="" disabled>Select Designation</option>
          <option value="Candidate">Candidate</option>
          <option value="Recruiter">Recruiter</option>
        </select>
        <div className="mb-6 flex items-start">
          <input
            type="checkbox"
            className="mr-2 mt-1 leading-tight"
            required />
          <p className="text-sm text-gray-600">
            By continuing, I agree to the{' '}
            <a href="#" className="text-blue-500 hover:underline">terms of use</a>{' '}and{' '}
            <a href="#" className="text-blue-500 hover:underline">privacy policy</a>.
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          {currState === 'Sign up' ? 'Create Account' : 'Login'}
        </button>
        <div className="mt-4 text-center">
          {currState === 'Sign up' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setCurrState('Login')}>
                Login
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setCurrState('Sign up')}>
                Sign Up
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
