import { useState, useEffect } from "react";

function Journal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(
      localStorage.getItem("mindmate-journal") || "[]"
    );
    setEntries(storedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem("mindmate-journal", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      title,
      content,
      date: new Date().toLocaleString(),
    };
    setEntries([newEntry, ...entries]);
    setTitle("");
    setContent("");
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
            <strong>{entry.title}</strong> <br />
            <small>{entry.date}</small>
            <p>{entry.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Journal;
