import React from "react";
import "./Pagination.css";

const Pagination = ({
  itemsPerPage,
  length,
  handlePagination,
  currentPage,
  nextPage,
  previousPage
}) => {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li onClick={previousPage} className="page-number">
          Prev
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => handlePagination(number)}
            className="page-number"
          >
            {number}
          </li>
        ))}
        <li onClick={nextPage} className="page-number">
          Next
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
