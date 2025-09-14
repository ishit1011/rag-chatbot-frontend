import { useState } from "react";

const Sidebar = () => {
  const [sessions] = useState([
    { id: 1, title: "New Chat" },
    { id: 2, title: "Project Help" },
  ]);

  return (
    <div className="sidebar">
      <button className="new-chat">+ New Chat</button>
      <div className="sessions">
        {sessions.map((s) => (
          <div key={s.id} className="session-item">
            {s.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
