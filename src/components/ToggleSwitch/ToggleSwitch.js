import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext }from "../../contexts/CurrentTemperatureUnitContext.js";
const ToggleSwitch = () => {
  console.log("ToggleSwitch");
  const { currentTemperatureUnit, handleToggleSwitchChange  } = useContext(CurrentTemperatureUnitContext);

  const handleChange = () => {
  if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
  if (currentTemperatureUnit === "F") handleToggleSwitchChange("C"); 
  };
  console.log(currentTemperatureUnit);
  return (
    <label className="switch">
      <input type="checkbox" className="switch__box" onChange={handleChange} />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${currentTemperatureUnit === "F" && "switch__active"}`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${currentTemperatureUnit === "C" && "switch__active"}`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
