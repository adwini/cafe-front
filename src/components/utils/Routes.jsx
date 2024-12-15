import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../Landingpage";
import ErrorURL from "../ErrorURL";

const AppRoutes = ({ setError, setSuccess }) => {
  return (
    <Routes>
      <Route
        path="/kopeeTeria"
        element={<LandingPage setError={setError} setSuccess={setSuccess} />}
      />
      <Route path="*" element={<ErrorURL />} />
    </Routes>
  );
};

export default AppRoutes;
