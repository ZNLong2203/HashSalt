import React from 'react';

const Pagination = ({ currentPage, totalPage, handlePageChange }) => {
    return (
        <div className="flex justify-center mt-12">
        <button
          className="px-4 py-2 mx-2 bg-gray-200 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPage}
        </span>
        <button
          className="px-4 py-2 mx-2 bg-gray-200 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>
    )
}

export default Pagination;