import { useState, useEffect } from "react";

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // Load notes on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  // Update localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() || !text.trim()) return;
    const newNote = {
      id: Date.now(),
      title,
      text,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setText("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notes App</h1>

      {/* INPUT FIELD */}
      <div className="w-full max-w-xl bg-white p-5 shadow-md rounded-xl mb-8">
        <input
          type="text"
          placeholder="Note title..."
          className="w-full mb-3 p-3 border rounded-lg outline-none focus:ring focus:ring-blue-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          className="w-full p-3 border rounded-lg outline-none min-h-[120px] focus:ring focus:ring-blue-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={addNote}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Note
        </button>
      </div>

      {/* NOTES LIST */}
      <div className="w-full max-w-3xl grid md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-5 shadow-lg rounded-xl relative border"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {note.title}
            </h2>
            <p className="text-gray-700">{note.text}</p>

            <button
              onClick={() => deleteNote(note.id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesApp;

