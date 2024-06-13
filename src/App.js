import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import BookList from "./components/bookList";
import TaskForm from "./components/TaskForm";
import Login from "./components/login";
import PrivateRoute from "./components/privateRoute";

function App() {
  return (
    <div className="bg-slate-300 h-screen text-white">
      <div className="flex items-center justify-center h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <BookList />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-task"
              element={
                <PrivateRoute>
                  <TaskForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-task/:id"
              element={
                <PrivateRoute>
                  <TaskForm />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
