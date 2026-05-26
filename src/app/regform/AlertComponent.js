import React from "react";

const AlertComponent = ({ type, title, message }) => {
  const alertStyles = {
    success: {
      backgroundColor: "#d4edda",
      borderColor: "#c3e6cb",
      color: "#155724",
    },
    warning: {
      backgroundColor: "#fff3cd",
      borderColor: "#ffeeba",
      color: "#856404",
    },
    error: {
      backgroundColor: "#f8d7da",
      borderColor: "#f5c6cb",
      color: "#721c24",
    },
  };

  const iconStyles = {
    width: "20px",
    height: "20px",
    marginRight: "10px",
    flexShrink: 0,
  };

  const icons = {
    success: (
      <svg style={iconStyles} viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg style={iconStyles} viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg style={iconStyles} viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  const containerStyle = {
    display: "flex",
    alignItems: "flex-start",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid",
    marginBottom: "0",
    fontSize: "14px",
    width: "100%",
    ...alertStyles[type],
  };

  const titleStyle = {
    fontWeight: "bold",
    marginRight: "6px",
  };

  const msgDiv = {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  };

  return (
    <div style={containerStyle} role="status" aria-live="polite">
      {icons[type]}
      <div style={msgDiv}>
        <span style={titleStyle}>{title}</span>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default AlertComponent;
