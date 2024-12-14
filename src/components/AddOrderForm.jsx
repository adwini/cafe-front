import React, { useState, useRef } from "react";
import { addOrder } from "./service/apiService";

const AddOrderForm = ({
  setError,
  setSuccess,
  fetchOrders,
  fetchTotalBills,
}) => {
  const [orderItem, setOrderItem] = useState("");
  const [price, setPrice] = useState(0);
  const [promo, setPromo] = useState(false);
  const inputRef = useRef();

  const handleAddOrder = async () => {
    if (!orderItem) {
      setError("Order item cannot be empty");
      inputRef.current.focus();
      return;
    }

    const newOrder = { orderName: orderItem, price, discounted: promo };

    try {
      await addOrder(newOrder);
      setSuccess("Order added successfully!");
      setError(null);
      setOrderItem("");
      setPrice(0);
      setPromo(false);
      fetchOrders(); // Refresh the orders list
      fetchTotalBills(); // Update total bills after adding an order
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="w-full mt-2 rounded-lg shadow-2xl">
      <div className="relative px-1 py-1 overflow-x-auto border-2 border-black rounded-sm shadow-md">
        <table className="w-full text-2xl">
          <thead
            className="text-xl text-center bg-[rgba(0,0,139,0.96)] text-white"
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-100">
              <td
                className="text-center text-black border-2 border-r-white"
                style={{ fontFamily: "Monaco, monospace" }}>
                <input
                  className="text-lg bg-white border-r "
                  ref={inputRef}
                  type="text"
                  value={orderItem}
                  onChange={(e) => setOrderItem(e.target.value)}
                />
              </td>
              <td
                className="text-center text-black border-2 border-r-white"
                style={{ fontFamily: "Monaco, monospace" }}>
                <input
                  className="text-lg bg-white border-r "
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </td>
              <td
                className="pt-1 text-center text-black border-2 border-r-white"
                style={{ fontFamily: "Monaco, monospace" }}>
                <input
                  id="default-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={promo}
                  onChange={(e) => setPromo(e.target.checked)}
                />
              </td>
              <td className="text-center ">
                <button
                  className="btn bg-[rgba(0,0,139,0.96)] border rounded-lg text-white btn-sm"
                  style={{ fontFamily: "Monaco, monospace" }}
                  onClick={handleAddOrder}>
                  Place Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddOrderForm;
