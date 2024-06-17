import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

// Components
import BookList from "./components/Books/BookList";
import BookForm from "./components/Books/BookForm";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/Pages/PrivateRoute";
import AuthWrapper from "./components/Login/AuthWrapper";
import Navbar from "./components/Pages/NavBar";

function App() {
  return (
    <div className="bg-slate-300 h-screen text-white">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navbar />
        <div className="flex items-center justify-center h-full">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<BookList />} />
            <Route
              path="/create-book"
              element={
                <AuthWrapper>
                  <PrivateRoute>
                    <BookForm />
                  </PrivateRoute>
                </AuthWrapper>
              }
            />
            <Route
              path="/edit-task/:id"
              element={
                <AuthWrapper>
                  <PrivateRoute>
                    <BookForm />
                  </PrivateRoute>
                </AuthWrapper>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
