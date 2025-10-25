import { useState } from "react";

function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const handleCelsiusChange = (e) => {
    setCelsius(e.target.value);
  };

  const handleConvert = () => {
    if (celsius === "" || isNaN(celsius)) {
      setFahrenheit("Invalid input");
    } else {
      const f = (parseFloat(celsius) * 9) / 5 + 32;
      setFahrenheit(`${f.toFixed(2)} °F`);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🌡️ Celsius to Fahrenheit Converter</h2>

      <input
        type="text"
        value={celsius}
        onChange={handleCelsiusChange}
        placeholder="Enter Celsius"
        style={styles.input}
      />

      <button onClick={handleConvert} style={styles.button}>
        Convert
      </button>

      <p>
        Fahrenheit: <strong>{fahrenheit || "—"}</strong>
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial",
    backgroundColor: "#f5f5f5",
    width: "300px",
    margin: "50px auto",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "10px",
    width: "80%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "5px",
  },
};

export default TemperatureConverter;
