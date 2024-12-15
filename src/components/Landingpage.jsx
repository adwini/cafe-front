import React, { useState, useEffect } from "react";
import Menu from "./MenuBar";
import Footer from "./layout/Footer";
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
      setTotalRegularBill(regularBill);
      setTotalDiscountedBill(discountedBill);
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
      <div className="flex flex-col min-h-screen gap-2 p-2 bg-gray-100 md:flex-row">
        <div className="w-full menu md:w-2/5">
          <Menu />
        </div>
        <div className="w-full mt-4 order-form md:w-3/5">
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
      <Footer />
    </>
  );
};

export default LandingPage;
