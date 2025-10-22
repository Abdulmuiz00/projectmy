import React, { useState } from "react";

function RandomQuote() {
  const quotes = [
    "The best way to get started is to quit talking and begin doing. – Walt Disney",
    "Don’t let yesterday take up too much of today. – Will Rogers",
    "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
    "If you are working on something exciting, it will keep you motivated. – Steve Jobs",
    "Success is not in what you have, but who you are. – Bo Bennett",
    "Dream bigger. Do bigger. – Unknown",
    "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
    "Great things never come from comfort zones. – Anonymous",
  ];

  const [quote, setQuote] = useState(quotes[0]);

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💬 Random Quote Generator</h2>
      <p style={styles.quote}>{quote}</p>
      <button onClick={generateQuote} style={styles.button}>
        New Quote
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "80px auto",
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  quote: {
    fontStyle: "italic",
    fontSize: "18px",
    marginBottom: "20px",
    color: "#444",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default RandomQuote;
