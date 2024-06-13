import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/tasks/authSlice';
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
    <div className="flex items-center justify-center w-max bg-gray-100">
      <div className="w-full max-w-96 bg-white p-6 rounded-lg	 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-black">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50">
            {isLoading ? 'Loading...' : 'Login'}
          </button>
          {error && <p className="mt-4 text-red-500">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
