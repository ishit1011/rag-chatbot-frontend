import { useState } from "react";
// import '../assets/styles/chat.scss'

const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return; // prevent sending while disabled
    onSend(text);
    setText("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Send a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled} className="btn send">
  {disabled ? "..." : "➤"}
</button>

    </form>
  );
};

export default ChatInput;
