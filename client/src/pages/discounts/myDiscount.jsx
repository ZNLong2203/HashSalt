import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ROUTES from "../../routes/routes";
import useRefreshAccess from "../../hooks/useRefreshAccess";
import { jwtDecode } from "jwt-decode";
import { FaRegSmile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import moment from "moment";
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

const MyDiscounts = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [discounts, setDiscounts] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Track the discount being edited
  const [editDiscount, setEditDiscount] = useState({}); // Store the edited discount values
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [noDiscount, setNoDiscount] = useState(false);
  const [position, setPosition] = useState("top");

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken._id;
        const response = await axios.get(
          `${ROUTES.BE}/api/discounts/shop?shopId=${userId}&page=${currentPage}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setDiscounts(response.data.discounts);
        if (response.data.discounts.length === 0) {
          setNoDiscount(true);
        }
        setTotalPage(response.data.totalPages);
      } catch (error) {
        toast.error("Error fetching discounts or decoding token:", error);
        if (error.response.status === 401) {
          // await useRefreshAccess();
          // await fetchDiscounts();
        }
      }
    };

    fetchDiscounts();
  }, [token]);

  useEffect(() => {
    if(position === "bottom") {
      setDiscounts(discounts.filter((discount) => discount.discount_status === false));
    } else {
      setDiscounts(discounts.filter((discount) => discount.discount_status === true));
    }
  }, [position]);

  const handleEditClick = (discount) => {
    setIsEditing(discount._id);
    setEditDiscount(discount);
  };

  const handleDeleteClick = async (discountId) => {
    try {
      await axios.delete(`${ROUTES.BE}/api/discounts/${discountId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setDiscounts(discounts.filter((discount) => discount._id !== discountId));
    } catch (error) {
      console.error("Error deleting discount:", error);
      if (error.response.status === 401) {
        // await useRefreshAccess();
        // await handleDeleteClick();
      }
    }
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `${ROUTES.BE}/api/discounts/${editDiscount._id}`,
        editDiscount,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setDiscounts(
        discounts.map((discount) =>
          discount._id === editDiscount._id ? editDiscount : discount
        )
      );
      setIsEditing(null);
    } catch (error) {
      console.error("Error saving discount:", error);
      if (error.response.status === 401) {
        // await useRefreshAccess();
        // await handleSaveClick();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDiscount({
      ...editDiscount,
      [name]: value,
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen p-8 mt-12 mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">My Discounts</h1>

      <div className="flex justify-center space-x-4 mx-auto mb-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            >
              Show Discount
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Visible</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">
                All Discounts
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="mid">
                Published Discounts
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                UnPublished Discounts
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          onClick={() => navigate(ROUTES.CREATEDISCOUNT)}
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        >
          Create Discount
        </button>
        <button
          onClick={() => navigate(ROUTES.CREATEDISCOUNT)}
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        >
          Delete Discount
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {discounts.map((discount) => (
          <div
            key={discount._id}
            className="bg-zinc-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {isEditing === discount._id ? (
              <div>
                <input
                  type="text"
                  name="discount_code"
                  value={editDiscount.discount_code}
                  onChange={handleChange}
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="discount_description"
                  value={editDiscount.discount_description}
                  onChange={handleChange}
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="number"
                  name="discount_value"
                  value={editDiscount.discount_value}
                  onChange={handleChange}
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="number"
                  name="discount_max_uses"
                  value={editDiscount.discount_max_uses}
                  onChange={handleChange}
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="boolean"
                  name="discount_status"
                  value={editDiscount.discount_status}
                  onChange={handleChange}
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="date"
                  name="discount_start"
                  value={moment(editDiscount.discount_start).format(
                    "YYYY-MM-DD"
                  )}
                  onChange={handleChange}
                  className="mb-2 w-full p-2 border rounded"
                />
                <input
                  type="date"
                  name="discount_end"
                  value={moment(editDiscount.discount_end).format("YYYY-MM-DD")}
                  onChange={handleChange}
                  className="mb-2 w-full p-2 border rounded"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleSaveClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {discount.discount_code}
                </h2>
                <p className="text-gray-700 mb-4">
                  {discount.discount_description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-bold text-blue-600">
                    {discount.discount_type === "percentage"
                      ? `${discount.discount_value}% OFF`
                      : `$${discount.discount_value} OFF`}
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <FaRegSmile />
                    <span>Max Uses: {discount.discount_max_uses}</span>
                  </div>
                </div>
                <div className="text-gray-500 mb-4">
                  Valid from:{" "}
                  {moment(discount.discount_start).format("MMM DD, YYYY")} to{" "}
                  {moment(discount.discount_end).format("MMM DD, YYYY")}
                </div>
                <div className="flex justify-center space-x-14 mt-4">
                  <button
                    onClick={() => handleEditClick(discount)}
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(discount._id)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!noDiscount ? (
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          handlePageChange={handlePageChange}
        />
      ) : (
        <div className="text-center mt-2 text-4xl font-semibold text-gray-600">
          You not create any discount yet
        </div>
      )}
    </div>
  );
};

export default MyDiscounts;
