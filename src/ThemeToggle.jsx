import React, { useState } from "react";

function ThemeToggle() {
    const [isLight, setIsLight] = useState(true);

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  return (
    <div
      style={{
        backgroundColor: isLight ? "white" : "black",
        color: isLight ? "black" : "white",
        height: "100vh",
        textAlign: "center",
        paddingTop: "100px",
        transition: "0.3s",
      }}
    >
      <h1>
        This is the {isLight ? "Light" : "Dark"} Theme
      </h1>
      <button
        onClick={toggleTheme}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Switch to {isLight ? "Dark" : "Light"} Theme
      </button>
    </div>
  );
}

export default ThemeToggle;
