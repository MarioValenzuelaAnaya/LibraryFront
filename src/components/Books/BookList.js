import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoanList from "../Loans/LoanList";
import { PlusIcon } from "@heroicons/react/24/solid";
import BookTable from "./BookTable";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { fetchBooks,deleteBook } from './../../features/Slices/booksSlice';
import { LoanBook,fetchLoans } from './../../features/Slices/loanSlice';


function BookList() {
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.list);
  const status = useSelector((state) => state.books.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  useEffect(() => {

  }, [books]);

  const handleDeleteBook = async (id) => {
    await dispatch(deleteBook(id));
    dispatch(fetchBooks());
  };

  const handleLoanBook = async (id) => {
    await dispatch(LoanBook({ bookid: id }));
    await dispatch(fetchLoans());
    await dispatch(fetchBooks());
  };

  const navigateTocreateBook = () => {
    navigate(`/create-book`);
  };

  const isDisabled = !email;
  const tooltipMessage = "You need to be logged in";
  return (
    <div className="w-4/6 mx-auto mt-8">
      <div className="overflow-x-auto bg-slate-500 rounded-lg shadow-md">
        <div className="flex justify-between items-center py-4 px-6 bg-slate-600 text-white rounded-t-lg">
          <h1 className="text-xl font-bold">Books</h1>
          <a data-tooltip-id="my-tooltip" data-tooltip-content={tooltipMessage}>
            <button
              onClick={() => navigateTocreateBook()}
              className={`flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                isDisabled ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isDisabled}
            >
              <PlusIcon className="h-5 w-5 mr-2" /> 
              Add Book
            </button>
          </a>
        </div>
        <div className="max-h-80 overflow-y-auto">
          <BookTable
            books={books}
            onDeleteBook={handleDeleteBook}
            onLoanBook={handleLoanBook}
          />
        </div>
      </div>
      <LoanList />
      {isDisabled ? <Tooltip id="my-tooltip" /> : ""}
    </div>
  );
}

export default BookList;
