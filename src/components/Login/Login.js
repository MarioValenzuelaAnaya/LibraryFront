import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/Slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-0 text-gray-900 text-center ">Welcome Back</h2>
        <div className="flex flex-col items-center mb-4 ">
    <span className="text-sm text-red-500">Email:  admin@localhost.com</span>
    <span className="text-sm text-red-500">Password:  P@ssw0rd</span>
  </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full p-3 border  text-gray-700 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-200"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full p-3 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition duration-200"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-200"
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
