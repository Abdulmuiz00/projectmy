import { useState, useEffect } from "react";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
   
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

   
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={{color:"white"}}>Digital Clock</h1>
      <h1 style={styles.time}>
        {time.toLocaleTimeString()}
      </h1>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection:"column",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  time: {
    color: "#0f0",
    fontSize: "3rem",
    fontFamily: "monospace",
  },
};

export default DigitalClock;
