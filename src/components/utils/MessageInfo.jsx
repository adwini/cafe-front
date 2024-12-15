import React from "react";
import PropTypes from "prop-types";

const MessageInfo = ({ text, status, onClose, showCloseButton }) => {
  const bgColor = status === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`text-white text-center ${bgColor} relative p-1`}>
      {text}
      {showCloseButton && (
        <button
          className="p-0 ml-4 text-white bg-transparent border-none"
          onClick={onClose}>
          &times;
        </button>
      )}
    </div>
  );
};

MessageInfo.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["success", "failure"]).isRequired,
  onClose: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool,
};

MessageInfo.defaultProps = {
  showCloseButton: true,
};

export default MessageInfo;
