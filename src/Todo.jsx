import React, { useState } from "react";

function ToDoLite() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: input,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}> To-Do Lite</h2>
      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>
          Add
        </button>
      </div>
      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.listItem}>
            <span
              onClick={() => toggleDone(task.id)}
              style={{
                ...styles.text,
                textDecoration: task.done ? "line-through" : "none",
                color: task.done ? "gray" : "black",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} style={styles.deleteBtn}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#f8f8f8",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  title: { textAlign: "center", marginBottom: "20px" },
  inputBox: { display: "flex", marginBottom: "10px" },
  input: {
    flexGrow: 1,
    padding: "8px",
    borderRadius: "6px 0 0 6px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "0 6px 6px 0",
    cursor: "pointer",
  },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: "8px 10px",
    borderRadius: "6px",
    marginBottom: "8px",
  },
  text: { cursor: "pointer" },
  deleteBtn: {
    border: "none",
    backgroundColor: "transparent",
    color: "red",
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default ToDoLite;
