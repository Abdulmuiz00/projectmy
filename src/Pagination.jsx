import React, { useState, useMemo } from "react";

function Pagination({ data, itemsPerPage = 8 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageItems = data.slice(startIndex, endIndex);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  function goToPage(page) {
    const p = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(p);
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          marginBottom: 16,
        }}
      >
        {pageItems.map((it) => (
          <div
            key={it.id}
            style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}
          >
            <h4 style={{ margin: 0 }}>{it.title}</h4>
            <p style={{ marginTop: 6, marginBottom: 0, fontSize: 13 }}>
              {it.description}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            aria-current={num === currentPage ? "page" : undefined}
            style={{
              minWidth: 36,
              height: 36,
              borderRadius: 6,
              border: num === currentPage ? "2px solid #333" : "1px solid #ccc",
              background: num === currentPage ? "#f0f0f0" : "transparent",
            }}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div style={{ marginTop: 12, textAlign: "center", color: "#555" }}>
        Page {currentPage} of {totalPages} — showing items {startIndex + 1} to {" "}
        {Math.min(endIndex, data.length)} of {data.length}
      </div>
    </div>
  );
}


export default Pagination;
