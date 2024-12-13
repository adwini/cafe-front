import React, { useState } from "react";

const AddOrderForm = () => {
  const [orderItem, setOrderItem] = useState("");
  const [price, setPrice] = useState(0);
  const [promo, setPromo] = useState(false);

  const [totalBill, setTotalBill] = useState(0);
  const [discountedBill, setDiscountedBill] = useState(0);

  const handleOrder = () => {
    const discount = promo ? price * 0.05 : 0;
    setTotalBill((prev) => prev + price);
    setDiscountedBill((prev) => prev + price - discount);
  };

  return (
    <>
      <div className="w-full rounded-lg shadow-2xl mt-2 ">
        <div className="relative overflow-x-auto shadow-md py-1 px-1 border-2 border-black rounded-sm">
          <table className="w-full text-2xl">
            <thead
              className="text-xl text-center bg-[rgba(0,0,139,0.96)] text-white "
              style={{ fontFamily: "Courier New, monospace" }}>
              <tr>
                <th scope="col" className="  border-r border-2">
                  Order Item
                </th>
                <th scope="col" className="border-r border-2">
                  Price
                </th>
                <th scope="col" className="border-r border-2">
                  On 5% Promo?
                </th>
                <th scope="col" className="px-4 py-2 border-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-50 ">
                <td className="px-6 py-4 border-r border-2  text-black">
                  <input
                    type="text"
                    value={orderItem}
                    onChange={(e) => setOrderItem(e.target.value)}
                    className="input input-bordered w-full bg-gray-100"
                  />
                </td>
                <td className="px-6 py-4 border-r border-2 text-black">
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input input-bordered w-full bg-gray-100"
                  />
                </td>
                <td className="px-6 py-4 border-r border-2 text-center  text-black">
                  <input
                    type="checkbox"
                    checked={promo}
                    onChange={() => setPromo(!promo)}
                    className="checkbox bg-gray-300"
                  />
                </td>
                <td className="px-6 py-4 border-2  text-black">
                  <button
                    className="btn bg-[rgba(9,0,139,0.95)] border rounded-full text-white"
                    onClick={handleOrder}>
                    Place Order
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddOrderForm;
