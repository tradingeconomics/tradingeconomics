import { TableDataProps, EconomicIndicator } from '@/types';
import { useMemo } from 'react';
  

const TableData = ({ sortConfig, setSortConfig,data, page, setPage,  filter, setFilter, pageSize }: TableDataProps) => {

     // Sorting logic
  const sortedData = useMemo(() => {
    const sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        // Handle numerical sorting for LatestValue and PreviousValue
        if (sortConfig.key === "LatestValue" || sortConfig.key === "PreviousValue") {
          const aNum = parseFloat(String(aValue)) || 0;
          const bNum = parseFloat(String(bValue)) || 0;
          return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
        }
        // Handle string sorting
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // Filtering logic
  const filteredData = sortedData.filter(
    item => !filter || item.CategoryGroup === filter
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const requestSort = (key: keyof EconomicIndicator) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get unique CategoryGroups for filter
  const categoryGroups = [...new Set(data.map(item => item.CategoryGroup))];


  return (
    <div className="rounded shadow bg-white p-5">
        <div className="mb-5 ">
          <label className="mr-2">Filter by Category Group:</label>
          <select
            value={filter}
            onChange={e => {
              setFilter(e.target.value);
              setPage(1); // Reset to first page when filter changes
            }}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            {categoryGroups.map(group => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50 w-full">
              <tr>
                {[
                  "Title",
                  "Category",
                  "CategoryGroup",
                  "LatestValue",
                  "Unit",
                  "PreviousValue",
                  "LatestValueDate",
                ].map(key => (
                  <th
                    key={key}
                    onClick={() => requestSort(key as keyof EconomicIndicator)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                    {sortConfig.key === key ? (sortConfig.direction === "asc" ? " 🔼" : " 🔽") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-gray-200">
              {paginatedData.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{row.Title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.Category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.CategoryGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.LatestValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.Unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.PreviousValue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.LatestValueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <button
              onClick={() => setPage(page => Math.max(page - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page => Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
          <span>
            Page <strong>{page} of {totalPages}</strong>
          </span>
        </div>
      </div>
  )
}

export default TableData
