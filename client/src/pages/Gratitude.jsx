import { useState } from "react";

function Gratitude() {
  const [item, setItem] = useState("");
  const [gratitudes, setGratitudes] = useState(() => {
    try {
      const stored = localStorage.getItem("mindmate-gratitudes");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load gratitude data:", e);
      return [];
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      item,
      date: new Date().toLocaleDateString(),
    };
    const updated = [newItem, ...gratitudes];
    setGratitudes(updated);
    localStorage.setItem("mindmate-gratitudes", JSON.stringify(updated));
    setItem("");
  };

  const handleDelete = (indexToDelete) => {
    const updated = gratitudes.filter((_, i) => i !== indexToDelete);
    setGratitudes(updated);
    localStorage.setItem("mindmate-gratitudes", JSON.stringify(updated));
  };

  return (
    <div>
      <h2>Gratitude</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Today I'm grateful for..."
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ marginTop: "1rem" }}>
        {gratitudes.map((g, index) => (
          <li key={index} style={{ marginBottom: "0.5rem" }}>
            <strong>{g.item}</strong>
            <br />
            <small>{g.date}</small>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gratitude;
