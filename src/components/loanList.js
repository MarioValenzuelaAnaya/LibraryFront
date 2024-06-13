import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLoans, returnLoan } from "../features/tasks/loanSlice";
import { fetchBooks } from "../features/tasks/booksSlice";
import { format } from 'date-fns';

const LoanList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.loans.list);
  const status = useSelector((state) => state.loans.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLoans());
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log("Books updated:", books);
  }, [books]);

  const handleReturn = async (id) => {
    console.warn(id);
    await dispatch(returnLoan({ loanid: id }));
    await dispatch(fetchLoans());
    await dispatch(fetchBooks());
  };

  return (
    <div className="w-4/6 mx-auto mt-8">
      <div className="overflow-x-auto bg-slate-500 rounded-lg shadow-md">
        <div className="flex justify-between items-center py-4 px-6 bg-slate-600 text-white rounded-t-lg">
          <h1 className="text-xl font-bold">Loaned Books</h1>
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
                Loan Date
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
                      {task.book.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task.book.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                    {format(new Date(task.loanDate), 'dd/MM/yyyy HH:mm:ss')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleReturn(task.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LoanList;
