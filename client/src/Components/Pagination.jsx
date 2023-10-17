import React, { useState, useEffect } from "react";
import axios from "axios";
import { getProduct } from "../API/ProductAPi";

function Pagination({updateProducts,refresh}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,setLoading] = useState(false)


  useEffect(() => {
    getProductDetails();
  }, [page, limit,refresh]);

  const getProductDetails = async () => {
    setLoading(true)
    const product = await getProduct(page, limit);
    setTotalPages(product.data.totalPages);
    updateProducts(product.data.docs);
    setLoading(false)
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`px-3 py-2 mx-1 rounded-full focus:outline-none
          ${
            i === page
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-300 hover:bg-gray-400 text-gray-700"
          }`}
      >
        {i}
      </button>
    );
  }

  return (
    <>
          {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
    <div className="flex justify-center items-center mb-10">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-2 rounded-full focus:outline-none
          ${
            page === 1 ? "bg-gray-300 text-gray-700" : "bg-blue-500 text-white"
          } mr-2`}
      >
        Previous
      </button>

      <div className="bg-white">
        <p className="text-black">{pageNumbers}</p>
      </div>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-2 rounded-2xl bg-blue-500 text-white ml-2 focus:outline-none"
      >
        Next
      </button>
    </div>
    </>
    
  );
}

export default Pagination;
