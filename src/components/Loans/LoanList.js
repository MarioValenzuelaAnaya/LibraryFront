import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoans, returnLoan } from "../../features/Slices/loanSlice";
import { fetchBooks } from "../../features/Slices/booksSlice";
import { format } from "date-fns";
import { Tooltip } from "react-tooltip";


const LoanList = () => {
 
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const loans = useSelector((state) => state.loans.list);
  const status = useSelector((state) => state.loans.status);
  const isDisabled = !email;
  const tooltipMessage = "You need to be logged in";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLoans());
    }
  }, [status, dispatch]);

  useEffect(() => {

  }, [loans]);

  const handleReturnLoan = async (id) => {
  
    await dispatch(returnLoan({ loanid: id }));
    await dispatch(fetchLoans());
    await dispatch(fetchBooks());
  };

  const formatLoanDate = (date) => {
    return format(new Date(date), "dd/MM/yyyy HH:mm:ss");
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
                  Book Title
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
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {loan.book?.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {loan.book?.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatLoanDate(loan.loanDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={tooltipMessage}
                    >
                      <button
                        onClick={() => handleReturnLoan(loan.id)}
                        className={`text-green-600 hover:text-green-900 ${
                          isDisabled ? "cursor-not-allowed text-gray-500" : ""
                        }`}
                        disabled={isDisabled}
                        data-tip={isDisabled ? tooltipMessage : ""}
                      >
                        Return
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      { isDisabled ? <Tooltip id="my-tooltip" />: ""}
    </div>
  );
};

export default LoanList;
