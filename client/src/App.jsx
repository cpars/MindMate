import { useState, useEffect } from "react";
import Journal from "./pages/Journal.jsx";
import Gratitude from "./pages/Gratitude.jsx";
import "./styles/global.css";

function App() {
  // Load initial tab from localStorage (or default to 'journal')
  const [tab, setTab] = useState(() => {
    return localStorage.getItem("mindmate-tab") || "journal";
  });

  // Save current tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("mindmate-tab", tab);
  }, [tab]);

  return (
    <div className="app-container">
      <main>
        {tab === "journal" && <Journal />}
        {tab === "gratitude" && <Gratitude />}
        {tab === "todo" && <div>To-Do (Coming soon)</div>}
        {tab === "goals" && <div>Goals (Coming soon)</div>}
        {tab === "focus" && <div>Focus (Coming soon)</div>}
      </main>

      <nav className="bottom-nav">
        <button onClick={() => setTab("journal")}>📝</button>
        <button onClick={() => setTab("todo")}>✅</button>
        <button onClick={() => setTab("goals")}>🎯</button>
        <button onClick={() => setTab("focus")}>⭐</button>
        <button onClick={() => setTab("gratitude")}>🙏</button>
      </nav>
    </div>
  );
}

export default App;
