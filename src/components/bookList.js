import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchBooks, deleteBook } from "../features/tasks/booksSlice";
import { LoanBook, fetchLoans } from "../features/tasks/loanSlice";
import LoanList from "./loanList";
import {React,useState} from "react";
import "react-toastify/dist/ReactToastify.css";
import { PlusIcon } from '@heroicons/react/24/solid';
import  Actions from "./actions";

function BookList() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.list);
  const status = useSelector((state) => state.books.status);
 

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log("Books updated:", books);
  }, [books]);

  const handleDelete = async (id) => {
    await dispatch(deleteBook(id));
    dispatch(fetchBooks());
  };

  const handleLoan = async (id) => {
    await dispatch(LoanBook({ bookid: id }));
    await dispatch(fetchLoans());
    await dispatch(fetchBooks());
  };

  return (
    <div className="w-4/6 mx-auto mt-8">
      <div className="overflow-x-auto bg-slate-500 rounded-lg shadow-md">
        <div className="flex justify-between items-center py-4 px-6 bg-slate-600 text-white rounded-t-lg">
          <h1 className="text-xl font-bold">Books</h1>
          <Link
          to="/create-task"
          className="bg-indigo-600 text-white px-4 py-2 rounded-sm text-sm shadow-sm flex items-center"
        >
          <PlusIcon className="h-5 w-5" />
        </Link>
        </div>
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Copies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {task.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {task.copiesAvailable}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">                
                     <Actions  id={task.id}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <LoanList />
     
    </div>
  );
}

export default BookList;
