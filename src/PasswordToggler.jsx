import React, { useState } from "react";

function PasswordToggler() {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <h2>Password Visibility Toggler</h2>

      <input
        type={visible ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        style={{
          padding: "8px",
          fontSize: "16px",
          marginRight: "10px",
        }}
      />

      <button
        type="button"
        onClick={() => setVisible(!visible)}
        style={{
          padding: "8px 12px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {visible ? "Hide" : "Show"}
      </button>

    </div>
  );
};

export default PasswordToggler;
