import React, { useState, useEffect } from "react";
import Menu from "./components/MenuBar";
import AddOrderForm from "./components/AddOrderForm";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ListOrders from "./components/ListOrders";
import MessageInfo from "./components/utils/MessageInfo";
import {
  getOrders,
  getTotalRegularBill,
  getTotalDiscountedBill,
} from "./components/service/apiService";

function App() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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

  const handleCloseMessage = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <>
      <Navbar />
      {error && (
        <MessageInfo
          text={error}
          status="failure"
          onClose={handleCloseMessage}
        />
      )}
      {success && (
        <MessageInfo
          text={success}
          status="success"
          onClose={handleCloseMessage}
        />
      )}
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
            setOrders={setOrders} // Pass setOrders as a prop
            totalRegularBill={totalRegularBill}
            totalDiscountedBill={totalDiscountedBill}
            fetchTotalBills={fetchTotalBills} // Pass fetchTotalBills as a prop
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
