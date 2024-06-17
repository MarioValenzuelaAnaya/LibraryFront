import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, deleteBook } from "../../features/Slices/booksSlice";
import { LoanBook, fetchLoans } from "../../features/Slices/loanSlice";
import { Tooltip } from 'react-tooltip';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


function Actions({ id }) {
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const isDisabled = !email;
  const tooltipMessage = "You need to be logged in";

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

  const navigateToTask=()=>{

    navigate(`/edit-task/${id}`);
}




  return (
    <div>
    
\

      <a data-tooltip-id="my-tooltip" data-tooltip-content={tooltipMessage}>
      <button
        onClick={() => navigateToTask(id)}
        className={`text-indigo-600 hover:text-indigo-900 mr-4 ${isDisabled ? "cursor-not-allowed text-gray-500" : ""}`}
        disabled={isDisabled}
        data-tip={isDisabled ? tooltipMessage : ""}
      >
      
      Edit
      </button>
      </a>

      
    
      <a data-tooltip-id="my-tooltip" data-tooltip-content={tooltipMessage}>
      <button
        onClick={() => handleDelete(id)}
        className={`text-red-600 hover:text-red-900 mr-4 ${isDisabled ? "cursor-not-allowed text-gray-500" : ""}`}
        disabled={isDisabled}
        data-tip={isDisabled ? tooltipMessage : ""}
      >
      
        Delete
      </button>
      </a>
      <a data-tooltip-id="my-tooltip" data-tooltip-content={tooltipMessage}>
      <button
        onClick={() => handleLoan(id)}
        className={`text-green-600 hover:text-green-900 ${isDisabled ? "cursor-not-allowed text-gray-500" : ""}`}
        disabled={isDisabled}
        data-tip={isDisabled ? tooltipMessage : ""}
      >
       
        Loan
      </button>
      </a>
      { isDisabled ? <Tooltip id="my-tooltip" />: ""}
    </div>
  );
}

export default Actions;
