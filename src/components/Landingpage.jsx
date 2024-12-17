import React, { useState, useEffect } from "react";
import Menu from "./MenuBar";
import AddOrderForm from "./AddOrderForm";
import ListOrders from "./ListOrders";
import {
  getOrders,
  getTotalRegularBill,
  getTotalDiscountedBill,
} from "./service/apiService";

const LandingPage = ({ setError, setSuccess }) => {
  const [orders, setOrders] = useState([]);
  const [totalRegularBill, setTotalRegularBill] = useState(0);
  const [totalDiscountedBill, setTotalDiscountedBill] = useState(0);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError("Cannot load details. Something went wrong.");
    }
  };

  const fetchTotalBills = async () => {
    try {
      const regularBill = await getTotalRegularBill();
      const discountedBill = await getTotalDiscountedBill();
      setTotalRegularBill(regularBill.toFixed(2));
      setTotalDiscountedBill(discountedBill.toFixed(2));
    } catch (err) {
      setError("Cannot load details. Something went wrong.");
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchTotalBills();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen gap-2 p-2 bg-gray-100">
        <div className="flex flex-col flex-1 md:flex-row">
          <div className="w-full md:w-2/5">
            <Menu />
          </div>
          <div className="flex flex-col w-full mt-4 md:w-3/5">
            <AddOrderForm
              setError={setError}
              setSuccess={setSuccess}
              fetchOrders={fetchOrders}
              fetchTotalBills={fetchTotalBills}
            />
            <ListOrders
              setError={setError}
              setSuccess={setSuccess}
              orders={orders}
              setOrders={setOrders}
              totalRegularBill={totalRegularBill}
              totalDiscountedBill={totalDiscountedBill}
              fetchTotalBills={fetchTotalBills}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
