import React, { useState } from "react";

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const handleCalculate = (e) => {
    e.preventDefault();
    const billValue = parseFloat(bill);
    const tipValue = parseFloat(tipPercent);
    if (!billValue || !tipValue) {
      alert("Please enter both bill and tip percentage!");
      return;
    }
    const tip = (billValue * tipValue) / 100;
    const totalAmount = billValue + tip;
    setTipAmount(tip.toFixed(2));
    setTotal(totalAmount.toFixed(2));
  };

  const handleBillChange = (e) => setBill(e.target.value);
  const handleTipChange = (e) => setTipPercent(e.target.value);

  return (
    <div style={styles.container}>
      <h2>💰 Tip Calculator</h2>
      <form onSubmit={handleCalculate} style={styles.form}>
        <label>
          Bill Amount (₦):
          <input
            type="number"
            value={bill}
            onChange={handleBillChange}
            style={styles.input}
            placeholder="Enter bill amount"
          />
        </label>

        <label>
          Tip Percentage (%):
          <input
            type="number"
            value={tipPercent}
            onChange={handleTipChange}
            style={styles.input}
            placeholder="Enter tip percent"
          />
        </label>

        <button type="submit" style={styles.button}>
          Calculate
        </button>
      </form>

      {tipAmount > 0 && (
        <div style={styles.result}>
          <p>Tip Amount: ₦{tipAmount}</p>
          <p>Total Bill: ₦{total}</p>
        </div>
      )}
    </div>
  );
}


const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
    fontWeight: "bold",
  },
};

export default TipCalculator;
