import React from "react";
import { Route, Routes } from "react-router-dom";

const Routes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
};

export default Routes;
