import axios from "axios";
import ROUTES from "../../routes/routes";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { IoTrashBinOutline } from "react-icons/io5";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Pagination from "../../components/pagination";

const MYSHOP = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [noProduct, setNoProduct] = useState(false);
  const [position, setPosition] = useState("top");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${ROUTES.BE}/api/products/shop?page=${currentPage}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );
        setProducts(res.data.products);
        if (res.data.products.length === 0) {
          setNoProduct(true);
        }
        setTotalPage(res.data.totalPages);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          // await useRefreshAccess();
          // await fetchProducts();
        }
      }
    };
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    if(position === "bottom") {
      setProducts(products.filter((product) => product.isPublished === false));
    } else {
      setProducts(products.filter((product) => product.isPublished === true));
    }
  }, [position]);

  const handleDeleteProduct = async (product_id) => {
    try {
      await axios.delete(`${ROUTES.BE}/api/products/${product_id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      const newProducts = products.filter(
        (product) => product._id !== product_id
      );
      setProducts(newProducts);
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
      if (err.response.status === 401) {
        // await useRefreshAccess();
        // await handleDeleteProduct(product_id);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-8 mt-12">
      <h1 className="text-4xl font-bold text-center mb-8">My Shop</h1>

      <div className="flex justify-center space-x-4 mb-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            >
              Show Product
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Visible</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">All Products</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="mid">
                Published Products
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">UnPublished Product</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          onClick={() => navigate(ROUTES.CREATEPRODUCT)}
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        >
          Create Product
        </button>
        <button
          onClick={() => navigate(ROUTES.CREATEPRODUCT)}
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        >
          Delete All Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              className="w-full h-48 object-cover"
              src={
                product.product_image ||
                "https://applecenter.com.vn/uploads/cms/16632365177447.jpg"
              }
              alt={product.product_name}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-900 truncate h-12">
                {product.product_name}
              </h2>
              <p className="text-orange-600 font-semibold mb-4">
                Price: ${product.product_price} / per
              </p>
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

      {!noProduct ? (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          handlePageChange={handlePageChange}
        />
      ) : (
        <div className="text-center mt-2 text-4xl font-semibold text-gray-800">
          You not create any product yet
        </div>
      )}
    </div>
  );
};

export default MYSHOP;
