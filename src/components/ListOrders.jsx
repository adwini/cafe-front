import React, { useState, useEffect, useRef } from "react";
import {
  getOrders,
  updateOrder,
  deleteOrder,
  getTotalRegularBill,
  getTotalDiscountedBill,
} from "./service/apiService";

const ListOrders = ({
  setError,
  setSuccess,
  orders,
  setOrders, // Add setOrders as a prop
  totalRegularBill,
  totalDiscountedBill,
  fetchTotalBills, // Add fetchTotalBills as a prop
}) => {
  const [editMode, setEditMode] = useState(null);
  const [orderItem, setOrderItem] = useState("");
  const [price, setPrice] = useState(0);
  const [promo, setPromo] = useState(false);
  const [clerkName, setClerkName] = useState("Jane Doe");
  const inputRef = useRef();

  const handleEditClick = (order) => {
    setEditMode(order.id);
    setOrderItem(order.orderName);
    setPrice(order.price);
    setPromo(order.discounted);
  };

  const handleCancelClick = () => {
    setEditMode(null);
  };

  const handleUpdateOrder = async (id) => {
    if (!orderItem) {
      setError("Order item cannot be empty");
      inputRef.current.focus();
      return;
    }

    try {
      const updatedOrder = { orderName: orderItem, price, discounted: promo };
      await updateOrder(id, updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, ...updatedOrder } : order
        )
      );
      setSuccess("Order updated successfully!");
      setError(null);
      setEditMode(null);
      fetchTotalBills(); // Update total bills after updating an order
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      setSuccess("Order deleted successfully!");
      setError(null);
      fetchTotalBills(); // Update total bills after deleting an order
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="w-full mt-10 rounded-lg">
      <div className="relative px-1 py-1 overflow-x-auto border-2 border-black rounded-sm shadow-md">
        <div
          className="mt-3 mb-2 text-base text-center text-black"
          style={{ fontFamily: "Monaco, monospace" }}>
          <p>
            Attending Clerk: <span>{clerkName}</span>
          </p>
        </div>
        <table className="w-full text-lg">
          <thead
            className="text-lg text-center bg-[rgba(0,0,139,0.96)] text-white"
            style={{ fontFamily: "Courier New, monospace" }}>
            <tr>
              <th scope="col" className="border-2 border-r">
                Order Item
              </th>
              <th scope="col" className="border-2 border-r">
                Price
              </th>
              <th scope="col" className="border-2 border-r">
                On 5% Promo?
              </th>
              <th scope="col" className="px-4 py-2 border-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-blue-50">
                <td
                  className="text-center text-black border-2 border-r "
                  style={{ fontFamily: "Monaco, monospace" }}>
                  {editMode === order.id ? (
                    <input
                      className="w-full text-center bg-transparent border-2 border-r"
                      ref={inputRef}
                      type="text"
                      value={orderItem}
                      onChange={(e) => setOrderItem(e.target.value)}
                    />
                  ) : (
                    order.orderName
                  )}
                </td>
                <td
                  className="text-center text-black border-2 border-r"
                  style={{ fontFamily: "Monaco, monospace" }}>
                  {editMode === order.id ? (
                    <input
                      className="w-full text-center bg-transparent border-2 border-r "
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  ) : (
                    order.price
                  )}
                </td>
                <td
                  className="pt-1 text-center text-black border-2 border-r"
                  style={{ fontFamily: "Monaco, monospace" }}>
                  {editMode === order.id ? (
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={promo}
                      onChange={(e) => setPromo(e.target.checked)}
                    />
                  ) : (
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      defaultValue=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-100 focus:ring-2 dark:bg-gray-300 dark:border-gray-300"
                      checked={order.discounted}
                      disabled
                    />
                  )}
                </td>
                <td
                  className="text-sm text-center text-black border-2"
                  style={{ fontFamily: "Monaco, monospace" }}>
                  {editMode === order.id ? (
                    <>
                      <button
                        className="pr-3 mr-1 text-blue-700 border-r border-blue-700"
                        onClick={() => handleUpdateOrder(order.id)}>
                        Update
                      </button>
                      <button
                        className="pl-2 text-blue-700"
                        onClick={handleCancelClick}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="pr-3 mr-1 text-blue-700 border-r border-blue-700"
                        onClick={() => handleEditClick(order)}>
                        Edit
                      </button>
                      <button
                        className="pl-2 text-blue-700"
                        onClick={() => handleDeleteOrder(order.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="mt-3 mb-2 text-base text-center text-black"
          style={{ fontFamily: "Monaco, monospace" }}>
          <p>
            Total Regular Bill: <span>{totalRegularBill}</span>
          </p>
          <p>
            Total Discounted Bill: <span>{totalDiscountedBill}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListOrders;
