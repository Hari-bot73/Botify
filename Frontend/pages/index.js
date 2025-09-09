import React, { useState } from "react";
import Chat from "../components/Chat";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="chat-interface">
      {/* Sidebar for Chat History */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}><br></br>
        <h2>Chat History</h2>
        <ul>
          <li>Conversation 1</li>
          <li>Conversation 2</li>
          <li>Conversation 3</li>
        </ul>
      </div>

      {/* Chat Section */}
      <div className="chat-container">
        {/* Menu Button to Toggle Sidebar */}
        <button className="menu-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <img src="/menus.png" alt="Menu" />
        </button>
        <Chat />
      </div>
    </div>
  );
};

export default Index;
