import React, { useState } from "react";

function MirrorLocal() {
  const [text, setText] = useState("");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 20 }}>
      <h2>Real-time Typing Mirror</h2>

      <label style={{ display: "block", marginBottom: 8 }}>
        Type something:
      </label>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing..."
        style={{
          padding: "8px 10px",
          width: "100%",
          maxWidth: 480,
          boxSizing: "border-box",
        }}
        aria-label="Type to mirror"
      />

      <div
        aria-live="polite"
        style={{
          marginTop: 20,
          padding: 16,
          borderRadius: 8,
          background: "#f4f4f6",
          maxWidth: 600,
        }}
      >
        <strong>Mirror output:</strong>
        <p
          style={{
            marginTop: 8,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {text || <span style={{ color: "#888" }}>Nothing typed yet</span>}
        </p>
      </div>
    </div>
  );
}

export default MirrorLocal;
