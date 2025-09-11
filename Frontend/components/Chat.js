import React, { useState, useRef, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const inputValue = input; // Store message before clearing input
    setInput("");

    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("https://gyatrix.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "⚠️ Error: Unable to connect to AI.", sender: "bot" }]);
    }
  };

  // Handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-box" 
    style={{ display: "flex", 
    flexDirection: "column", 
  
    overflow : "hidden"
     }}>
      {/* Chat Messages */}
      <div className="chat-messages" 
      style={{ flexGrow: 1, overflowY: "auto", padding: "10px",  }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender}`}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "8px 0",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <img
              src={msg.sender === "user" ? "/account.png" : "/chatbot.png"}
              alt={msg.sender}
              style={{
                width: "28px",
                height: "28px",
                marginRight: msg.sender === "bot" ? "10px" : "0",
                marginLeft: msg.sender === "user" ? "10px" : "0",
              }}
            />
            <p
              style={{
                backgroundColor: msg.sender === "bot" ? "#f1f1f1" : "#007bff",
                color: msg.sender === "bot" ? "#000" : "#fff",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </p>
          </div>
        ))}
        <div ref={chatRef} />
      </div>

      {/* Chat Input */}
      <div
        className="chat-input"
        style={{ display: "flex", alignItems: "center", padding: "10px", borderTop: "1px solid #ddd", }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "10px", borderRadius: "25px", border: "1px solid #ccc" }}
        />
        <button
          onClick={sendMessage}
          style={{ marginLeft: "10px", background: "none", border: "none", cursor: "pointer" }}
        >
          <img src="/paper-plane.png" alt="Send" style={{ width: "28px", height: "32px" }} />
        </button>
      </div>
    </div>
  );
};

export default Chat;