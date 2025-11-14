import { useState, useEffect } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0); // time in milliseconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    // Cleanup to stop interval when component unmounts or isRunning changes
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = () => {
    const ms = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 60000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(Math.floor(ms / 10)).padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial",
      }}
    >
      <h1>⏱ Stopwatch</h1>

      <h2 style={{ fontSize: "3rem", marginBottom: "20px" }}>{formatTime()}</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        {!isRunning ? (
          <button
            onClick={() => setIsRunning(true)}
            style={btnStyle}
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(false)}
            style={btnStyle}
          >
            Pause
          </button>
        )}

        <button
          onClick={() => {
            setIsRunning(false);
            setTime(0);
          }}
          style={btnStyle}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "10px 20px",
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
};

export default Stopwatch;
