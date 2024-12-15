import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./components/utils/Routes";

import MessageInfo from "./components/utils/MessageInfo";

function App() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCloseMessage = () => {
    setError(null);
    setSuccess(null);
  };

  return (
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

      <AppRoutes setError={setError} setSuccess={setSuccess} />
    </Router>
  );
}

export default App;
