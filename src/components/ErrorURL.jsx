import React from "react";
import { useNavigate } from "react-router-dom";
import MessageInfo from "./utils/MessageInfo";

const ErrorURL = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 before: md:flex-row">
      <MessageInfo
        text="Unsupported web page URL."
        status="failure"
        showCloseButton={false}
      />
      <button
        className="font-bold text-blue-600 underline"
        onClick={() => navigate(-1)}>
        Back to Order Page
      </button>
    </div>
  );
};

export default ErrorURL;
