import Actions from "../Actions/Actions";
function BookTable(props) {
  const columns = ["Title", "Author", "Copies", "Actions"];
  return (
    <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-md">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {props.books.map((task) => (
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
              <Actions id={task.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookTable;
