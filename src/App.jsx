import React, { useState } from "react";
import Menu from "./components/MenuBar";
import AddOrderForm from "./components/AddOrderForm";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ListOrders from "./components/ListOrders";
import MessageInfo from "./components/common/MessageInfo";

function App() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      <div className="flex flex-col md:flex-row gap-2 p-2 bg-gray-100 min-h-screen">
        <div className="menu w-full md:w-2/5">
          <Menu />
        </div>
        <div className="order-form w-full md:w-3/5 mt-4">
          <AddOrderForm />
          <ListOrders setError={setError} setSuccess={setSuccess} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
