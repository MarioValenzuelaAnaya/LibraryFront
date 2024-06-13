import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchBooks, deleteBook } from "../features/tasks/booksSlice";
import { LoanBook, fetchLoans } from "../features/tasks/loanSlice";
import LoanList from "./loanList";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { PlusIcon } from "@heroicons/react/24/solid";

function Actions({ id }) {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await dispatch(deleteBook(id));
    await dispatch(fetchBooks());
    await dispatch(fetchLoans());
  };

  const handleLoan = async (id) => {
    await dispatch(LoanBook({ bookid: id }));
    await dispatch(fetchLoans());
    await dispatch(fetchBooks());
  };

  return (
    <div>
      <Link
        to={`/edit-task/${id}`}
        className="text-indigo-600 hover:text-indigo-900 mr-4"
      >
        Edit
      </Link>
      <button
        onClick={() => handleDelete(id)}
        className="text-red-600 hover:text-red-900 mr-4"
      >
        Delete
      </button>
      <button
        onClick={() => handleLoan(id)}
        className="text-green-600 hover:text-green-900"
      >
        Loan
      </button>
    </div>
  );
}

export default Actions;
