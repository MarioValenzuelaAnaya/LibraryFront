import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/Slices/authSlice";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);

  const handleLogout = () => {
    dispatch(logout());
  };

  const returnToLogin=()=>{

      navigate('/login');
  }


  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Library</div>
        <div>
          {email ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {email}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={returnToLogin}
              className="bg-blue-500 px-3 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
