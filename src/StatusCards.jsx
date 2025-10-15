import React, { useState } from "react";

function Dashboard() {
  const [steps, setSteps] = useState([
    { id: 1, name: "Vite Installed", status: true },
    { id: 2, name: "React Installed", status: true },
    { id: 3, name: "Project Running", status: false },
    { id: 4, name: "Components Linked", status: false },
  ]);

  const toggleStatus = (id) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, status: !step.status } : step
      )
    );
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    backgroundColor:"white",
  };

  const gridStyle = {
    display: "flex",
    gap: "20px",
    width: "80%",
    marginTop: "20px",
  };

  const cardStyle = (isDone) => ({
    border: "2px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    backgroundColor: isDone ? "#d4edda" : "#f8d7da",
    color: isDone ? "#155724" : "#721c24",
    cursor: "pointer",
    transition: "0.3s ease",
  });

  return (
    <div style={containerStyle}>
      <h1>🚀 React Setup Status Dashboard</h1>
      <div style={gridStyle}>
        {steps.map((step) => (
          <div
            key={step.id}
            style={cardStyle(step.status)}
            onClick={() => toggleStatus(step.id)}
          >
            <h3>{step.name}</h3>
            <p>{step.status ? "✅ Completed" : "⏳ Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
