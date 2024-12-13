import React, { useState, useEffect } from "react";
import { getOrders, updateOrder, deleteOrder } from "./service/apiService";

const ListOrders = ({ setError, setSuccess }) => {
  const [orders, setOrders] = useState([]);
  const [orderItem, setOrderItem] = useState("");
  const [price, setPrice] = useState(0);
  const [promo, setPromo] = useState(false);
  const [clerkName, setClerkName] = useState("Jane Doe");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrders();
  }, [setError]);

  const handleUpdateOrder = async (id) => {
    try {
      const updatedOrder = { orderItem, price, promo };
      await updateOrder(id, updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, ...updatedOrder } : order
        )
      );
      setSuccess("Order updated successfully!");
      setError(null);
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
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="w-full rounded-lg mt-10">
      <div className="relative overflow-x-auto shadow-md py-1 px-1 border-2 border-black rounded-sm">
        <div
          className="text-black text-center mt-3 mb-2 text-lg"
          style={{ fontFamily: "Monaco, monospace" }}>
          <p>
            Attending Clerk: <span>{clerkName}</span>
          </p>
        </div>
        <table className="w-full text-2xl">
          <thead
            className="text-xl text-center bg-[rgba(0,0,139,0.96)] text-white"
            style={{ fontFamily: "Courier New, monospace" }}>
            <tr>
              <th scope="col" className="border-r border-2">
                Order Item
              </th>
              <th scope="col" className="border-r border-2">
                Price
              </th>
              <th scope="col" className="border-r border-2">
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
                <td className="px-6 py-4 border-r border-2 text-black">
                  {order.orderItem}
                </td>
                <td className="px-6 py-4 border-r border-2 text-black">
                  {order.price}
                </td>
                <td className="px-6 py-4 border-r border-2 text-center text-black">
                  {order.promo ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 border-2 text-black">
                  <button
                    className="btn bg-[rgba(9,0,139,0.95)] border rounded-full text-white mr-2"
                    onClick={() => handleUpdateOrder(order.id)}>
                    Update
                  </button>
                  <button
                    className="btn bg-red-500 border rounded-full text-white"
                    onClick={() => handleDeleteOrder(order.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOrders;
