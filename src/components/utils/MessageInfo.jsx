import React from "react";
import PropTypes from "prop-types";

const MessageInfo = ({ text, status, onClose }) => {
  const bgColor = status === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`text-white text-center ${bgColor} relative p-1`}>
      {text}
      <button
        className="ml-4 text-white bg-transparent border-none p-0"
        onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

MessageInfo.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["success", "failure"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MessageInfo;
