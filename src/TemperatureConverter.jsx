import React, { useState } from "react";

function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const handleCelsiusChange = (e) => {
    const value = e.target.value;
    setCelsius(value);
    if (value === "") {
      setFahrenheit("");
    } else {
      const f = (parseFloat(value) * 9) / 5 + 32;
      setFahrenheit(f.toFixed(2));
    }
  };

  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);
    if (value === "") {
      setCelsius("");
    } else {
      const c = ((parseFloat(value) - 32) * 5) / 9;
      setCelsius(c.toFixed(2));
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "80px auto",
        textAlign: "center",
        fontFamily: "Inter, Roboto, system-ui",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 10,
      }}
    >
      <h2>Temperature Converter</h2>

      <div style={{ margin: "20px 0" }}>
        <label style={{ display: "block", marginBottom: 6 }}>Celsius (°C):</label>
        <input
          type="number"
          value={celsius}
          onChange={handleCelsiusChange}
          placeholder="Enter Celsius"
          style={{ padding: 8, width: "100%", borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ margin: "20px 0" }}>
        <label style={{ display: "block", marginBottom: 6 }}>Fahrenheit (°F):</label>
        <input
          type="number"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
          placeholder="Enter Fahrenheit"
          style={{ padding: 8, width: "100%", borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>
    </div>
  );
};

export default TemperatureConverter;


