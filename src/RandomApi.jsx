import React, { useEffect, useState } from "react";

function Joke() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      const data = await res.json();
      setJoke(data);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const styles = {

    setup: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#1f2937",
    },
    punchline: {
      fontSize: "18px",
      color: "#4b5563",
    },
    button: {
      marginTop: "20px",
      backgroundColor: "#2563eb",
      color: "white",
      padding: "10px 18px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "0.3s",
    },
  };

  return (
    <div className="container mx-auto flex flex-col items-center h-[90vh] justify-center gap-6">
      <h1 className="text-3xl font-bold">Random Joke Generator</h1>
      {loading ? (
        <p style={{ color: "#6b7280" }}>Loading joke...</p>
      ) : (
        joke && (
          <div className="w-auto mt-7 border rounded-3xl p-7 "> 
            <p style={styles.setup}>{joke.setup}</p>
            <p style={styles.punchline}>{joke.punchline}</p>
          </div>
        )
      )}
      <button
        className="w-[200px] mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        onClick={fetchJoke}
      >
        Get Another Joke
      </button>
    </div>
  );
}

export default Joke;
