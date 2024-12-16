import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./components/utils/Routes";
import MessageInfo from "./components/utils/MessageInfo";
import Footer from "./components/layout/Footer"; // Ensure you have a Footer component

function App() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCloseMessage = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div id="root">
      <Router>
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
        <main style={{ flex: 1 }}>
          <AppRoutes setError={setError} setSuccess={setSuccess} />
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
