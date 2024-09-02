import React, { useState, useEffect } from "react";
//import log from "../../utils/logger.js";

export const DateTime = () => {
  //console.log("DateTime");

  // Initialize the date state using the useState hook
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      setDate(newDate);
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="header__dateTime">
      <p>{date.toLocaleDateString()}</p>
    </div>
  );
};

export default DateTime;
