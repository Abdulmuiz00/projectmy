import React, { useState } from "react";
import Pagination from "./Pagination";

function App() {
  const sampleData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`,
  }));

  const [perPage, setPerPage] = useState(8);

  return (
    <div style={{ padding: 24, fontFamily: "Inter, Roboto, system-ui" }}>
      <h2 style={{ textAlign: "center" }}>React Pagination using Array.slice</h2>

      <div
        style={{
          maxWidth: 800,
          margin: "12px auto",
          display: "flex",
          gap: 8,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <label style={{ fontSize: 14 }}>Items per page:</label>
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
        </select>
      </div>

      <Pagination data={sampleData} itemsPerPage={perPage} />
    </div>
  );
};
export default App;