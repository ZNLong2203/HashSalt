import axios from 'axios';
import ROUTES from '../routes/routes';
import toast from 'react-hot-toast';
import useRefreshAccess from '../hooks/useRefreshAccess';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import { IoTrashBinOutline } from "react-icons/io5";
import Pagination from '../components/pagination';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/shop?page=${currentPage}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        });
        setProducts(res.data.products);
        setTotalPage(res.data.totalPages);
      } catch(err) {
        console.log(err);
        if(err.response.status === 401) {
          // await useRefreshAccess();
          // await fetchProducts();
        }
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (product_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${product_id}`, {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
      });
      const newProducts = products.filter((product) => product._id !== product_id);
      setProducts(newProducts);
      toast.success('Product deleted successfully');
    } catch(err) {
      toast.error('Failed to delete product');
      if(err.response.status === 401) {
        // await useRefreshAccess();
        // await handleDeleteProduct(product_id);
      }
    }
  }

  const handlePageChange = (newPage) => {
    if(newPage > 0 && newPage <= totalPage) {
      setCurrentPage(newPage);
    }
  }

  return (
    <div className="container mx-auto p-8 mt-16">
      <h1 className="text-4xl font-bold text-center mb-8">My Shop</h1>
      <div className="flex justify-center space-x-4 mb-5">
        <button
          onClick={() => navigate(ROUTES.CREATEPRODUCT)}
          className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Create Product
        </button>
        <button
          onClick={() => navigate(ROUTES.CREATEPRODUCT)}
          className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Delete All Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              className="w-full h-48 object-cover"
              src={product.product_image || 'https://applecenter.com.vn/uploads/cms/16632365177447.jpg'}
              alt={product.product_name}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{product.product_name}</h2>
              <p className="text-gray-700 mb-2">{product.product_description}</p>
              <p className="text-orange-600 font-semibold mb-4">Price: ${product.product_price}</p>
              <div className="flex justify-center space-x-4">
                <button
                  className="flex items-center justify-center bg-orange-500 text-white rounded-md px-4 py-2"
                  onClick={() => navigate(`/myproduct/${product._id}`)}
                >
                  <AiFillEye className="mr-2" />
                  View
                </button>
                <button
                  className="flex items-center justify-center bg-red-500 text-white rounded-md px-4 py-2"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  <IoTrashBinOutline className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPage={totalPage} handlePageChange={handlePageChange} />
    </div>
  );
}

export default Home;
