import { useState } from "react";

function Journal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState(() => {
    try {
      const stored = localStorage.getItem("mindmate-journal");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load journal data:", e);
      return [];
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      title,
      content,
      date: new Date().toLocaleString(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("mindmate-journal", JSON.stringify(updated));
    setTitle("");
    setContent("");
  };

  const handleDelete = (indexToDelete) => {
    const updated = entries.filter((_, i) => i !== indexToDelete);
    setEntries(updated);
    localStorage.setItem("mindmate-journal", JSON.stringify(updated));
  };

  return (
    <div>
      <h2>Journal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ width: "100%", height: "100px", padding: "0.5rem" }}
        />
        <button type="submit">Save</button>
      </form>

      <ul style={{ marginTop: "1rem" }}>
        {entries.map((entry, index) => (
          <li key={index} style={{ marginBottom: "1rem" }}>
            <strong>{entry.title}</strong>
            <br />
            <small>{entry.date}</small>
            <p>{entry.content}</p>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Journal;
