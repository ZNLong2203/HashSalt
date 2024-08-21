import React from 'react';

const Pagination = ({ currentPage, totalPage, handlePageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-4 py-2 mx-1 rounded ${i === currentPage ? 'bg-gray-300 font-bold' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(
            <button
              key={i}
              className={`px-4 py-2 mx-1 rounded ${i === currentPage ? 'bg-gray-300 font-bold' : 'bg-gray-200'}`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          );
        }
        pageNumbers.push(<span key="dots1" className="px-4 py-2">...</span>);
        pageNumbers.push(
          <button
            key={totalPage}
            className="px-4 py-2 mx-1 bg-gray-200 rounded"
            onClick={() => handlePageChange(totalPage)}
          >
            {totalPage}
          </button>
        );
      } else if (currentPage > 3 && currentPage < totalPage - 2) {
        pageNumbers.push(
          <button
            key={1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        );
        pageNumbers.push(<span key="dots1" className="px-4 py-2">...</span>);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <button
              key={i}
              className={`px-4 py-2 mx-1 rounded ${i === currentPage ? 'bg-gray-300 font-bold' : 'bg-gray-200'}`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          );
        }
        pageNumbers.push(<span key="dots2" className="px-4 py-2">...</span>);
        pageNumbers.push(
          <button
            key={totalPage}
            className="px-4 py-2 mx-1 bg-gray-200 rounded"
            onClick={() => handlePageChange(totalPage)}
          >
            {totalPage}
          </button>
        );
      } else {
        pageNumbers.push(
          <button
            key={1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        );
        pageNumbers.push(<span key="dots1" className="px-4 py-2">...</span>);
        for (let i = totalPage - 2; i <= totalPage; i++) {
          pageNumbers.push(
            <button
              key={i}
              className={`px-4 py-2 mx-1 rounded ${i === currentPage ? 'bg-gray-300 font-bold' : 'bg-gray-200'}`}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          );
        }
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-12">
      <button
        className="px-4 py-2 mx-2 bg-gray-200 rounded"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className="px-4 py-2 mx-2 bg-gray-200 rounded"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
