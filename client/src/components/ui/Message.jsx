import { useState, useEffect } from "react";
import "../../assets/message.css";

export const Message = ({
  successMessage,
  setSuccessMessage,
  errorMessage,
  setErrorMessage,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (successMessage || errorMessage) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    if (!isVisible) {
      const resetTimer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 500);

      return () => clearTimeout(resetTimer);
    }
  }, [isVisible, setSuccessMessage, setErrorMessage]);

  let messageClass = "message";
  if (successMessage) {
    messageClass += " success-message";
  } else if (errorMessage) {
    messageClass += " error-message";
  }
  if (!isVisible) {
    messageClass += " fade";
  }

  return <span className={messageClass}>{successMessage || errorMessage}</span>;
};
