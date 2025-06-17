import { useState } from "react";
import Journal from "./pages/Journal.jsx";
import "./styles/global.css";

function App() {
  const [tab, setTab] = useState("journal");

  return (
    <div className="app-container">
      {/* Content area */}
      <main>
        {tab === "journal" && <Journal />}
        {tab === "gratitude" && <div>Gratitude (Coming soon)</div>}
        {tab === "todo" && <div>To-Do (Coming soon)</div>}
        {tab === "goals" && <div>Goals (Coming soon)</div>}
        {tab === "focus" && <div>Focus (Coming soon)</div>}
      </main>

      {/* Bottom Navigation */}
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
